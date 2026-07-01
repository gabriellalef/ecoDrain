import { useState } from 'react';
import { Camera, Save, LogOut, Moon, Sun } from 'lucide-react';

export default function AccountPage({ user, onLogout, toast }) {
  const [phone, setPhone] = useState(user.phone || "(11) 99999-9999");
  const [email, setEmail] = useState(user.email || "carlos.silva@ecodrain.sp.gov.br");
  const [address, setAddress] = useState(user.end || "Rua das Flores, 123");
  const [pass, setPass] = useState("••••••••");
  
  const [isLight, setIsLight] = useState(document.documentElement.classList.contains('light-theme'));

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove('light-theme');
      setIsLight(false);
    } else {
      document.documentElement.classList.add('light-theme');
      setIsLight(true);
    }
  };

  const save = () => {
    toast("Configurações salvas com sucesso.");
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", paddingBottom: 60 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--bg-surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 600, color: "var(--text-main)" }}>
              {user.av || "AD"}
            </div>
            <button className="btn btn-ghost" style={{ position: "absolute", bottom: -8, right: -8, padding: 6, background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "50%" }}>
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h2 style={{ fontSize: 24, fontFamily: "var(--font-serif)", marginBottom: 4 }}>{user.name}</h2>
            <div style={{ color: "var(--text-muted)", fontSize: 14 }}>{user.roleTitle || "Operador Sênior"}</div>
          </div>
        </div>
        <button className="btn btn-outline" style={{ color: "var(--crit-main)", borderColor: "var(--border)" }} onClick={onLogout}>
          <LogOut size={16} /> Encerrar Sessão
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Preferências
          </h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-main)" }}>Tema da Interface</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Alternar entre claro e escuro</div>
            </div>
            <button className={`btn ${isLight ? "btn-outline" : "btn-ghost"}`} onClick={toggleTheme}>
              {isLight ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 500 }}>Dados Institucionais</h3>
            <span className="badge neutral">Somente Leitura</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 16 }}>Gerenciado pela administração do sistema.</div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <div className="t-mono" style={{ marginBottom: 4 }}>Código do Funcionário</div>
              <div style={{ fontSize: 14, color: "var(--text-main)", fontWeight: 500 }}>{user.code || "ADM001"}</div>
            </div>
            <div>
              <div className="t-mono" style={{ marginBottom: 4 }}>Cargo / Função</div>
              <div style={{ fontSize: 14, color: "var(--text-main)", fontWeight: 500 }}>{user.func || "Gestão Geral"}</div>
            </div>
            <div>
              <div className="t-mono" style={{ marginBottom: 4 }}>Zona Operacional</div>
              <div style={{ fontSize: 14, color: "var(--text-main)", fontWeight: 500 }}>{user.zone || "Todas"}</div>
            </div>
            <div>
              <div className="t-mono" style={{ marginBottom: 4 }}>CPF</div>
              <div style={{ fontSize: 14, color: "var(--text-main)", fontWeight: 500 }}>{user.cpf || "•••.•••.•••-••"}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 24 }}>Informações Editáveis</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 8 }}>E-mail de Contato</label>
            <input className="input" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 8 }}>Telefone / WhatsApp</label>
            <input className="input" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 8 }}>Endereço Residencial</label>
            <input className="input" value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 8 }}>Senha de Acesso</label>
            <input className="input" type="password" value={pass} onChange={e => setPass(e.target.value)} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btn-primary" onClick={save}>
            <Save size={16} /> Salvar Alterações
          </button>
        </div>
      </div>

    </div>
  );
}
