import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Droplets, Wrench, X } from 'lucide-react';
import LMap from '../../components/map/LMap';

export default function Dashboard({ bueiros, trab, alertas, setAlertas, toast }) {
  const [sel, setSel] = useState(null);
  const [filt, setFilt] = useState("all");
  const [showW, setShowW] = useState(false);
  const [dispatchState, setDispatchState] = useState("idle");

  const cheios = bueiros.filter(b => b.status === "cheio").length;
  const metade = bueiros.filter(b => b.status === "metade").length;
  const online = trab.filter(t => t.status === "online").length;

  const handleDispatch = () => {
    setDispatchState("loading");
    setTimeout(() => {
      setDispatchState("success");
      // Add a mock alert to demonstrate dispatch
      if (setAlertas) {
        setAlertas(p => [{ id: Date.now(), buid: sel.id, wid: trab[0].id, urg: sel.status === "cheio" ? "crit" : "warn", status: "ativo", ts: new Date().toISOString(), msg: `Bueiro #${sel.codigo} ${sel.status.toUpperCase()} — Despacho automático` }, ...p]);
      }
      toast("Equipe de campo notificada com sucesso.");
      setTimeout(() => {
        setDispatchState("idle");
        setSel(null);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="dashboard-layout">
      <div className="map-container">
        <LMap bueiros={bueiros} trabalhadores={trab} filter={filt} search="" onSelect={(b) => { setSel(b); setDispatchState("idle"); }} showW={showW} />
      </div>

      <div className="dashboard-ui">
        {/* Top Controls Overlay */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="map-controls-top">
            {[{ k: "all", l: "Todos" }, { k: "vazio", l: `Normais` }, { k: "metade", l: `Atenção (${metade})` }, { k: "cheio", l: `Críticos (${cheios})` }].map(f => (
              <div key={f.k} className={`map-filter ${filt === f.k ? "active" : ""}`} onClick={() => setFilt(f.k)}>
                {f.k === "cheio" && <span className="badge-dot" style={{ background: "var(--crit-main)" }} />}
                {f.k === "metade" && <span className="badge-dot" style={{ background: "var(--warn-main)" }} />}
                {f.k === "vazio" && <span className="badge-dot" style={{ background: "var(--brand-main)" }} />}
                {f.l}
              </div>
            ))}
            <div className="map-filter" style={{ marginLeft: 16 }} onClick={() => setShowW(!showW)}>
              <span className="badge-dot" style={{ background: showW ? "var(--info-main)" : "var(--text-muted)" }} /> Equipes
            </div>
          </div>
          
          {/* Subtle Stats */}
          <div style={{ background: "var(--bg-blur)", backdropFilter: "blur(20px)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", padding: "12px 20px", display: "flex", gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Monitorados</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "var(--text-main)" }}>{bueiros.length}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Equipe Ativa</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "var(--info-main)" }}>{online}</div>
            </div>
          </div>
        </div>

        {/* Selected Detail Panel */}
        {sel && (
          <div className="side-panel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", letterSpacing: "1px", marginBottom: 6 }}>ATIVO #{sel.codigo}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--text-main)", lineHeight: 1.2, marginBottom: 4 }}>{sel.end}</div>
                <div style={{ fontSize: 13, color: "var(--text-dim)" }}>{sel.bairro}, {sel.regiao}</div>
              </div>
              <button className="btn btn-ghost" style={{ padding: 6, minWidth: "auto" }} onClick={() => setSel(null)}>
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div style={{ padding: "16px 0", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>Nível de Obstrução</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: sel.status === "cheio" ? "var(--crit-main)" : sel.status === "metade" ? "var(--warn-main)" : "var(--brand-main)" }}>{sel.nivel}%</span>
              </div>
              <div style={{ height: 6, background: "var(--bg-surface-2)", borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
                <div style={{ height: "100%", width: `${sel.nivel}%`, background: sel.status === "cheio" ? "var(--crit-main)" : sel.status === "metade" ? "var(--warn-main)" : "var(--brand-main)", transition: "width 0.6s ease-in-out" }} />
              </div>
              <div style={{ fontSize: 12, color: "var(--text-dim)", display: "flex", alignItems: "center", gap: 6 }}>
                <AlertCircle size={14} /> {sel.status === "cheio" ? "Risco crítico de alagamento." : sel.status === "metade" ? "Atenção necessária em breve." : "Operação normal."}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: 12 }}>
                  <Droplets size={14} /> Última Limpeza
                </div>
                <div style={{ fontSize: 14, color: "var(--text-main)", fontWeight: 500 }}>{new Date(sel.limpeza).toLocaleDateString("pt-BR")}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: 12 }}>
                  <Wrench size={14} /> Última Manutenção
                </div>
                <div style={{ fontSize: 14, color: "var(--text-main)", fontWeight: 500 }}>{new Date(sel.manut).toLocaleDateString("pt-BR")}</div>
              </div>
            </div>

            <div style={{ padding: "16px", background: "var(--bg-surface-2)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                 <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>Sensor IoT (JSN-SR04T)</span>
                 <span className="badge ok" style={{ fontSize: 9 }}><span className="badge-dot" /> Online</span>
               </div>
               <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>
                 Profundidade total: {sel.prof} cm. Leitura estável.
               </div>
            </div>

            <button 
              className={`btn ${dispatchState === "success" ? "btn-outline" : "btn-primary"}`} 
              style={{ 
                width: "100%", padding: 14, 
                background: dispatchState === "success" ? "rgba(52, 211, 153, 0.1)" : "",
                borderColor: dispatchState === "success" ? "var(--brand-main)" : "",
                color: dispatchState === "success" ? "var(--brand-main)" : ""
              }}
              onClick={handleDispatch}
              disabled={dispatchState !== "idle"}
            >
              {dispatchState === "idle" && "Despachar Equipe Operacional"}
              {dispatchState === "loading" && <><Loader2 size={18} className="spin" /> Processando despacho...</>}
              {dispatchState === "success" && <><CheckCircle2 size={18} /> Equipe a caminho</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
