import { useState } from 'react';
import { REGIOES } from '../../data/mockData';

export default function TrabPage({ trab, setTrab, toast }) {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  const openNew = () => { setForm({ nome: "", cpf: "", tel: "", end: "", bairro: "", regiao: "Centro", turno: "Manhã", lat: "", lng: "" }); setModal("new"); };
  const openEdit = t => { setForm({ ...t, lat: String(t.lat), lng: String(t.lng) }); setModal(t.id); };
  
  const toggle = id => { setTrab(p => p.map(t => t.id === id ? { ...t, status: t.status === "online" ? "offline" : "online", disp: t.status === "online" ? false : t.disp } : t)); toast("Status atualizado"); };
  
  const nextWCode = () => String(Date.now()).slice(-6);

  const save = () => {
    if (!form.nome || !form.cpf) { toast("Nome e CPF são obrigatórios"); return; }
    if (modal === "new") {
      setTrab(p => [...p, { ...form, id: Date.now(), codigo: nextWCode(), status: "online", disp: true, lat: parseFloat(form.lat) || -23.55, lng: parseFloat(form.lng) || -46.63 }]);
      toast("Funcionário cadastrado");
    } else {
      setTrab(p => p.map(t => t.id === modal ? { ...t, ...form, lat: parseFloat(form.lat) || t.lat, lng: parseFloat(form.lng) || t.lng } : t));
      toast("Dados atualizados");
    }
    setModal(null);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 32 }}>
        <button className="btn btn-outline" onClick={openNew}>+ Novo Funcionário</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {trab.map(t => (
          <div key={t.id} className="glass-panel" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--brand-main)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, color: "var(--text-inverse)" }}>
                {t.nome.split(" ").slice(0, 2).map(n => n[0]).join("")}
              </div>
              <span className={`badge ${t.status === "online" ? "ok" : "neutral"}`}>
                <span className="badge-dot" /> {t.status}
              </span>
            </div>
            
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-main)", marginBottom: 4 }}>{t.nome}</div>
            <div className="t-mono" style={{ color: "var(--brand-main)", marginBottom: 16 }}>#{t.codigo}</div>
            
            <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
              <div>{t.tel}</div>
              <div>{t.bairro} · {t.regiao}</div>
              <div style={{ color: "var(--text-muted)" }}>{t.turno} {t.disp ? "· Disponível" : ""}</div>
            </div>
            
            <div style={{ display: "flex", gap: 8, borderTop: "1px solid var(--border-light)", paddingTop: 16 }}>
              <button className="btn btn-ghost" style={{ flex: 1, padding: "6px 0", fontSize: 12 }} onClick={() => openEdit(t)}>Editar</button>
              <button className="btn btn-ghost" style={{ flex: 1, padding: "6px 0", fontSize: 12 }} onClick={() => toggle(t.id)}>
                {t.status === "online" ? "Offline" : "Online"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="glass-panel" style={{ padding: 32, width: 600, maxWidth: "90vw", background: "var(--bg-main)", border: "none", boxShadow: "0 24px 48px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{modal === "new" ? "Novo Funcionário" : "Editar Funcionário"}</h2>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>Preencha os dados do agente operacional para cadastro no sistema.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 6 }}>Nome completo *</label>
                <input className="input" placeholder="Ex: Carlos Silva" value={form.nome || ""} onChange={e => setForm({ ...form, nome: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 6 }}>CPF *</label>
                <input className="input" placeholder="000.000.000-00" value={form.cpf || ""} onChange={e => setForm({ ...form, cpf: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 6 }}>Telefone de Contato</label>
                <input className="input" placeholder="(11) 90000-0000" value={form.tel || ""} onChange={e => setForm({ ...form, tel: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 6 }}>Zona de Atuação</label>
                <select className="input" value={form.regiao || "Centro"} onChange={e => setForm({ ...form, regiao: e.target.value })}>
                  {REGIOES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 6 }}>Turno</label>
                <select className="input" value={form.turno || "Manhã"} onChange={e => setForm({ ...form, turno: e.target.value })}>
                  {["Manhã", "Tarde", "Noite"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                <input type="checkbox" checked={form.status === "online"} onChange={e => setForm({ ...form, status: e.target.checked ? "online" : "offline" })} />
                <label style={{ fontSize: 13, color: "var(--text-main)" }}>Marcado como Online</label>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                <input type="checkbox" checked={form.disp} onChange={e => setForm({ ...form, disp: e.target.checked })} />
                <label style={{ fontSize: 13, color: "var(--text-main)" }}>Disponível para Despacho</label>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 32 }}>
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={save}>Confirmar Cadastro</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
