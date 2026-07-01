export default function BackendDocsPage() {
  const eps = [
    { m: "POST", p: "/auth/login", d: "JWT · bcrypt · retorna access_token", c: "var(--info-main)" },
    { m: "GET", p: "/bueiros/", d: "Lista pontos de monitoramento", c: "var(--brand-main)" },
    { m: "POST", p: "/bueiros/", d: "Cadastra novo ponto", c: "var(--info-main)" },
    { m: "PATCH", p: "/bueiros/{id}", d: "Atualiza coordenadas e profundidade", c: "var(--warn-main)" },
    { m: "POST", p: "/leituras/", d: "Recebe telemetria do Edge Node", c: "var(--info-main)" },
    { m: "GET", p: "/alertas/", d: "Lista ocorrências ativas", c: "var(--brand-main)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 800 }}>
      <div className="glass-panel" style={{ padding: 32 }}>
        <h2 style={{ fontSize: 20, fontFamily: "var(--font-serif)", marginBottom: 24 }}>Arquitetura do Sistema</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <h3 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16 }}>Stack Base</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12, color: "var(--text-dim)" }}>
              <li><strong style={{ color: "var(--text-main)" }}>FastAPI</strong> (Python 3.11+)</li>
              <li><strong style={{ color: "var(--text-main)" }}>PostgreSQL</strong> com SQLAlchemy</li>
              <li><strong style={{ color: "var(--text-main)" }}>JWT</strong> (python-jose + passlib)</li>
              <li><strong style={{ color: "var(--text-main)" }}>Twilio API</strong> (Notificações)</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16 }}>Camada IoT</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12, color: "var(--text-dim)" }}>
              <li><strong style={{ color: "var(--text-main)" }}>ESP32</strong> Node</li>
              <li><strong style={{ color: "var(--text-main)" }}>JSN-SR04T</strong> (Ultrassom)</li>
              <li><strong style={{ color: "var(--text-main)" }}>MQTT / HTTP REST</strong></li>
              <li>Bateria LiPo + Painel Solar 5V</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-light)", fontSize: 14, fontWeight: 500 }}>Endpoints Principais</div>
        <div style={{ padding: 12 }}>
          {eps.map((e, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 12px", borderBottom: i < eps.length - 1 ? "1px solid var(--border-light)" : "none" }}>
              <span className="t-mono" style={{ color: e.c, background: "var(--bg-surface-2)", padding: "4px 8px", borderRadius: 4, width: 60, textAlign: "center" }}>{e.m}</span>
              <span className="t-mono" style={{ color: "var(--text-main)", width: 140 }}>{e.p}</span>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{e.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
