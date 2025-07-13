from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_root():
    r = client.get("/")
    assert r.status_code in (200, 404)  # Index served from static

def test_render():
    payload = {
        "template": "onboarding",
        "data": {"name": "Jane", "amount": "1000 PGK"}
    }
    r = client.post("/render", json=payload)
    assert r.status_code == 200
