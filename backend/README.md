# ecoDrain — Backend API

Backend do sistema de monitoramento de bueiros urbanos.  
Desenvolvido com **FastAPI + PostgreSQL + SQLAlchemy + JWT**.

---

## Requisitos

- Docker
- Docker Compose

---

## Como executar

```bash
# 1. Clone o repositório e entre na pasta
cd ecodrain

# 2. Copie o arquivo de ambiente (já vem pronto para desenvolvimento)
cp .env.example .env

# 3. Suba os containers
docker compose up --build
```

A API estará disponível em: **http://localhost:8000**  
Documentação interativa: **http://localhost:8000/docs**

---

## Credenciais iniciais

| Campo | Valor |
|-------|-------|
| Email | admin@ecodrain.com |
| Senha | 123456 |

---

## Endpoints

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/login` | Login — retorna JWT |

### Bueiros
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/bueiros` | Lista todos os bueiros |
| GET | `/bueiros/{id}` | Detalhes de um bueiro |
| POST | `/bueiros` | Cadastra novo bueiro |
| PUT | `/bueiros/{id}` | Atualiza bueiro |
| DELETE | `/bueiros/{id}` | Remove bueiro |

### Leituras (ESP32)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/leituras` | Lista leituras (filtro: `?bueiro_id=1`) |
| POST | `/leituras` | Registra nova leitura do sensor |

### Alertas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/alertas` | Lista alertas (filtro: `?status=ativo`) |
| PATCH | `/alertas/{id}/concluir` | Conclui um alerta |

### Dashboard
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/dashboard` | Totais por status + alertas ativos |

---

## Regras de status

| Nível | Status |
|-------|--------|
| ≥ 70% | `cheio` |
| ≥ 30% | `metade` |
| < 30% | `vazio` |

Um alerta é gerado automaticamente quando o bueiro muda para `cheio` ou `metade`.

---

## Exemplo: envio de leitura pelo ESP32

```http
POST /leituras
Authorization: Bearer <token>
Content-Type: application/json

{
  "bueiro_id": 1,
  "nivel": 85.3
}
```

---

## Estrutura do projeto

```
ecodrain/
├── app/
│   ├── main.py          # Entrypoint FastAPI
│   ├── config.py        # Configurações via .env
│   ├── database.py      # Engine e sessão SQLAlchemy
│   ├── auth.py          # JWT e autenticação
│   ├── seed.py          # Criação de tabelas e dados iniciais
│   ├── models/          # Modelos SQLAlchemy
│   ├── schemas/         # Schemas Pydantic
│   ├── crud/            # Operações de banco de dados
│   └── routes/          # Rotas FastAPI
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env
└── .env.example
```
