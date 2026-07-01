import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { REGIOES } from '../../data/mockData';
import api from '../../services/api';

export default function BueirosPage({ toast }) {
  const { bueiros, setBueiros, trab, loadData, refreshBueiros } = useContext(AppContext);
  
  const [modal, setModal] = useState(null); // null | "new" | id
  const [fst, setFst] = useState("all");
  const [frg, setFrg] = useState("all");
  const [form, setForm] = useState({});

  // Carregar dados ao abrir a página
  useEffect(() => {
    loadData();
  }, []);

  const filtered = bueiros.filter(b => 
    (fst === "all" || b.status === fst) && 
    (frg === "all" || b.regiao === frg)
  );

  const openNew = () => {
    setForm({
      codigo: "",
      endereco: "",
      bairro: "",
      regiao: "Centro",
      latitude: "",
      longitude: "",
      profundidade_cm: "120"
    });
    setModal("new");
  };

  const openEdit = (b) => {
    setForm({
      ...b,
      latitude: b.latitude || b.lat,
      longitude: b.longitude || b.lng,
      profundidade_cm: b.profundidade_cm || b.prof
    });
    setModal(b.id);
  };

  const save = async () => {
    if (!form.endereco || !form.latitude || !form.longitude) {
      toast("Preencha endereço, latitude e longitude");
      return;
    }

    try {
      if (modal === "new") {
        await api.post('/bueiros', {
          codigo: form.codigo || String(Date.now()).slice(-6),
          endereco: form.endereco,
          bairro: form.bairro,
          regiao: form.regiao,
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          profundidade_cm: parseInt(form.profundidade_cm) || 120
        });
        toast("✅ Bueiro cadastrado com sucesso!");
      } else {
        await api.put(`/bueiros/${modal}`, {
          endereco: form.endereco,
          bairro: form.bairro,
          regiao: form.regiao,
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          profundidade_cm: parseInt(form.profundidade_cm)
        });
        toast("✅ Bueiro atualizado!");
      }

      await refreshBueiros();
      setModal(null);
    } catch (err) {
      console.error(err);
      toast("❌ Erro ao salvar bueiro");
    }
  };

  const deletar = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este bueiro?")) return;
    
    try {
      await api.delete(`/bueiros/${id}`);
      await refreshBueiros();
      toast("🗑️ Bueiro removido");
    } catch (err) {
      toast("❌ Erro ao excluir");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", background: "var(--bg-surface-2)", borderRadius: "var(--radius-md)", padding: 4 }}>
          {["all", "vazio", "metade", "cheio"].map(s => (
            <button 
              key={s} 
              className={`btn ${fst === s ? "btn-primary" : "btn-ghost"}`} 
              onClick={() => setFst(s)}
            >
              {s === "all" ? "Todos" : s === "vazio" ? "Normal" : s === "metade" ? "Atenção" : "Crítico"}
            </button>
          ))}
        </div>
        
        <select 
          className="input" 
          style={{ width: 180 }} 
          value={frg} 
          onChange={e => setFrg(e.target.value)}
        >
          <option value="all">Todas as regiões</option>
          {REGIOES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        
        <button className="btn btn-outline" style={{ marginLeft: "auto" }} onClick={openNew}>
          + Novo Bueiro
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {filtered.map(b => (
          <div key={b.id} className="glass-panel" style={{ padding: 24 }}>
            {/* ... resto do card igual ao anterior ... */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="t-mono" style={{ color: "var(--brand-main)", marginBottom: 4 }}>#{b.codigo}</div>
                <div style={{ fontWeight: 500 }}>{b.endereco || b.end}</div>
                <div style={{ fontSize: 13, color: "var(--text-dim)" }}>{b.bairro}</div>
              </div>
              <span className={`badge ${b.status === "cheio" ? "crit" : b.status === "metade" ? "warn" : "ok"}`}>
                {b.status === "cheio" ? "Crítico" : b.status === "metade" ? "Intermediário" : "Normal"}
              </span>
            </div>

            {/* Barra de nível */}
            <div style={{ margin: "16px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                <span>Nível</span>
                <span>{b.nivel}%</span>
              </div>
              <div style={{ height: 6, background: "var(--bg-surface-2)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${b.nivel}%`, background: b.status === "cheio" ? "var(--crit-main)" : b.status === "metade" ? "var(--warn-main)" : "var(--brand-main)" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border-light)" }}>
              <button className="btn btn-ghost" onClick={() => openEdit(b)}>Editar</button>
              <button className="btn btn-ghost" style={{ color: "var(--crit-main)" }} onClick={() => deletar(b.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Cadastro/Edição */}
      {modal !== null && (
        <div className="modal-bg" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2>{modal === "new" ? "Novo Bueiro" : "Editar Bueiro"}</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label>Endereço *</label>
                <input className="input" value={form.endereco || ""} onChange={e => setForm({...form, endereco: e.target.value})} />
              </div>
              <div>
                <label>Bairro</label>
                <input className="input" value={form.bairro || ""} onChange={e => setForm({...form, bairro: e.target.value})} />
              </div>
              <div>
                <label>Região</label>
                <select className="input" value={form.regiao} onChange={e => setForm({...form, regiao: e.target.value})}>
                  {REGIOES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label>Latitude *</label>
                <input className="input" value={form.latitude || ""} onChange={e => setForm({...form, latitude: e.target.value})} />
              </div>
              <div>
                <label>Longitude *</label>
                <input className="input" value={form.longitude || ""} onChange={e => setForm({...form, longitude: e.target.value})} />
              </div>
              <div>
                <label>Profundidade (cm)</label>
                <input className="input" value={form.profundidade_cm || ""} onChange={e => setForm({...form, profundidade_cm: e.target.value})} />
              </div>
            </div>

            <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={save}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}