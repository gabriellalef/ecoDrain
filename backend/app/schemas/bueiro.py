from pydantic import BaseModel
from typing import Optional


class BueiroCreate(BaseModel):
    codigo: str
    endereco: str
    bairro: str
    regiao: str
    latitude: float
    longitude: float
    profundidade_cm: int


class BueiroUpdate(BaseModel):
    codigo: Optional[str] = None
    endereco: Optional[str] = None
    bairro: Optional[str] = None
    regiao: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    profundidade_cm: Optional[int] = None


class BueiroOut(BaseModel):
    id: int
    codigo: str
    endereco: str
    bairro: str
    regiao: str
    latitude: float
    longitude: float
    profundidade_cm: int
    nivel: float
    status: str

    model_config = {"from_attributes": True}
