from fastapi import FastAPI, Request
from fastapi import FastAPI, Depends
import pandas as pd
import os
import time
import logging
from datetime import datetime
from functools import lru_cache
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from app.auth import authenticate_user

logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allows only your React app
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.middleware("http")
async def log_request_metrics(request: Request, call_next):
    """Middleware to log request response time."""
    
    start_time = time.time()
    response = await call_next(request)  # Wait for the request to complete
    duration = time.time() - start_time  # Now measure the time correctly

    logging.info(f"Request: {request.url} | Time: {duration:.4f}s")

    return response

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
    return {"message": "Welcome to the Microservices Dashboard API"}

@app.get("/secure-data")
def secure_endpoint(username: str = Depends(authenticate_user)):
    return {"message": f"Hello, {username}! You have access to this secure data."}

@app.get("/users/credit-score-dist")
def get_credit_score_dist():
    """Return the credit score distribution of users"""
    users_df, _ = load_data()

    users_df = users_df[['credit_score', 'num_credit_cards']]

    response_data = users_df.to_dict(orient="records")

    return response_data

@app.get("/users/credit-open-trend")
def get_credit_open_trend():
    """Return monthly credit account openings over time"""
    _, cards_df = load_data()
    
    cards_df["acct_open_date"] = pd.to_datetime(cards_df["acct_open_date"], errors="coerce", infer_datetime_format=True)
    cards_df["year_month"] = cards_df["acct_open_date"].dt.to_period("M")
    
    counts = cards_df["year_month"].value_counts().sort_index()
    full_range = pd.period_range(start=cards_df["year_month"].min(), end=cards_df["year_month"].max(), freq="M")
    counts = counts.reindex(full_range, fill_value=0)

    labels = [date.strftime("%m-01-%Y") for date in full_range]

    response_data = {
        "labels": labels,
        "datasets": [
            {
                "data": counts.tolist(),
            }
        ],
    }
    
    return response_data

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

@app.get("/users/geo-dist")
def get_users_geo_dist():
    """Return users' geo distribution"""
    users_df, _ = load_data()

    selected_columns = ["latitude", "longitude", "per_capita_income", "total_debt", "num_credit_cards"]
    users_df[selected_columns] = users_df[selected_columns].replace(r"[\$,]", "", regex=True).astype(float)

    response_data = {
        "labels": selected_columns,
        "datasets": [
            {
                "label": "Geo Distribution",
                "data": users_df[selected_columns].to_dict(orient="records"),
            }
        ]
    }

    return response_data

@app.get("/cards/brand-dist")
def get_card_brand_dist():
    """Return card brand distribution"""
    _, cards_df = load_data()
    
    brand_counts = cards_df['card_brand'].value_counts()
    
    response_data = {
        "labels": brand_counts.index.tolist(),
        "datasets": [
            {
                "label": "Card Brand Distribution",
                "data": brand_counts.tolist(),
            }
        ]
    }
    
    return response_data
