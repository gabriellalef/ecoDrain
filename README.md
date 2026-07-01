# 🌧️ ecoDrain

Sistema full-stack de monitoramento inteligente de bueiros urbanos, com sensor IoT (ESP32 + ultrassônico), API REST em FastAPI e dashboard web em React para prevenção de alagamentos.

> Projeto desenvolvido para demonstrar uma solução ponta a ponta — do sensor físico ao dashboard — para um problema real de infraestrutura urbana: bueiros entupidos causando alagamentos.

![status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![python](https://img.shields.io/badge/backend-FastAPI-009688)
![react](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB)
![license](https://img.shields.io/badge/license-MIT-blue)

<!-- 
  👉 Sugestão: adicione aqui 1 GIF ou 2-3 screenshots do dashboard 
  (tela pública, login e Dashboard com o mapa). É a primeira coisa 
  que recrutadores e visitantes do repositório veem.
  Exemplo:
  ![dashboard](docs/screenshot-dashboard.png)
-->

---

## 📌 O problema

Alagamentos urbanos são frequentemente agravados por bueiros entupidos ou com nível de água elevado, detectados tarde demais — geralmente só depois que a rua já está alagada. O **ecoDrain** propõe monitoramento contínuo do nível de água em bueiros através de sensores ultrassônicos, com alertas automáticos para as equipes responsáveis antes que o problema se torne crítico.

## 🏗️ Arquitetura

```
┌─────────────┐     Serial USB      ┌──────────────────┐     HTTP/JWT     ┌──────────────┐     REST API     ┌─────────────┐
│   ESP32 +   │ ───────────────────▶│  Bridge Python    │ ───────────────▶│  FastAPI     │◀─────────────────│   React     │
│  Sensor     │   "000001,73"       │ (ecodrain_bridge)  │  POST /leituras │  + PostgreSQL │   dashboard      │  (Vite)     │
│  ultrassônico│                     │                    │                 │              │                  │             │
└─────────────┘                     └──────────────────┘                  └──────────────┘                  └─────────────┘
```

1. O **ESP32** lê a distância até a água com um sensor ultrassônico e envia uma linha CSV (`código,nível%`) pela porta serial a cada 30 segundos.
2. O **bridge Python** (`sensor/ecodrain_bridge.py`) lê a serial, se autentica na API via JWT e envia a leitura por HTTP.
3. A **API FastAPI** persiste a leitura, recalcula o status do bueiro (`vazio` / `metade` / `cheio`) e dispara um alerta automático quando necessário.
4. O **dashboard React** consome a API para exibir mapa, bueiros, alertas e analytics em tempo real.

## ✨ Funcionalidades

- 🔐 Autenticação via JWT (login de administrador)
- 🗺️ Mapa interativo com a localização dos bueiros monitorados
- 📊 Dashboard com totais por status e alertas ativos
- 🚨 Geração automática de alertas quando um bueiro atinge nível crítico
- 📈 Histórico de leituras por bueiro
- 🔌 Integração real com hardware (ESP32 + sensor ultrassônico HC-SR04)

## 🧰 Stack técnica

| Camada | Tecnologias |
|---|---|
| **Firmware** | C++ (Arduino), sensor ultrassônico HC-SR04 |
| **Bridge** | Python, PySerial, Requests |
| **Backend** | FastAPI, SQLAlchemy, PostgreSQL, JWT (python-jose), Passlib/bcrypt, Pydantic |
| **Frontend** | React 18, Vite, Axios, Lucide Icons |
| **Infra** | Docker, Docker Compose |

## 📂 Estrutura do repositório

```
ecodrain/
├── backend/          # API FastAPI + PostgreSQL
│   ├── app/
│   │   ├── models/       # Modelos SQLAlchemy (Bueiro, Leitura, Alerta, User)
│   │   ├── schemas/      # Schemas Pydantic
│   │   ├── crud/         # Regras de acesso a dados
│   │   └── routes/       # Endpoints REST
│   ├── sensor/       # Firmware ESP32 + bridge serial→HTTP
│   └── README.md     # Documentação detalhada da API
├── frontend/          # Dashboard React + Vite
│   └── src/
└── README.md          # Este arquivo
```

## 🚀 Como rodar localmente

### Backend + banco de dados
```bash
cd backend
cp .env.example .env
docker compose up --build
```
API disponível em `http://localhost:8000` — documentação interativa em `http://localhost:8000/docs`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Credenciais de demonstração
| Email | Senha |
|---|---|
| admin@ecodrain.com | 123456 |

> ⚠️ Credenciais e senha apenas para o ambiente de demonstração local. Nunca use em produção.

## 🗺️ Roadmap / próximos passos

- [ ] Substituir a bridge serial por conexão Wi-Fi direta do ESP32 (MQTT ou HTTP)
- [ ] Notificações push/e-mail para alertas críticos
- [ ] Testes automatizados (backend e frontend)
- [ ] Múltiplos perfis de usuário (operador, administrador)
- [ ] Deploy público com CI/CD

## 📄 Licença

Este projeto está sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

Desenvolvido por **Gabriel Alef e Julia Rayra** — [[LinkedIn]](https://www.linkedin.com/in/gabriel-alef/) (#) · [GitHub](#)
