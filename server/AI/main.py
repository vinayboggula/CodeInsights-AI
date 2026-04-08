from fastapi import FastAPI
from pydantic import BaseModel
from analyzer_service import analyze

app = FastAPI()


class CodeRequest(BaseModel):
    code: str
    language: str


@app.get("/")
def read_root():
    return {"message": "Welcome to the Code Analyzer API!"}


@app.post("/analyze")
def analyze_code(request: CodeRequest):
    try:
        result = analyze(request.code)
        return result
    except Exception as e:
        return {"error": str(e)}
