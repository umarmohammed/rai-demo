from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import numpy as np
import pandas as pd
from sklearn import metrics
import json
from functools import reduce
from lime.lime_tabular import LimeTabularExplainer
from sklearn.linear_model import LogisticRegression
from art.classifiers import SklearnClassifier
from art.attacks.evasion import FastGradientMethod
from art.attacks.evasion import HopSkipJump

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

fair_metrics_targets = {"Cohen-D": [0, 0],
                        "2-SD Rule": [2, -2],
                        "StatParity": [0.1, -0.1],
                        "EqualOppDiff": [0.1, -0.1],
                        "DispImpact": [1.2, 0.8],
                        "AvgOddsDiff": [0.1, -0.1]
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


def permutation_magic(X, y, model, n_repeats, refit=False, gmaj=None, gmin=None):
    # pre-allocation
    np.random.seed(10)

    for r in range(n_repeats):
        # simple bootstrap
        idx = np.random.choice(X.index, X.shape[0])

        # left-out indices
        odx = np.array(list(set(X.index) - set(idx)))

        # train the model before evaluation?
        if refit:
            model.fit(X.loc[idx], y.loc[idx].values.ravel())

        # baseline performance
        if (gmaj is not None) and (gmin is not None):
            df_baseline_metrics = compute_model_metrics(y.loc[odx].values.ravel(), model, X.loc[odx],
                                                        gmaj.loc[odx].values.ravel(), gmin.loc[odx].values.ravel())
        else:
            df_baseline_metrics = compute_model_metrics(
                y.loc[odx].values.ravel(), model, X.loc[odx])

        # random permutation
        X_permuted = X.copy()
        X_features = X.columns
        shuffling_idx = np.arange(X.shape[0])
        for (j, col_idx) in enumerate(X_features):
            # shuffle
            np.random.shuffle(shuffling_idx)
            if hasattr(X_permuted, "iloc"):
                col = X_permuted.iloc[shuffling_idx, j]
                col.index = X_permuted.index
                X_permuted.iloc[:, j] = col
            else:
                X_permuted[:, j] = X_permuted[shuffling_idx, col_idx]

            # compute performance
            if (gmaj is not None) and (gmin is not None):
                df_metrics = compute_model_metrics(y.loc[odx].values.ravel(), model, X_permuted.loc[odx],
                                                   gmaj.loc[odx].values.ravel(), gmin.loc[odx].values.ravel())
            else:
                df_metrics = compute_model_metrics(
                    y.loc[odx].values.ravel(), model, X_permuted.loc[odx])

            # store results
            df_metrics["Value"] = (
                df_baseline_metrics["Value"] - df_metrics["Value"])
            df_metrics["Variable"] = col_idx
            if j is 0:
                df_var_metrics = df_metrics.copy()
            else:
                df_var_metrics = pd.concat(
                    [df_var_metrics, df_metrics.copy()], axis=0, ignore_index=True)

        # store overall results
        df_var_metrics["Repeat"] = r
        if r is 0:
            df_all_metrics = df_var_metrics.copy()
        else:
            df_all_metrics = pd.concat(
                [df_all_metrics, df_var_metrics.copy()], axis=0, ignore_index=True)

    return {"metrics": df_all_metrics}


def boostrap_metrics(X, y, gmin, model, c, computeFairnessMetrics):
    categorical_features = [i for i, col in enumerate(X.columns) if "_" in col]
    class_names = ["good", "bad"]
    feature_names = X.columns
    train = X.values
    explainer = LimeTabularExplainer(
        train, class_names=class_names, feature_names=feature_names, categorical_features=categorical_features)

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

    def getAggregates():
        def q05(x):
            return np.quantile(x, q=.05)

        def q95(x):
            return np.quantile(x, q=.95)
        return c["metrics"].pivot_table(values="Value", index="Metric", aggfunc=[
            "mean", "median", q05, q95, "std", "mad"]).swapaxes(0, 1).to_dict()

    def getMetricAggregates(aggregates, metricName):
        def isValueInRange(value, range):
            return value <= range[0] and value >= range[1]

        targets = fair_metrics_targets.get(metricName)
        fair = [] if targets is None else [
            {"name": "isFair", "value": isValueInRange(aggregates[('mean', 'Value')], targets)}]

        return [{"name": i[0], "value": aggregates[i]} for i in aggregates.keys()] + fair

    def getMetrics():
        def metricsToList(metricType, metricDict):
            return [{"name": i, "type": metricType} for i in list(metricDict.keys())]

        return metricsToList("performance", perf_metrics) + (metricsToList("fairness", fair_metrics) if computeFairnessMetrics else [])

    def getOverview():
        agg = getAggregates()
        return [{**i, "histogram": getMetricHistogram(i["name"]), "aggregates": getMetricAggregates(agg[i["name"]], i["name"])} for i in getMetrics()]

    def getInstances():

        def instancesToList(instances):
            def getPredictProbas(id):
                probs = model.predict_proba(
                    X.iloc[id].values.reshape(1, -1)).flatten().tolist()
                return [{"name": "negative", "value": probs[0]}, {"name": "positive", "value": probs[1]}]

            def getLimeProbs(id):
                exp = explainer.explain_instance(
                    X.iloc[id], model.predict_proba, num_features=4).as_list()
                return [{"name": i[0], "value": i[1]} for i in exp]

            return [{"instance": {"id": i[0], **i[1]}, "predictProbablities": getPredictProbas(i[0]), "explanation": getLimeProbs(i[0])} for i in list(instances.swapaxes(0, 1).to_dict().items())]

        def difficultiesToList(difficulties):
            return [{"name": i, "value": difficulties[i]} for i in difficulties.keys()]

        performanceInstances = instancesToList(X.loc[(y.values.ravel() - c["instances"].mean(axis=1)
                                                      ).abs().sort_values(ascending=False).head(10).index])

        performanceDifficulies = difficultiesToList((y.values.ravel(
        ) - c["instances"].mean(axis=1)).abs().sort_values(ascending=False).head(10))

        fairnessInstances = instancesToList(X.loc[(y.values.ravel() - c["instances"].mean(axis=1)).abs()[
            gmin.values.ravel() == 1].sort_values(ascending=False).head(10).index]) if computeFairnessMetrics else []

        fairnessDifficulties = difficultiesToList((y.values.ravel() - c["instances"].mean(
            axis=1)).abs()[gmin.values.ravel() == 1].sort_values(ascending=False).head(10)) if computeFairnessMetrics else []

        return {"performanceItems": performanceInstances, "fairnessItems": fairnessInstances, "performanceDifficulties": performanceDifficulies, "fairnessDifficulties": fairnessDifficulties}

    return {"overview": getOverview(), **getInstances(), "columnNames": ['id'] + list(X.columns)}


def permuation_metrics(c, computeFairnessMetrics):
    b = c["metrics"].pivot_table(
        index="Variable", columns="Metric", values="Value", aggfunc=["mean", "std"])
    d = c["metrics"].pivot_table(
        index="Variable", columns="Metric", values="Value", aggfunc="mean")

    def getMetrics(metricNames):
        def getMetricFeatures(metricFeaturesSeries):
            return [{"name": i, "value": metricFeaturesSeries[i]} for i in metricFeaturesSeries]

        features = [{"name": i, "features": getMetricFeatures(b["mean"][i].sort_values().tail(10).to_dict())}
                    for i in metricNames]
        return {"metricNames": metricNames, "features": features}

    metricNames = list(perf_metrics.keys()) + \
        (list(fair_metrics.keys()) if computeFairnessMetrics else [])

    return {**getMetrics(metricNames), "featureScatter": d.swapaxes(0, 1).to_dict()}


def getStuffNeededForMetrics(modelAndData, selectedFeatures, baseline=None):
    def getGroups(X):
        gminKey = selectedFeatures and selectedFeatures.get('gmin')
        gmajKey = selectedFeatures and selectedFeatures.get('gmaj')
        return (gminKey and X[[gminKey]], gmajKey and X[[gmajKey]])

    X = modelAndData["X"]
    y = modelAndData["y"]
    model = modelAndData["model"] if baseline is None else baseline
    (gmin, gmaj) = getGroups(X)
    return (X, y, model, gmin, gmaj)


def get_bootstrap_metrics(modelAndData, selectedFeatures, baseline=None):
    (X, y, model, gmin, gmaj) = getStuffNeededForMetrics(
        modelAndData, selectedFeatures, baseline)
    c = bootstrap_magic(X=X, y=y, model=model, n_samples=100,
                        refit=True, gmaj=gmaj, gmin=gmin)

    computeFairnessMetrics = gmin is not None and gmaj is not None

    return boostrap_metrics(X, y, gmin, model, c, computeFairnessMetrics)


def attack_values(X, y, model):
    hsj = HopSkipJump(SklearnClassifier(model),
                      targeted=True,
                      norm=2,
                      max_iter=50,
                      max_eval=10000,
                      init_eval=100,
                      init_size=100
                      )

    pred_probs = model.predict_proba(X).ravel()[1::2]
    thresh = 0.5
    pred_class = (pred_probs > thresh)

    def getAttacks(pred_probs):
        def instanceTupleToDict(instanceTuple):
            return {"id": instanceTuple[0], **instanceTuple[1]}

        def instancesToList(df):
            return [instanceTupleToDict(i) for i in df.swapaxes(0, 1).to_dict().items()]

        top10 = np.argsort(pred_probs)[:10]
        z_examples = hsj.generate(
            x=X.values[top10, :], y=pred_class[top10] == 0)
        originals_df = pd.DataFrame(X.values[top10, :], columns=X.columns)
        z_examples_df = pd.DataFrame(z_examples, columns=X.columns)
        return {"actualInstances": instancesToList(originals_df), "generatedInstances": instancesToList(z_examples_df)}

    return {"borderlines": getAttacks(np.argsort(np.abs(pred_probs.copy() - thresh))[:10]), "inlines": getAttacks(np.argsort(pred_probs)[:10]), "columnNames": ['id'] + list(X.columns)}


@app.route("/api/features", methods=["POST"])
def features():
    file = request.files['file']
    X = load(file.stream)["X"]
    return jsonify(X.columns.tolist())


@app.route("/api/bootstrap", methods=["POST"])
def bootstrap():
    file = request.files['file']

    return get_bootstrap_metrics(load(file.stream), json.loads(request.form['data']))


@app.route("/api/baseline", methods=["POST"])
def baseline():
    file = request.files['file']

    baseline = LogisticRegression(
        random_state=10, class_weight="balanced", C=0.0025)

    return get_bootstrap_metrics(load(file.stream), json.loads(request.form['data']), baseline)


@app.route("/api/permutation", methods=["POST"])
def permutation():
    file = request.files['file']
    (X, y, model, gmin, gmaj) = getStuffNeededForMetrics(
        load(file.stream), json.loads(request.form['data']))
    c = permutation_magic(X=X, y=y, model=model, n_repeats=10,
                          refit=True, gmaj=gmaj, gmin=gmin)
    computeFairnessMetrics = gmin is not None and gmin is not None
    return permuation_metrics(c, computeFairnessMetrics)


@app.route("/api/attacks", methods=["POST"])
def attacks():
    file = request.files['file']
    (X, y, model, _, _) = getStuffNeededForMetrics(
        load(file.stream), json.loads(request.form['data']))
    return attack_values(X, y, model)
