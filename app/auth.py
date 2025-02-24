from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import hashlib

security = HTTPBasic()

def load_credentials():
    credentials = {}
    try:
        with open("credentials.txt", "r") as file:
            for line in file:
                username, password = line.strip().split(":")
                credentials[username] = hashlib.sha256(password.encode()).hexdigest()  # Hash passwords
    except Exception as e:
        print(f"Error loading credentials: {e}")
    return credentials

def authenticate_user(credentials: HTTPBasicCredentials = Security(security)):
    users = load_credentials()
    hashed_password = hashlib.sha256(credentials.password.encode()).hexdigest()
    
    if credentials.username not in users or users[credentials.username] != hashed_password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return credentials.username
