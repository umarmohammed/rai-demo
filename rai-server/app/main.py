from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import numpy as np
import json
from sklearn import metrics
from functools import reduce
from scipy.optimize import differential_evolution
from types import MethodType


app = Flask(__name__)
CORS(app)


@app.route("/api/features", methods=["POST"])
def features():
    file = request.files['file']
    X = load(file.stream)["X"]
    return jsonify(X.columns.tolist())
