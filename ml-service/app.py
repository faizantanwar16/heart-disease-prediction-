from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model artifacts once at startup
model           = joblib.load("model/cardiosense_model.pkl")
scaler          = joblib.load("model/scaler.pkl")
encoders        = joblib.load("model/encoders.pkl")
feature_columns = joblib.load("model/feature_columns.pkl")

# Exact category mappings from CDC BRFSS dataset
CATEGORY_MAPS = {
    "Smoking":          {"0": "No",  "1": "Yes"},
    "AlcoholDrinking":  {"0": "No",  "1": "Yes"},
    "Stroke":           {"0": "No",  "1": "Yes"},
    "DiffWalking":      {"0": "No",  "1": "Yes"},
    "PhysicalActivity": {"0": "No",  "1": "Yes"},
    "Asthma":           {"0": "No",  "1": "Yes"},
    "KidneyDisease":    {"0": "No",  "1": "Yes"},
    "SkinCancer":       {"0": "No",  "1": "Yes"},
    "Sex":              {"0": "Female", "1": "Male"},
    "Diabetic": {
        "No":                    "No",
        "Yes":                   "Yes",
        "Borderline diabetes":   "No, borderline diabetes",
        "Yes (during pregnancy)":"Yes (during pregnancy)"
    },
    "GenHealth": {
        "Excellent": "Excellent",
        "Very good": "Very good",
        "Good":      "Good",
        "Fair":      "Fair",
        "Poor":      "Poor"
    }
}

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ML service running"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        # Build BMI from height and weight
        height_cm = float(data.get("height", 170))
        weight_kg = float(data.get("weight", 70))
        bmi = round(weight_kg / ((height_cm / 100) ** 2), 1)

        # Map frontend values to dataset values
        row = {
            "BMI":              bmi,
            "Smoking":          CATEGORY_MAPS["Smoking"][str(data.get("smoking", "0"))],
            "AlcoholDrinking":  CATEGORY_MAPS["AlcoholDrinking"][str(data.get("alcoholDrinking", "0"))],
            "Stroke":           CATEGORY_MAPS["Stroke"][str(data.get("stroke", "0"))],
            "PhysicalHealth":   float(data.get("physicalHealth", 0)),
            "MentalHealth":     float(data.get("mentalHealth", 0)),
            "DiffWalking":      CATEGORY_MAPS["DiffWalking"][str(data.get("diffWalking", "0"))],
            "Sex":              CATEGORY_MAPS["Sex"][str(data.get("sex", "0"))],
            "AgeCategory":      data.get("ageCategory", "25-29"),
            "Race":             data.get("race", "White"),
            "Diabetic":         CATEGORY_MAPS["Diabetic"].get(data.get("diabetic", "No"), "No"),
            "PhysicalActivity": CATEGORY_MAPS["PhysicalActivity"][str(data.get("physicalActivity", "1"))],
            "GenHealth":        CATEGORY_MAPS["GenHealth"].get(data.get("genHealth", "Good"), "Good"),
            "SleepTime":        float(data.get("sleepTime", 7)),
            "Asthma":           CATEGORY_MAPS["Asthma"][str(data.get("asthma", "0"))],
            "KidneyDisease":    CATEGORY_MAPS["KidneyDisease"][str(data.get("kidneyDisease", "0"))],
            "SkinCancer":       CATEGORY_MAPS["SkinCancer"][str(data.get("skinCancer", "0"))],
        }

        # Encode categorical columns using saved encoders
        for col, encoder in encoders.items():
            if col in row and col != "HeartDisease":
                try:
                    row[col] = encoder.transform([row[col]])[0]
                except ValueError:
                    # If unseen label, use most common class
                    row[col] = encoder.transform([encoder.classes_[0]])[0]

        # Create DataFrame in correct column order
        df = pd.DataFrame([row])[feature_columns]

        # Scale
        df_scaled = scaler.transform(df)

        # Predict
        probability = model.predict_proba(df_scaled)[0][1]
        prediction  = model.predict(df_scaled)[0]

        risk_score = round(probability * 100, 1)

        if risk_score >= 60:
            risk_label = "High Risk"
        elif risk_score >= 30:
            risk_label = "Moderate Risk"
        else:
            risk_label = "Low Risk"

        return jsonify({
            "result":      risk_label,
            "probability": probability,
            "riskScore":   risk_score,
        })

    except Exception as e:
        print("Prediction error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)