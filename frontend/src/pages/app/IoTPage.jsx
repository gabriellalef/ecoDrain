import { useState, useRef, useEffect, useCallback } from 'react';

export default function IoTPage({ bueiros, setBueiros, toast }) {
  const [run, setRun] = useState(false);
  const [logs, setLogs] = useState([
    { t: new Date().toLocaleTimeString("pt-BR"), m: "Sistema IoT online — Conexão estabelecida com Edge Nodes", cls: "log-ok" },
    { t: new Date().toLocaleTimeString("pt-BR"), m: "Aguardando ciclo de transmissão", cls: "log-info" },
  ]);
  
  const iRef = useRef(null);
  const logEnd = useRef(null);

  useEffect(() => logEnd.current?.scrollIntoView({ behavior: "smooth" }), [logs]);
  
  const addLog = (m, cls = "log-info") => setLogs(p => [...p.slice(-49), { t: new Date().toLocaleTimeString("pt-BR"), m, cls }]);

  const doRead = useCallback(() => {
    setBueiros(p => {
      const idx = Math.floor(Math.random() * p.length);
      const b = p[idx];
      const delta = (Math.random() - 0.2) * 8; 
      const nv = Math.max(0, Math.min(100, b.nivel + delta));
      const ns = nv >= 70 ? "cheio" : nv >= 30 ? "metade" : "vazio";
      
      if (ns !== b.status) {
        addLog(`[ALERTA] ${b.codigo}: STATUS ${ns.toUpperCase()} (${nv.toFixed(1)}%)`, ns === "cheio" ? "log-err" : ns === "metade" ? "log-warn" : "log-ok");
        toast(`Sensor #${b.codigo}: Mudança para ${ns}`);
      } else {
        addLog(`[TELEMETRIA] Sensor #${b.codigo}: Nível ${nv.toFixed(1)}%`, "log-info");
      }
      
      const up = [...p]; up[idx] = { ...b, nivel: Math.round(nv), status: ns }; 
      return up;
    });
  }, [setBueiros, toast]);

  function toggle() {
    if (run) { clearInterval(iRef.current); setRun(false); addLog("Transmissão pausada", "log-warn"); }
    else { setRun(true); addLog("Iniciando pool de leitura (3s)", "log-ok"); iRef.current = setInterval(doRead, 3000); }
  }

  useEffect(() => () => clearInterval(iRef.current), []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "calc(100vh - 180px)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="glass-panel" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 500 }}>Controlador IoT Edge</h3>
            <span className={`badge ${run ? 'ok' : 'neutral'}`}>
              <span className="badge-dot" /> {run ? "TRANSMITINDO" : "PAUSADO"}
            </span>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button className={`btn ${run ? "btn-outline" : "btn-primary"}`} style={{ flex: 1 }} onClick={toggle}>
              {run ? "Pausar Simulação" : "Iniciar Simulação"}
            </button>
            <button className="btn btn-ghost" onClick={doRead}>Forçar Leitura</button>
          </div>
        </div>

        <div className="glass-panel" style={{ flex: 1, padding: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-light)", fontSize: 13, fontWeight: 500 }}>
            Sensores em Tempo Real
          </div>
          <div style={{ overflowY: "auto", flex: 1, padding: 12 }}>
            {bueiros.map(b => (
              <div key={b.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 12px", borderBottom: "1px solid var(--border-light)" }}>
                <span className="t-mono" style={{ color: "var(--brand-main)" }}>#{b.codigo}</span>
                <div style={{ flex: 1, margin: "0 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ height: 2, background: "var(--bg-surface-2)", flex: 1, borderRadius: 1 }}>
                    <div style={{ height: "100%", width: `${b.nivel}%`, background: b.status === "cheio" ? "var(--crit-main)" : b.status === "metade" ? "var(--warn-main)" : "var(--brand-main)", transition: "width 0.4s" }} />
                  </div>
                  <span className="t-mono">{b.nivel}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>Console de Diagnóstico</span>
          <button className="btn btn-ghost" style={{ padding: "4px 8px", fontSize: 11 }} onClick={() => setLogs([])}>Limpar</button>
        </div>
        <div style={{ flex: 1, padding: 24, overflowY: "auto", fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.8, background: "var(--bg-main)" }}>
          {logs.map((l, i) => (
            <div key={i} style={{ display: "flex", gap: 16, color: l.cls === "log-ok" ? "var(--brand-main)" : l.cls === "log-warn" ? "var(--warn-main)" : l.cls === "log-err" ? "var(--crit-main)" : "var(--text-muted)" }}>
              <span style={{ color: "var(--text-dim)", flexShrink: 0 }}>[{l.t}]</span>
              <span>{l.m}</span>
            </div>
          ))}
          <div ref={logEnd} />
        </div>
      </div>
    </div>
  );
}
