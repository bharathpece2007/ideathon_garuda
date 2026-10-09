import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import warnings

warnings.filterwarnings('ignore')

try:
    import xgboost as xgb
    MODEL_TYPE = 'xgboost'
except ImportError:
    from sklearn.ensemble import GradientBoostingRegressor
    MODEL_TYPE = 'sklearn'
    print("WARNING: xgboost library not found. Falling back to sklearn GradientBoostingRegressor.")

def main():
    print("Loading data...")
    # 1. Load the dataset
    try:
        df = pd.read_csv('cold_storage_spoilage_dataset_50k.csv')
    except FileNotFoundError:
        print("Error: cold_storage_spoilage_dataset_50k.csv not found.")
        return

    # 2. Data Preprocessing
    print("Preprocessing data...")
    # Sanity check: drop NaN values
    df = df.dropna()

    # One-Hot Encoding
    if 'Product_Name' in df.columns:
        df = pd.get_dummies(df, columns=['Product_Name'])
        # Convert boolean columns to int
        for col in df.columns:
            if df[col].dtype == bool:
                df[col] = df[col].astype(int)

    # Isolate target variable
    target_col = 'Predicted_Remaining_Shelf_Life_Hours'
    if target_col not in df.columns:
        print(f"Error: Target column {target_col} not found in dataset.")
        return

    X = df.drop(columns=[target_col])
    y = df[target_col]

    # Save feature names
    features = list(X.columns)
    with open('model_features.pkl', 'wb') as f:
        pickle.dump(features, f)
    
    # 3. Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 4. Model Training
    params = {
        'n_estimators': 150,
        'max_depth': 5,
        'learning_rate': 0.08,
        'random_state': 42
    }

    print(f"Training {MODEL_TYPE} model...")
    if MODEL_TYPE == 'xgboost':
        model = xgb.XGBRegressor(**params)
    else:
        model = GradientBoostingRegressor(**params)

    model.fit(X_train, y_train)

    # 5. Evaluation Metrics
    print("Evaluating model...")
    y_pred = model.predict(X_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f"RMSE: {rmse:.4f}")
    print(f"MAE: {mae:.4f}")
    print(f"R-squared: {r2:.4f}")

    # 6. Serialization
    with open('xgb_spoilage_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    print("Model and features saved successfully.")

if __name__ == "__main__":
    main()
