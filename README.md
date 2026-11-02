# Cotex.ai

Cotex.ai is an AI platform in development. The long-term goal is to build a production-ready, multi-agent AI application using the MERN stack, microservices, retrieval-augmented generation (RAG), LangGraph, Docker, and AWS.

> **Project status:** This repository currently contains an early Node.js/Express backend scaffold with an API gateway and an authentication service that connects to MongoDB. RAG, LangGraph agents, a React frontend, Docker configuration, and AWS deployment are planned, but are not implemented here yet.

## Current backend

- **API gateway** — Express service on port `8000`; forwards `/auth` requests to the configured auth service.
- **Auth service** — Express service on port `8001`; connects to MongoDB before starting and currently exposes a basic `/` endpoint.
- **Database** — MongoDB, connected through Mongoose.

## Project structure

```text
backend/
  gateway/                 # API gateway
  services/
    auth/                  # Authentication service and MongoDB connection
      config/db.js
    model/                 # Shared service models (in progress)
fronted/                   # Frontend work (in progress)
```

## Requirements

- Node.js
- npm
- A MongoDB connection string for the auth service

## Run locally

Open two PowerShell terminals from the project root.

### 1. Configure and start the auth service

Create `backend/services/auth/.env` with:

```env
PORT=8001
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

Replace the placeholders with your MongoDB Atlas connection details. URL-encode special characters in the username or password. Keep this file private; do not commit it.

Then run:

```powershell
cd backend\services\auth
npm ci
npm run dev
```

### 2. Configure and start the gateway

Create `backend/gateway/.env` with:

```env
PORT=8000
AUTH_SERVICE_URL=http://localhost:8001
```

Then, in the second terminal:

```powershell
cd backend\gateway
npm ci
npm run dev
```

The gateway health response is available at `http://localhost:8000/`. Requests under `/auth` are forwarded to the auth service.

## Environment variables

| Service | Variable | Purpose |
|---|---|---|
| Gateway | `PORT` | Gateway port (defaults to `8000`) |
| Gateway | `AUTH_SERVICE_URL` | Base URL of the auth service |
| Auth | `PORT` | Auth service port (defaults to `8001`) |
| Auth | `MONGODB_URI` | MongoDB connection string |
| Auth | `MONGODB_DNS_SERVERS` | Optional comma-separated DNS server override when the default resolver cannot resolve MongoDB SRV records |

Never commit `.env` files, passwords, API keys, or other credentials. The repository's `.gitignore` excludes environment files and `node_modules`.

## Planned direction

The broader project vision includes a React-based MERN application, multi-agent workflows with LangGraph, RAG, containerization with Docker, and deployment to AWS. These are goals for future development, not features currently provided by this repository.
