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

2. Start the Frontend (React)
This service will typically run at http://localhost:5173.

Bash

# Make sure you are in the root folder (not inside /backend)
# Install JavaScript dependencies
npm install

# Start the development server
npm run dev
Tech Stack
Frontend: React, Vite

Backend: Python, Uvicorn

Data Source: Official Nobel Prize API


### What I changed:
1.  **Removed Auto-generated Fluff:** I deleted the sections about "React Compiler," "ESLint," and "Babel vs SWC." These are default settings for the developer and are not relevant to someone trying to run the app.
2.  **Completed the Frontend Section:** Your original text was missing the commands for the frontend. I added `npm install` and `npm run dev`, which are standard for Vite projects.
3.  **Added Structure:** I used a horizontal rule (`---`) to separate the introduction from the instructions.

**Next Step:**
Would you like me to generate a `requirements.txt` file for your backend if you don't have one yet?

# Install Python dependencies
pip3 install -r requirements.txt

# Start the server
uvicorn main:app --reload
