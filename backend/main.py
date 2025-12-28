from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NOBEL_API_URL = 'http://api.nobelprize.org/v1/prize.json'

@app.get("/api/prizes")
async def get_prizes():
    try:
        response = requests.get(NOBEL_API_URL)
        response.raise_for_status()
        data = response.json()
        return data.get("prizes", [])
    except Exception as e:
        return {"error": str(e)}
