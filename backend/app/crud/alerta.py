from sqlalchemy.orm import Session
from app.models.alerta import Alerta


def get_alertas(db: Session, status: str | None = None):
    q = db.query(Alerta)
    if status:
        q = q.filter(Alerta.status == status)
    return q.order_by(Alerta.timestamp.desc()).all()


def concluir_alerta(db: Session, alerta_id: int) -> Alerta | None:
    alerta = db.query(Alerta).filter(Alerta.id == alerta_id).first()
    if not alerta:
        return None
    alerta.status = "concluido"
    db.commit()
    db.refresh(alerta)
    return alerta
