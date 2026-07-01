from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.auth import get_usuario_atual
from app.models.user import User
from app.models.bueiro import Bueiro
from app.schemas.leitura import LeituraCreate, LeituraOut
from app.crud import leitura as crud

router = APIRouter(prefix="/leituras", tags=["leituras"])


@router.get("", response_model=List[LeituraOut])
def listar_leituras(
    bueiro_id: Optional[int] = None,
    limit: int = 100,
    db: Session = Depends(get_db),
    _: User = Depends(get_usuario_atual),
):
    return crud.get_leituras(db, bueiro_id=bueiro_id, limit=limit)


@router.post("", response_model=LeituraOut, status_code=201)
def registrar_leitura(
    dados: LeituraCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_usuario_atual),
):
    bueiro = db.query(Bueiro).filter(Bueiro.codigo == dados.codigo).first()
    if not bueiro:
        raise HTTPException(status_code=404, detail="Bueiro não encontrado")
    if not (0 <= dados.nivel <= 100):
        raise HTTPException(status_code=422, detail="Nível deve estar entre 0 e 100")
    return crud.registrar_leitura(db, bueiro.id, dados.nivel)
