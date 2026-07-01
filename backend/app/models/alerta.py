from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.database import Base


class Alerta(Base):
    __tablename__ = "alertas"

    id = Column(Integer, primary_key=True, index=True)
    bueiro_id = Column(Integer, ForeignKey("bueiros.id"), nullable=False)
    mensagem = Column(String, nullable=False)
    status = Column(String, default="ativo")  # ativo | concluido
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    bueiro = relationship("Bueiro", back_populates="alertas")
