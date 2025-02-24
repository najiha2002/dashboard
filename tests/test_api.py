import pytest
import requests

BASE_URL = "http://127.0.0.1:8000"

def test_root():
    response = requests.get(f"{BASE_URL}/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Microservices Dashboard API"}

def test_gender_count():
    response = requests.get(f"{BASE_URL}/users/gender-count")
    assert response.status_code == 200
    data = response.json()

    assert "labels" in data
    assert "datasets" in data
    assert isinstance(data["datasets"], list)
    assert len(data["datasets"]) > 0
    assert "data" in data["datasets"][0]

def test_age_distribution():
    response = requests.get(f"{BASE_URL}/users/age-dist")
    assert response.status_code == 200
    data = response.json()

    assert "labels" in data
    assert "datasets" in data
    assert isinstance(data["datasets"], list)
    assert len(data["datasets"]) == 2  # Male & Female
    assert "data" in data["datasets"][0]

def test_income_vs_debt():
    response = requests.get(f"{BASE_URL}/users/income-vs-debt")
    assert response.status_code == 200
    data = response.json()

    assert isinstance(data, list)
    assert all(isinstance(entry, dict) for entry in data)
    assert all(key in entry for key in ["yearly_income", "total_debt", "credit_score", "num_credit_cards"] for entry in data)
