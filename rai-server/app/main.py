from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import numpy as np
import pandas as pd
from sklearn import metrics
import json
from functools import reduce


app = Flask(__name__)
CORS(app)


def CohenD(yobs, ypred, gmaj, gmin):
    # Cohen-D
    SR_min = ypred[gmin == 1].mean()  # success rate minority
    SR_maj = ypred[gmaj == 1].mean()  # success rate majority

    STD_maj = np.sqrt(SR_maj * (1.0 - SR_maj))
    STD_min = np.sqrt(SR_min * (1.0 - SR_min))
    POOL_STD = STD_maj * (sum(gmaj == 1)/(sum(gmin == 1) + sum(gmaj == 1))) + \
        STD_min * (sum(gmin == 1)/(sum(gmin == 1) + sum(gmaj == 1)))

    return StatParity(yobs, ypred, gmaj, gmin)/POOL_STD


def DispImpact(yobs, ypred, gmaj, gmin):
    # Disparate Impact (a.k.a. Adverse Impact Ratio)
    SR_min = ypred[gmin == 1].mean()  # success rate minority
    SR_maj = ypred[gmaj == 1].mean()  # success rate majority
    return SR_min/SR_maj


def StatParity(yobs, ypred, gmaj, gmin):
    # Statistical Parity Difference
    SR_min = ypred[gmin == 1].mean()  # success rate minority
    SR_maj = ypred[gmaj == 1].mean()  # success rate majority
    return SR_min - SR_maj


def TwoSDRule(yobs, ypred, gmaj, gmin):
    # 2-SD Rule
    SR_min = ypred[gmin == 1].mean()  # success rate minority
    SR_maj = ypred[gmaj == 1].mean()  # success rate majority
    SR_T = ypred.mean()  # success rate total
    P_min = (gmin == 1).mean()  # minority proportion
    N = len(ypred)
    return (SR_min - SR_maj)/np.sqrt((SR_T * (1.0 - SR_T))/(N * P_min * (1 - P_min)))


def EqualOppDiff(yobs, ypred, gmaj, gmin):
    # Equal Opportunity Difference
    TPR_maj = sum((yobs[gmaj == 1] == 1) *
                  (ypred[gmaj == 1] == 1))/sum(yobs[gmaj == 1] == 1)
    TPR_min = sum((yobs[gmin == 1] == 1) *
                  (ypred[gmin == 1] == 1))/sum(yobs[gmin == 1] == 1)
    return TPR_min - TPR_maj


def AvgOddsDiff(yobs, ypred, gmaj, gmin):
    # Average Odds Difference
    return (EqualOppDiff(yobs == 0, ypred == 0, gmaj, gmin) + EqualOppDiff(yobs, ypred, gmaj, gmin))/2.0


perf_metrics = {"Accuracy":  metrics.accuracy_score,
                "Precision": metrics.precision_score,
                "Recall": metrics.recall_score,
                "AUC": metrics.roc_auc_score,
                "F1-Score": metrics.f1_score,
                "Brier": metrics.brier_score_loss
                }
# fairness metrics
fair_metrics = {"Cohen-D": CohenD,
                "2-SD Rule": TwoSDRule,
                "StatParity": StatParity,
                "EqualOppDiff": EqualOppDiff,
                "DispImpact": DispImpact,
                "AvgOddsDiff": AvgOddsDiff
                }


def compute_model_metrics(yobs, model, Xobs, gmaj=None, gmin=None):
    # get predictions -- where you would start, after loading the data and model
    ypred_prob = model.predict_proba(Xobs).ravel()[1::2]  # get probabilities
    ypred_class = model.predict(Xobs)

    # compute performance metrics
    metrics = []
    for pf in perf_metrics.keys():
        if pf in ["AUC", "Brier"]:
            metrics += [[pf, perf_metrics[pf](yobs, ypred_prob)]]
        else:
            metrics += [[pf, perf_metrics[pf](yobs, ypred_class)]]

    if (gmaj is not None) and (gmin is not None):
        for ff in fair_metrics.keys():
            metrics += [[ff, fair_metrics[ff](yobs, ypred_class, gmaj, gmin)]]

    return pd.DataFrame(metrics, columns=["Metric", "Value"])


def bootstrap_magic(X, y, model, n_samples, refit=False, gmaj=None, gmin=None):
    # pre-allocation
    np.random.seed(10)
    df_instances = pd.DataFrame(index=X.index, columns=[
                                "sample_" + str(x) for x in range(n_samples)])

    for s in range(n_samples):
        # simple bootstrap
        idx = np.random.choice(X.index, X.shape[0])

        # left-out indices
        odx = np.array(list(set(X.index) - set(idx)))

        # train the model before evaluation?
        if refit:
            model.fit(X.loc[idx], y.loc[idx].values.ravel())

        # get predictions to left-out
        # df_instances.loc[odx, "sample_" + str(s)] = model.predict(X.loc[odx])
        df_instances["sample_" +
                     str(s)].loc[odx] = model.predict_proba(X.loc[odx]).ravel()[1::2]

        # evaluate model
        if (gmaj is not None) and (gmin is not None):
            df_metrics = compute_model_metrics(y.loc[odx].values.ravel(), model, X.loc[odx],
                                               gmaj.loc[odx].values.ravel(), gmin.loc[odx].values.ravel())
        else:
            df_metrics = compute_model_metrics(
                y.loc[odx].values.ravel(), model, X.loc[odx])

        df_metrics["Sample"] = s
        if s is 0:
            df_all_metrics = df_metrics.copy()
        else:
            df_all_metrics = pd.concat(
                [df_all_metrics, df_metrics.copy()], axis=0, ignore_index=True)

    return {"instances": df_instances, "metrics": df_all_metrics}


def boostrap_metrics(c):
    def getMetricHistogram(metric):
        def getMetricPivotTable():
            return c["metrics"].pivot_table(index="Sample", columns="Metric")[
                "Value"][metric]

        def getHistogram(metricHistogram):
            if(len(metricHistogram[0]) == 0):
                return []
            return [{
                "frequency": int(metricHistogram[0][0]),
                "interval": float(metricHistogram[1][0])
            }] + getHistogram((metricHistogram[0][1:], metricHistogram[1][1:]))
        return getHistogram(np.histogram(getMetricPivotTable()))

    return [{"name": i, "histogram": getMetricHistogram(i), "type": "performance"} for i in list(perf_metrics.keys())]


def getStuffNeededForMetrics(modelAndData):
    X = modelAndData["X"]
    y = modelAndData["y"]
    model = modelAndData["model"]

    return (X, y, model)


@app.route("/api/features", methods=["POST"])
def features():
    file = request.files['file']
    X = load(file.stream)["X"]
    return jsonify(X.columns.tolist())


@app.route("/api/bootstrap", methods=["POST"])
def bootstrap():
    file = request.files['file']
    (X, y, model) = getStuffNeededForMetrics(
        load(file.stream))
    c = bootstrap_magic(X=X, y=y, model=model, n_samples=100,
                        refit=True)
    print(boostrap_metrics(c))
    return jsonify(boostrap_metrics(c))
