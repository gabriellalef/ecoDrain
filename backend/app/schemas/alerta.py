from pydantic import BaseModel
from datetime import datetime


class AlertaOut(BaseModel):
    id: int
    bueiro_id: int
    mensagem: str
    status: str
    timestamp: datetime

    model_config = {"from_attributes": True}


class DashboardOut(BaseModel):
    total_bueiros: int
    vazios: int
    metade: int
    cheios: int
    alertas_ativos: int
