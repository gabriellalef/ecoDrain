from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from app.database import Base


class Bueiro(Base):
    __tablename__ = "bueiros"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String, unique=True, index=True, nullable=False)
    endereco = Column(String, nullable=False)
    bairro = Column(String, nullable=False)
    regiao = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    profundidade_cm = Column(Integer, nullable=False)
    nivel = Column(Float, default=0.0)
    status = Column(String, default="VAZIO")  # VAZIO | METADE | CHEIO

    leituras = relationship("Leitura", back_populates="bueiro", cascade="all, delete-orphan")
    alertas = relationship("Alerta", back_populates="bueiro", cascade="all, delete-orphan")
