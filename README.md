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

### 2. Start the Frontend (React)

This service will typically run at `http://localhost:5173`.

```bash
# Make sure you are in the root folder (not inside /backend)

# Install JavaScript dependencies
npm install

# Start the development server
npm run dev

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Python, Uvicorn
- **Data Source:** Official Nobel Prize API
