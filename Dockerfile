# =========================
# 1️ Build the React Frontend
# =========================
FROM node:18 AS frontend

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g vite
COPY . .
RUN npm run build

# =========================
# 2️ Build the FastAPI Backend
# =========================
FROM python:3.10 AS backend

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# =========================
# 3️ Create the Final Image
# =========================
FROM python:3.10

WORKDIR /app

# Copy FastAPI backend from the previous stage
COPY --from=backend /app /app

# Copy built React frontend to FastAPI static files
COPY --from=frontend /app/dist /app/frontend_build

# Install dependencies (again, to avoid layer issues)
RUN pip install --no-cache-dir -r requirements.txt

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
