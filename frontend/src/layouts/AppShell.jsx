import { useState, useContext } from 'react';
import { LayoutDashboard, AlertTriangle, Radio, CircleDot, Users, BarChart3, Server } from 'lucide-react';
import { AppContext } from '../contexts/AppContext';

import Dashboard from '../pages/app/Dashboard';
import BueirosPage from '../pages/app/BueirosPage';
import TrabPage from '../pages/app/TrabPage';
import AlertasPage from '../pages/app/AlertasPage';
import AnalyticsPage from '../pages/app/AnalyticsPage';
import IoTPage from '../pages/app/IoTPage';
import BackendDocsPage from '../pages/app/BackendDocsPage';
import AccountPage from '../pages/app/AccountPage';

export default function AppShell({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");

  // Pegando os dados do Context
  const { 
    bueiros, setBueiros, 
    trab, setTrab, 
    alertas, setAlertas,
    loadData 
  } = useContext(AppContext);

  const ativos = alertas.filter(a => a.status === "ativo").length;

  const navAll = [
    { id: "dashboard", i: <LayoutDashboard size={20} strokeWidth={1.5} />, l: "Operacional" },
    { id: "alertas", i: <AlertTriangle size={20} strokeWidth={1.5} />, l: "Ocorrências", badge: ativos || null },
    { id: "iot", i: <Radio size={20} strokeWidth={1.5} />, l: "Telemetria", adminOnly: true },
    { id: "bueiros", i: <CircleDot size={20} strokeWidth={1.5} />, l: "Ativos" },
    { id: "trabalhadores", i: <Users size={20} strokeWidth={1.5} />, l: "Equipes", adminOnly: true },
    { id: "analytics", i: <BarChart3 size={20} strokeWidth={1.5} />, l: "Analytics", adminOnly: true },
    { id: "backend", i: <Server size={20} strokeWidth={1.5} />, l: "Integração API", adminOnly: true },
  ];

  const nav = navAll.filter(it => !it.adminOnly || user?.role === "admin");

  const titles = {
    dashboard: "Dashboard Operacional",
    alertas: "Central de Alertas",
    iot: "Telemetria IoT",
    bueiros: "Gestão de Bueiros",
    trabalhadores: "Equipe de Campo",
    analytics: "Analytics",
    backend: "Arquitetura Backend",
    account: "Minha Conta e Configurações"
  };

  // Função toast simples (pode melhorar depois)
  const toast = (msg) => {
    alert(msg); // Temporário - vamos melhorar depois
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="app-sidebar">
        <div className="brand-logo">
          <div className="brand-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" stroke="#fff" strokeWidth="2.2"/>
              <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="brand-text">eco<em>Drain</em></span>
        </div>
        
        <nav className="nav-menu">
          {nav.map(it => (
            <div 
              key={it.id} 
              className={`nav-item ${page === it.id ? "active" : ""}`} 
              onClick={() => setPage(it.id)}
            >
              <span className="nav-icon">{it.i}</span>
              <span className="nav-label">{it.l}</span>
              {it.badge && <span className="badge badge-crit" style={{ marginLeft: "auto" }}>{it.badge}</span>}
            </div>
          ))}
        </nav>

        <div className="user-profile" onClick={() => setPage("account")}>
          <div className="user-avatar">{user?.av || "AD"}</div>
          <div className="user-info">
            <div className="user-name">{user?.name?.split(" ")[0] || "Usuário"}</div>
            <div className="user-role">Minha Conta</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="app-main">
        {page !== 'dashboard' && (
          <header className="app-topbar">
            <div>
              <h1 className="page-title">{titles[page]}</h1>
            </div>
            <div className="topbar-actions">
              <span className="badge ok"><span className="badge-dot"/> AO VIVO</span>
            </div>
          </header>
        )}

        <div className={page === 'dashboard' ? '' : 'app-content'}>
          {page === "dashboard" && <Dashboard bueiros={bueiros} trab={trab} alertas={alertas} setAlertas={setAlertas} />}
          {page === "bueiros" && <BueirosPage bueiros={bueiros} setBueiros={setBueiros} trab={trab} toast={toast} />}
          {page === "trabalhadores" && <TrabPage trab={trab} setTrab={setTrab} toast={toast} />}
          {page === "alertas" && <AlertasPage alertas={alertas} setAlertas={setAlertas} bueiros={bueiros} setBueiros={setBueiros} trab={trab} toast={toast} />}
          {page === "analytics" && <AnalyticsPage bueiros={bueiros} alertas={alertas} trab={trab} />}
          {page === "iot" && <IoTPage bueiros={bueiros} setBueiros={setBueiros} toast={toast} />}
          {page === "backend" && <BackendDocsPage />}
          {page === "account" && <AccountPage user={user} onLogout={onLogout} toast={toast} />}
        </div>
      </main>
    </div>
  );
}