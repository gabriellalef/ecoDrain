from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, bueiros, leituras, alertas
from app.seed import seed

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(bueiros.router)
app.include_router(leituras.router)
app.include_router(alertas.router)

@app.on_event("startup")
def startup():
    seed()

@app.get("/")
def root():
    return {"ok": True}
