import api from '../../services/api';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { tAgo } from '../../utils/helpers';

export default function AlertasPage({ toast }) {
  const { alertas, setAlertas, bueiros, setBueiros, trab, loadData } = useContext(AppContext);
  const [filt, setFilt] = useState("ativo");
  const [loading, setLoading] = useState(null);

  // Atualiza dados quando a página abre
  useEffect(() => {
    loadData();
  }, []);

  const conclude = async (alerta) => {
    setLoading(alerta.id);
    try {
      await api.patch(`/alertas/${alerta.id}/concluir`);  // ← Chamada real
      
      // Atualiza estado local
      setAlertas(prev => prev.map(a => 
        a.id === alerta.id ? { ...a, status: "concluido", fim: new Date().toISOString() } : a
      ));
      
      toast("✅ Alerta concluído com sucesso!");
    } catch (err) {
      console.error(err);
      toast("❌ Erro ao concluir alerta");
    } finally {
      setLoading(null);
    }
  };

  const filtrado = alertas.filter(a => filt === "todos" ? true : a.status === filt);

  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
        <div className="glass-panel" style={{ flex: 1, padding: 24 }}>
          <div className="t-mono" style={{ marginBottom: 8 }}>Críticos Ativos</div>
          <div style={{ fontSize: 32, fontFamily: "var(--font-serif)", color: "var(--crit-main)" }}>
            {alertas.filter(a => a.status === "ativo" && a.urg === "crit").length}
          </div>
        </div>
        {/* outros cards... */}
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, background: "var(--bg-surface-2)", padding: 4, borderRadius: "var(--radius-md)", width: "fit-content" }}>
        {[["ativo", "Ativos"], ["concluido", "Concluídos"], ["todos", "Todos"]].map(([k, l]) => (
          <button key={k} className={`btn ${filt === k ? "btn-primary" : "btn-ghost"}`} onClick={() => setFilt(k)}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtrado.map(a => {
          const b = bueiros.find(x => x.id === a.bueiro_id || x.id === a.buid);
          const w = trab.find(x => x.id === a.wid);
          return (
            <div key={a.id} className="glass-panel" style={{ padding: "20px 24px", borderLeft: `3px solid ${a.urg === "crit" ? "var(--crit-main)" : "var(--warn-main)"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <span className={`badge ${a.urg === "crit" ? "crit" : "warn"}`}>
                      <span className="badge-dot" /> {a.urg === "crit" ? "Crítico" : "Atenção"}
                    </span>
                    <span className={`badge ${a.status === "ativo" ? "warn" : "neutral"}`}>{a.status}</span>
                    <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{tAgo(a.timestamp || a.ts)} atrás</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{b?.endereco || b?.end || "—"}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{a.mensagem || a.msg}</div>
                </div>
                
                {a.status === "ativo" && (
                  <button 
                    className="btn btn-outline" 
                    onClick={() => conclude(a)}
                    disabled={loading === a.id}
                  >
                    {loading === a.id ? "Concluindo..." : "Concluir"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}