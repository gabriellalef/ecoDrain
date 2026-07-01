import { REGIOES } from '../../data/mockData';

export default function AnalyticsPage({ bueiros, alertas }) {
  const concl = alertas.filter(a => a.fim);
  const tResp = concl.length ? Math.round(concl.reduce((s, a) => (s + (new Date(a.fim) - new Date(a.ts)) / 60000), 0) / concl.length) : 0;
  const nivelMed = Math.round(bueiros.reduce((s, b) => s + b.nivel, 0) / bueiros.length);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { l: "Nível Médio Global", v: `${nivelMed}%`, c: "var(--info-main)" },
          { l: "Alertas Ativos", v: alertas.filter(a => a.status === "ativo").length, c: "var(--crit-main)" },
          { l: "Tempo Médio Resp.", v: `${tResp}min`, c: "var(--warn-main)" },
          { l: "Taxa de Resolução", v: `${Math.round((concl.length / Math.max(alertas.length, 1)) * 100)}%`, c: "var(--brand-main)" },
        ].map((s, i) => (
          <div key={i} className="glass-panel" style={{ padding: 24 }}>
            <div className="t-mono" style={{ marginBottom: 8, color: "var(--text-muted)" }}>{s.l}</div>
            <div style={{ fontSize: 32, fontFamily: "var(--font-serif)", color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 24 }}>Distribuição Geográfica</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {REGIOES.map(r => {
              const count = bueiros.filter(b => b.regiao === r).length;
              if (count === 0) return null;
              return (
                <div key={r}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: "var(--text-main)" }}>{r}</span>
                    <span style={{ color: "var(--text-dim)" }}>{count} bueiros</span>
                  </div>
                  <div style={{ height: 4, background: "var(--bg-surface-2)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(count / bueiros.length) * 100}%`, background: "var(--brand-main)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
