# ML Service — Heart Disease Risk Prediction

This folder contains the machine learning component of **CardioSense**: a logistic regression model that estimates a person's risk of heart disease from lifestyle and health survey data, served through a Flask API (`app.py`).

## Dataset

- **Source:** CDC BRFSS 2020 (Behavioral Risk Factor Surveillance System), cleaned version (`heart_2020_cleaned.csv`)
- **Size:** 319,795 records, 18 columns
- **Target:** `HeartDisease` (Yes/No) — imbalanced, with only ~8.6% positive cases (27,373 Yes vs. 292,422 No)
- **Features:** BMI, Smoking, AlcoholDrinking, Stroke, PhysicalHealth, MentalHealth, DiffWalking, Sex, AgeCategory, Race, Diabetic, PhysicalActivity, GenHealth, SleepTime, Asthma, KidneyDisease, SkinCancer

## Pipeline (`train_model.ipynb`)

1. **Load & inspect** — read the CSV, confirm no missing values, check dtypes and class distribution.
2. **Encode categoricals** — `LabelEncoder` per categorical column (Smoking, Sex, AgeCategory, Race, Diabetic, GenHealth, etc.), with each encoder saved for reuse at inference time.
3. **Scale features** — `StandardScaler` applied to all 17 features.
4. **Split** — 80/20 train/test split, stratified on the target to preserve class balance.
5. **Train** — `LogisticRegression` (`class_weight="balanced"`, `solver="lbfgs"`, `max_iter=1000`) to counteract the class imbalance rather than resampling the data.
6. **Evaluate** — accuracy, ROC-AUC, classification report, and confusion matrix on the held-out test set.
7. **Persist** — model, scaler, encoders, and feature column order are all saved with `joblib` to `model/` so the Flask service can load them without re-running training.

## Results

| Metric | Score |
|---|---|
| Accuracy | 0.74 |
| ROC-AUC | 0.83 |
| Recall (Heart Disease class) | 0.76 |
| Precision (Heart Disease class) | 0.21 |

Given the class imbalance, `class_weight="balanced"` was used to bias the model toward catching positive cases (high recall) rather than raw accuracy — appropriate for a screening/risk-flagging tool, where missing a true positive is costlier than a false alarm.

## Files

```
ml-service/
├── data/                       # raw dataset (BRFSS 2020)
├── model/                      # saved artifacts after training
│   ├── cardiosense_model.pkl
│   ├── scaler.pkl
│   ├── encoders.pkl
│   └── feature_columns.pkl
├── train_model.ipynb           # training pipeline (this document)
├── app.py                      # Flask API that loads the saved model and serves predictions
└── requirements.txt
```

## Running it

```bash
pip install -r requirements.txt
python app.py
```

The API loads `cardiosense_model.pkl`, `scaler.pkl`, `encoders.pkl`, and `feature_columns.pkl` at startup, applies the same preprocessing used during training to incoming requests, and returns a risk probability along with a Low/Moderate/High risk label.

---
*This ML microservice was built and trained by [@GitTheMoin](https://github.com/GitTheMoin) as part of the HeartGuard project.*
