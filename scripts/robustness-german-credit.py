
from art.attacks.evasion import FastGradientMethod
from art.classifiers import SklearnClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import KBinsDiscretizer
from sklearn.preprocessing import OneHotEncoder
from IPython import get_ipython
from lime.lime_tabular import LimeTabularExplainer

import pandas as pd
import numpy as np

# ## Task
# ### Resources

# Fairness metrics


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


def compute_model_metrics(yobs, model, Xobs, gmaj=None, gmin=None):
    # metrics
    from sklearn import metrics
    perf_metrics = {"Accuracy": metrics.accuracy_score,
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

# ### Dataset


# get dataset
df = pd.read_csv(
    "https://raw.githubusercontent.com/askoshiyama/mli-cohort3/master/german_credit.csv")
sex_ps = df["personal_status_sex"].str.split(":", n=1, expand=True)
sex_ps.columns = ["gender", "personal_status"]
df.drop("personal_status_sex", axis=1, inplace=True)
df = pd.concat([df, sex_ps], axis=1)

# categorical variables
cat_variables = ['account_check_status', 'credit_history', 'purpose', 'savings', 'present_emp_since', 'gender', 'personal_status',
                 'property', 'other_installment_plans', 'housing', 'job', 'telephone', "other_debtors", 'foreign_worker']

# other integer variables
int_variables = ['credits_this_bank', 'present_res_since', 'duration_in_month', 'people_under_maintenance',
                 'installment_as_income_perc', 'age', 'credit_amount']

# target variable
output_variable = ["default"]

# Pre-processing
# Mapping categorical variables to one-hot encoding
df_cat = pd.DataFrame(index=df.index)

# one-hot encoding of categorical variables

# I will do a loop for pedagogical reasons, but it is not entirely necessary
for cat in cat_variables:
    # one-hot encoding fitting
    one_hot_func = OneHotEncoder().fit(df[[cat]])

    # mapping
    cat_mapped = one_hot_func.transform(df[[cat]]).toarray()

    # storing
    for (k, cat_label) in enumerate(one_hot_func.categories_[0]):
        df_cat[cat + "_" + cat_label] = cat_mapped[:, k]

# bracketing integer variable - age
kbin_func = KBinsDiscretizer(
    n_bins=3, encode='onehot', strategy='quantile').fit(df[["age"]])
df_age = pd.DataFrame(kbin_func.transform(
    df[["age"]]).toarray(), columns=["young", "adult", "senior"])

# consolidating a final dataset
df_final = pd.concat([df[int_variables], df_cat, df_age,
                      df[output_variable]], axis=1)
X = pd.concat([df[int_variables], df_cat, df_age], axis=1)
y = df[output_variable].copy()

# ### Modelling

# set metrics
# performance metrics
gmaj = df_final[['gender_male ']]
gmin = df_final[['gender_female ']]

# train model
#rf = RandomForestClassifier(n_estimators=10, random_state=10, class_weight="balanced")
#rf = MLPClassifier(random_state=10, solver="lbfgs")
rf = LogisticRegression(C=0.0025, random_state=10,
                        class_weight="balanced", solver="lbfgs")
rf = rf.fit(X, y.values.ravel())

# compute metrics
compute_model_metrics(y.values.ravel(), rf, X,
                      gmaj.values.ravel(), gmin.values.ravel())

# ## Evaluation Component
# ### Bootstrap, Permutation and Noising Magic
# ### Bootstrap


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
        #df_instances.loc[odx, "sample_" + str(s)] = model.predict(X.loc[odx])
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


c = bootstrap_magic(X=X, y=y, model=rf, n_samples=100,
                    refit=True, gmaj=gmaj, gmin=gmin)


c["instances"].mean(axis=1).head(), y.head()

# #### Instance importance - performance

(y.values.ravel() - c["instances"].mean(axis=1)
 ).abs().sort_values(ascending=False).head(10)


X.loc[(y.values.ravel() - c["instances"].mean(axis=1)
       ).abs().sort_values(ascending=False).head(10).index]  # do a lime for them

# #### instance importance - fairness - minority group

(y.values.ravel() - c["instances"].mean(axis=1)
 ).abs()[gmin.values.ravel() == 1].sort_values(ascending=False).head(10)


X.loc[(y.values.ravel() - c["instances"].mean(axis=1)).abs()[
    gmin.values.ravel() == 1].sort_values(ascending=False).head(10).index]  # do a lime for them

# #### Avg case metrics + uncertainty

c["metrics"].pivot_table(values="Value", index="Metric", aggfunc=[
                         "mean", "median", "std", "mad"])


# get_ipython().run_line_magic('matplotlib', 'inline')
c["metrics"].pivot_table(index="Sample", columns="Metric")[
    "Value"]["DispImpact"]  # .hist()
print(c["metrics"])

# #### Worst/Best-case metrics


def q05(x):
    return np.quantile(x, q=.05)


def q95(x):
    return np.quantile(x, q=.95)


c["metrics"].pivot_table(values="Value", index="Metric", aggfunc=[
                         q05, "median", "mean", q95])

# ### Permutation


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

# #### Feature importance


c = permutation_magic(X=X, y=y, model=rf, n_repeats=10,
                      refit=True, gmaj=gmaj, gmin=gmin)


d = c["metrics"].pivot_table(
    index="Variable", columns="Metric", values="Value", aggfunc="mean")


# get_ipython().run_line_magic('matplotlib', 'inline')
# d.plot(x="AUC", y="AvgOddsDiff", kind="scatter")


# get_ipython().run_line_magic('matplotlib', 'inline')
# d.plot(x="F1-Score", y="DispImpact", kind="scatter")


b = c["metrics"].pivot_table(
    index="Variable", columns="Metric", values="Value", aggfunc=["mean", "std"])
b["mean"]["AUC"].sort_values().tail(10)


b = c["metrics"].pivot_table(
    index="Variable", columns="Metric", values="Value", aggfunc=["mean", "std"])
b["mean"]["DispImpact"].sort_values().tail(10)

# ### Noising

# binary noise for one-hot encoded
# gaussian noise for everyone else

# ### Adversarial Attacks stuff
# ## Fix Component


# Lime
#df = pd.concat([X, y], axis=1)
categorical_features = [i for i, col in enumerate(X.columns) if "_" in col]
class_names = ["good", "bad"]
feature_names = X.columns
train = X.values


def explain():
    explainer = LimeTabularExplainer(
        train, class_names=class_names, feature_names=feature_names, categorical_features=categorical_features)

    return explainer.explain_instance(X.iloc[0], rf.predict_proba, num_features=4)


print(explain().as_list())

# Adversarial

pred_probs = rf.predict_proba(X).ravel()[1::2]

# generate some contrarian examples from
# borderline
# adversarial attack method
fgm = FastGradientMethod(SklearnClassifier(rf),
                         norm=np.inf,
                         eps=0.1,
                         eps_step=0.1,
                         targeted=True,
                         num_random_init=0,
                         batch_size=1,
                         minimal=True)
# get examples from the border
thresh = 0.5
pred_class = (pred_probs > thresh)
pred_close_border = np.abs(pred_probs.copy() - thresh)
bordertop10 = np.argsort(pred_close_border)[:10]
z_border_examples = fgm.generate(
    x=X.values[bordertop10, :], y=pred_class[bordertop10] == 0)


# deep-in
# adversarial attack method
fgm = FastGradientMethod(SklearnClassifier(rf),
                         norm=np.inf,
                         eps=1.1,  # we may need to learn this one
                         eps_step=0.1,
                         targeted=True,
                         num_random_init=0,
                         batch_size=1,
                         minimal=True)

# get examples deep-in
pred_class = (pred_probs > thresh)
deepertop10 = np.argsort(pred_probs)[:10]
z_deeper_examples = fgm.generate(
    x=X.values[deepertop10, :], y=pred_class[deepertop10] == 0)

print(rf.predict_proba(z_border_examples), rf.predict_proba(z_border_examples).ravel()[1::2] > thresh)

print(pd.DataFrame(z_border_examples, columns=X.columns))