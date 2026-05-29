"""Backend API tests for Gloss Kings Auto Detailing."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://gloss-kings-3d.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
def test_api_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "online"
    assert "message" in data


# ---------- POST /api/quote ----------
def test_create_quote_valid(client):
    payload = {
        "name": "TEST_King George",
        "phone": "346-507-6085",
        "email": "test@example.com",
        "vehicle": "2022 BMW M4",
        "service": "Ceramic Coating",
        "message": "Test inquiry"
    }
    r = client.post(f"{API}/quote", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["vehicle"] == payload["vehicle"]
    assert data["service"] == payload["service"]
    assert "id" in data and isinstance(data["id"], str)
    assert "created_at" in data


def test_create_quote_missing_name(client):
    payload = {"phone": "3465076085", "vehicle": "Tesla", "service": "Exterior Detail"}
    r = client.post(f"{API}/quote", json=payload)
    assert r.status_code == 422


def test_create_quote_missing_phone(client):
    payload = {"name": "TEST_User", "vehicle": "Tesla", "service": "Exterior Detail"}
    r = client.post(f"{API}/quote", json=payload)
    assert r.status_code == 422


def test_create_quote_missing_vehicle(client):
    payload = {"name": "TEST_User", "phone": "3465076085", "service": "Exterior Detail"}
    r = client.post(f"{API}/quote", json=payload)
    assert r.status_code == 422


def test_create_quote_invalid_phone(client):
    payload = {"name": "TEST_User", "phone": "abc", "vehicle": "Tesla", "service": "Exterior Detail"}
    r = client.post(f"{API}/quote", json=payload)
    assert r.status_code == 422


# ---------- GET /api/quotes ----------
def test_list_quotes(client):
    # Create one first
    payload = {
        "name": "TEST_ListUser",
        "phone": "3465076085",
        "vehicle": "Honda Civic",
        "service": "Interior Deep Clean",
    }
    cr = client.post(f"{API}/quote", json=payload)
    assert cr.status_code == 200
    created_id = cr.json()["id"]

    r = client.get(f"{API}/quotes")
    assert r.status_code == 200
    quotes = r.json()
    assert isinstance(quotes, list)
    assert any(q["id"] == created_id for q in quotes)
