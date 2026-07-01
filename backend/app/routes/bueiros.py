from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.auth import get_usuario_atual
from app.models.user import User
from app.schemas.bueiro import BueiroCreate, BueiroUpdate, BueiroOut
from app.crud import bueiro as crud

router = APIRouter(prefix="/bueiros", tags=["bueiros"])


@router.get("", response_model=List[BueiroOut])
def listar_bueiros(
    db: Session = Depends(get_db),
    _: User = Depends(get_usuario_atual),
):
    return crud.get_bueiros(db)


@router.get("/{bueiro_id}", response_model=BueiroOut)
def obter_bueiro(
    bueiro_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_usuario_atual),
):
    b = crud.get_bueiro(db, bueiro_id)
    if not b:
        raise HTTPException(status_code=404, detail="Bueiro não encontrado")
    return b


@router.post("", response_model=BueiroOut, status_code=status.HTTP_201_CREATED)
def criar_bueiro(
    dados: BueiroCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_usuario_atual),
):
    return crud.criar_bueiro(db, dados)


@router.put("/{bueiro_id}", response_model=BueiroOut)
def atualizar_bueiro(
    bueiro_id: int,
    dados: BueiroUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_usuario_atual),
):
    b = crud.atualizar_bueiro(db, bueiro_id, dados)
    if not b:
        raise HTTPException(status_code=404, detail="Bueiro não encontrado")
    return b


@router.delete("/{bueiro_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_bueiro(
    bueiro_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_usuario_atual),
):
    if not crud.deletar_bueiro(db, bueiro_id):
        raise HTTPException(status_code=404, detail="Bueiro não encontrado")
