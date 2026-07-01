from sqlalchemy.orm import Session
from app.models.bueiro import Bueiro
from app.schemas.bueiro import BueiroCreate, BueiroUpdate


def get_bueiros(db: Session):
    return db.query(Bueiro).all()


def get_bueiro(db: Session, bueiro_id: int):
    return db.query(Bueiro).filter(Bueiro.id == bueiro_id).first()


def criar_bueiro(db: Session, data: BueiroCreate) -> Bueiro:
    bueiro = Bueiro(**data.model_dump())
    db.add(bueiro)
    db.commit()
    db.refresh(bueiro)
    return bueiro


def atualizar_bueiro(db: Session, bueiro_id: int, data: BueiroUpdate) -> Bueiro | None:
    bueiro = get_bueiro(db, bueiro_id)
    if not bueiro:
        return None
    for campo, valor in data.model_dump(exclude_none=True).items():
        setattr(bueiro, campo, valor)
    db.commit()
    db.refresh(bueiro)
    return bueiro


def deletar_bueiro(db: Session, bueiro_id: int) -> bool:
    bueiro = get_bueiro(db, bueiro_id)
    if not bueiro:
        return False
    db.delete(bueiro)
    db.commit()
    return True
