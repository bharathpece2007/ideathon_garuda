from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for the React frontend

# Load the model and features
try:
    with open('xgb_spoilage_model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('model_features.pkl', 'rb') as f:
        model_features = pickle.load(f)
    print("Model and features loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model, model_features = None, None

@app.route('/predict', methods=['POST'])
def predict():
    if not model or not model_features:
        return jsonify({"error": "Model not loaded on server."}), 500

    try:
        data = request.json
        
        # Create a base dataframe with a single row of zeros for all features
        input_data = {feature: 0 for feature in model_features}
        
        # Map the incoming JSON to the exact input dataframe keys
        input_data['Storage_Duration_Hours'] = data.get('Storage_Duration_Hours', 0)
        input_data['Average_Storage_Temp_C'] = data.get('Avg_Storage_Temp_C', 0)
        input_data['Min_Storage_Temp_C'] = data.get('Min_Temp_Recorded_C', 0)
        input_data['Max_Storage_Temp_C'] = data.get('Peak_Temp_Spikes_C', 0)
        input_data['Temp_Spike_Duration_Hours'] = data.get('Spike_Duration_Hours', 0)
        input_data['Average_Humidity_Percent'] = data.get('Avg_Humidity_Percent', 0)
        input_data['Door_Open_Frequency_Count'] = data.get('Door_Open_Frequency', 0)
        input_data['Cooling_Power_Failure_Count'] = data.get('Power_Failures', 0)
        
        # Handle One-Hot Encoding for Product_Name
        product_name = data.get('Product_Name', '')
        product_feature_name = f"Product_Name_{product_name}"
        if product_feature_name in input_data:
            input_data[product_feature_name] = 1
            
        df = pd.DataFrame([input_data])[model_features]  # Ensure order matches perfectly
        
        # Predict
        prediction = model.predict(df)[0]
        prediction = max(0, float(prediction)) # Ensure non-negative
        
        # Calculate days
        days = round(prediction / 24, 1)
        
        # Routing Logic
        if prediction >= 48:
            action = "STANDARD RETAIL ROUTING"
        elif prediction >= 12:
            action = "DISCOUNT MARKETPLACE / NGO ROUTING"
        else:
            action = "COMPOST / ANIMAL FEED"
            
        return jsonify({
            "remaining_shelf_life_hours": round(prediction, 1),
            "remaining_shelf_life_days": days,
            "recommended_action": action
        })
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
