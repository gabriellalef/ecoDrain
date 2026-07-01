from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.auth import get_usuario_atual
from app.models.user import User
from app.schemas.alerta import AlertaOut, DashboardOut
from app.models.bueiro import Bueiro
from app.models.alerta import Alerta
from app.crud import alerta as crud

router = APIRouter(tags=["alertas"])


@router.get("/alertas", response_model=List[AlertaOut])
def listar_alertas(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    _: User = Depends(get_usuario_atual),
):
    return crud.get_alertas(db, status=status)


@router.patch("/alertas/{alerta_id}/concluir", response_model=AlertaOut)
def concluir_alerta(
    alerta_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_usuario_atual),
):
    alerta = crud.concluir_alerta(db, alerta_id)
    if not alerta:
        raise HTTPException(status_code=404, detail="Alerta não encontrado")
    return alerta


@router.get("/dashboard", response_model=DashboardOut)
def dashboard(
    db: Session = Depends(get_db),
    _: User = Depends(get_usuario_atual),
):
    bueiros = db.query(Bueiro).all()
    alertas_ativos = db.query(Alerta).filter(Alerta.status == "ativo").count()
    return DashboardOut(
        total_bueiros=len(bueiros),
        vazios=sum(1 for b in bueiros if b.status == "VAZIO"),
        metade=sum(1 for b in bueiros if b.status == "METADE"),
        cheios=sum(1 for b in bueiros if b.status == "CHEIO"),
        alertas_ativos=alertas_ativos,
    )
