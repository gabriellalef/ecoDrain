"""
Cria as tabelas e insere dados iniciais.
Executado automaticamente na inicialização do container.
"""
import time
from sqlalchemy.exc import OperationalError

from app.database import engine, SessionLocal, Base
from app.models import User, Bueiro, Leitura, Alerta  # noqa: F401 (importa para registrar)
from app.auth import hash_senha


def aguardar_banco(tentativas: int = 10, intervalo: int = 3):
    for i in range(tentativas):
        try:
            with engine.connect():
                print("✅ Banco de dados disponível.")
                return
        except OperationalError:
            print(f"⏳ Aguardando banco... ({i + 1}/{tentativas})")
            time.sleep(intervalo)
    raise RuntimeError("❌ Não foi possível conectar ao banco de dados.")


def seed():
    aguardar_banco()
    Base.metadata.create_all(bind=engine)
    print("✅ Tabelas criadas.")

    db = SessionLocal()
    try:
        # Admin
        if not db.query(User).filter(User.email == "admin@ecodrain.com").first():
            admin = User(
                nome="Administrador",
                email="admin@ecodrain.com",
                senha_hash=hash_senha("123456"),
            )
            db.add(admin)
            db.commit()
            print("✅ Usuário admin criado.")

        # Bueiros de exemplo
        if db.query(Bueiro).count() == 0:
            bueiros_data = [
                dict(codigo="000001", endereco="Av. Paulista, 1000", bairro="Bela Vista",
                     regiao="Centro", latitude=-23.5633, longitude=-46.6544, profundidade_cm=120,
                     nivel=91.0, status="CHEIO"),
                dict(codigo="000002", endereco="Rua Augusta, 500", bairro="Consolação",
                     regiao="Centro", latitude=-23.5521, longitude=-46.6582, profundidade_cm=100,
                     nivel=47.0, status="METADE"),
                dict(codigo="000003", endereco="Av. Ipiranga, 200", bairro="República",
                     regiao="Centro", latitude=-23.5441, longitude=-46.6388, profundidade_cm=110,
                     nivel=12.0, status="VAZIO"),
                dict(codigo="000004", endereco="Av. Rebouças, 1200", bairro="Pinheiros",
                     regiao="Oeste", latitude=-23.5652, longitude=-46.6801, profundidade_cm=130,
                     nivel=76.0, status="CHEIO"),
                dict(codigo="000005", endereco="Rua da Consolação, 300", bairro="Consolação",
                     regiao="Centro", latitude=-23.5489, longitude=-46.6571, profundidade_cm=95,
                     nivel=53.0, status="METADE"),
                dict(codigo="000006", endereco="Av. Faria Lima, 3000", bairro="Itaim Bibi",
                     regiao="Oeste", latitude=-23.5858, longitude=-46.6858, profundidade_cm=140,
                     nivel=24.0, status="VAZIO"),
                dict(codigo="000007", endereco="Av. Marginal Tietê, 500", bairro="Santana",
                     regiao="Norte", latitude=-23.5185, longitude=-46.6318, profundidade_cm=160,
                     nivel=96.0, status="CHEIO"),
                dict(codigo="000008", endereco="Rua Vergueiro, 1800", bairro="Vila Mariana",
                     regiao="Sul", latitude=-23.5897, longitude=-46.6355, profundidade_cm=105,
                     nivel=38.0, status="METADE"),
                dict(codigo="000009", endereco="Av. Jabaquara, 900", bairro="Jabaquara",
                     regiao="Sul", latitude=-23.6240, longitude=-46.6456, profundidade_cm=115,
                     nivel=7.0, status="VAZIO"),
                dict(codigo="000010", endereco="Av. Aricanduva, 2000", bairro="Aricanduva",
                     regiao="Leste", latitude=-23.5452, longitude=-46.5215, profundidade_cm=125,
                     nivel=65.0, status="METADE"),
                dict(codigo="000011", endereco="Rua Catumbi, 400", bairro="Catumbi",
                     regiao="Leste", latitude=-23.5350, longitude=-46.5588, profundidade_cm=98,
                     nivel=82.0, status="CHEIO"),
                dict(codigo="000012", endereco="Av. Casa Verde, 1100", bairro="Casa Verde",
                     regiao="Norte", latitude=-23.5072, longitude=-46.6601, profundidade_cm=112,
                     nivel=19.0, status="VAZIO"),
            ]
            for bd in bueiros_data:
                db.add(Bueiro(**bd))
            db.commit()

            # Alertas iniciais apenas para bueiros CHEIO
            bueiros = db.query(Bueiro).all()
            for b in bueiros:
                if b.status == "CHEIO":
                    db.add(Alerta(
                        bueiro_id=b.id,
                        mensagem=f"Bueiro #{b.codigo} CHEIO — {b.endereco}",
                        status="ativo",
                    ))
            db.commit()
            print(f"✅ {len(bueiros_data)} bueiros e alertas de exemplo criados.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
