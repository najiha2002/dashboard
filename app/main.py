from fastapi import FastAPI, Depends
import pandas as pd
import os
from functools import lru_cache
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from auth import authenticate_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows only your React app
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@lru_cache()
def load_data():
    """Load all datasets into memory for efficient access"""
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../data/"))

    users_path = os.path.join(base_path, "users_data.csv")
    cards_path = os.path.join(base_path, "cards_data.csv")

    if not os.path.exists(users_path) or not os.path.exists(cards_path):
        raise FileNotFoundError(f"🚨 CSV file(s) missing! Expected paths:\n{users_path}\n{cards_path}")

    users_df = pd.read_csv(users_path)
    cards_df = pd.read_csv(cards_path)

    return users_df, cards_df

@app.get("/")
def root():
    return {"message": "Welcome to the API"}

@app.get("/secure-data")
def secure_endpoint(username: str = Depends(authenticate_user)):
    return {"message": f"Hello, {username}! You have access to this secure data."}

@app.get("/users/age-dist")
def get_age_dist():
    """Return the age distribution of users categorized by gender"""
    users_df, _ = load_data()

    bins = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    labels = ['10s', '20s', '30s', '40s', '50s', '60s', '70s', '80s']

    users_df['age_group'] = pd.cut(users_df['current_age'], bins=bins, labels=labels, right=False)

    age_gender_dist = users_df.groupby(['age_group', 'gender']).size().unstack(fill_value=0)

    gender_distribution = {
        "Male": [int(age_gender_dist.loc[age, 'Male']) if age in age_gender_dist.index else 0 for age in labels],
        "Female": [int(age_gender_dist.loc[age, 'Female']) if age in age_gender_dist.index else 0 for age in labels]
    }

    response_data = {
        "labels": labels,
        "datasets": [
            {
                "label": "Male",
                "data": gender_distribution["Male"]
            },
            {
                "label": "Female",
                "data": gender_distribution["Female"]
            }
        ]
    }

    return response_data

@app.get("/users/gender-count")
def get_users_gender_count():
    """Return count of male and female users"""
    users_df, _ = load_data()

    gender_dist = users_df['gender'].value_counts()

    labels = ['Female', 'Male']
    data = [int(gender_dist.get("Female", 0)), int(gender_dist.get("Male", 0))]

    response_data = {
        "labels": labels,
        "datasets": [
            {
                "label": "Gender",
                "data": data
            }
        ]
    }

    return response_data

@app.get("/users/income-vs-debt")
def get_income_vs_debt_data():
    """Return users' financial data for income vs. debt"""
    users_df, _ = load_data()

    users_df = users_df[['yearly_income', 'total_debt', 'credit_score', 'num_credit_cards']]

    users_df['yearly_income'] = users_df['yearly_income'].replace(r'[\$,]', '', regex=True).astype(int)
    users_df['total_debt'] = users_df['total_debt'].replace(r'[\$,]', '', regex=True).astype(int)

    response_data = users_df.to_dict(orient="records")

    return response_data
