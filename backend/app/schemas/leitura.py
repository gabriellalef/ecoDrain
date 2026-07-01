from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class LeituraCreate(BaseModel):
    codigo: str
    nivel: float  # 0-100 (percentual de preenchimento)


class LeituraOut(BaseModel):
    id: int
    bueiro_id: int
    nivel: float
    timestamp: datetime

    model_config = {"from_attributes": True}
