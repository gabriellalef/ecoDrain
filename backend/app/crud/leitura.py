from sqlalchemy.orm import Session
from app.models.leitura import Leitura
from app.models.bueiro import Bueiro
from app.models.alerta import Alerta


def _calcular_status(nivel: float) -> str:
    if nivel >= 70:
        return "CHEIO"
    if nivel >= 30:
        return "METADE"
    return "VAZIO"


def get_leituras(db: Session, bueiro_id: int | None = None, limit: int = 100):
    q = db.query(Leitura)
    if bueiro_id:
        q = q.filter(Leitura.bueiro_id == bueiro_id)
    return q.order_by(Leitura.timestamp.desc()).limit(limit).all()


def registrar_leitura(db: Session, bueiro_id: int, nivel: float) -> Leitura:
    # Salva a leitura
    leitura = Leitura(bueiro_id=bueiro_id, nivel=nivel)
    db.add(leitura)

    # Atualiza o bueiro
    bueiro = db.query(Bueiro).filter(Bueiro.id == bueiro_id).first()
    if bueiro:
        status_anterior = bueiro.status
        novo_status = _calcular_status(nivel)
        bueiro.nivel = nivel
        bueiro.status = novo_status

        # Gera alerta apenas quando muda para CHEIO
        if novo_status != status_anterior and novo_status == "CHEIO":
            alerta = Alerta(
                bueiro_id=bueiro.id,
                mensagem=f"Bueiro #{bueiro.codigo} CHEIO — {bueiro.endereco}",
                status="ativo",
            )
            db.add(alerta)

    db.commit()
    db.refresh(leitura)
    return leitura
