# Nobel Prize App (React + Python)

This project is a minimal web application that fetches and displays Nobel Prize data.

It consists of two parts:
1.  **Frontend:** Built with React and Vite for a fast user interface.
2.  **Backend:** A Python service that acts as a proxy to the official Nobel Prize API.

> **Note:** The Python backend is necessary to avoid CORS (Cross-Origin Resource Sharing) issues that occur when the browser tries to connect directly to the Nobel Prize API.
https://github.com/ruvenwang/nobel-game/blob/main/README.md
---

## How to Run

You will need to open **two** terminal windows to run this project (one for the backend, one for the frontend).

### 1. Start the Backend (Python)
This service will run at `http://localhost:8000`.

```bash
cd backend

# Install Python dependencies
pip3 install -r requirements.txt

# Start the server
uvicorn main:app --reload
