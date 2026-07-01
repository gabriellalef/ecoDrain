import { useState } from 'react';
import { ArrowLeft, User, Lock, ArrowRight } from 'lucide-react';
import api from '../../services/api';   // ← Nova importação

export default function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState("admin@ecodrain.com");
  const [pass, setPass] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function doLogin() {
    if (!email || !pass) {
      setError("Preencha email e senha");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post('/auth/login', {
        email,
        senha: pass
      });

      // Salva o token
      localStorage.setItem('token', res.data.access_token);

      // Chama a função que vem do App (para mudar para tela logada)
      onLogin(res.data.usuario);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1.2fr 1fr", backgroundColor: "var(--bg-main)" }}>
      {/* Left side branding */}
      <div style={{ position: "relative", padding: "60px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000&auto=format&fit=crop') center/cover" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,11,13,0.95), rgba(10,11,13,0.4))", zIndex: 0 }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <button className="btn btn-ghost" style={{ padding: "8px 0", gap: 8, marginBottom: 40, color: "var(--text-muted)" }} onClick={onBack}>
            <ArrowLeft size={16} /> Voltar para o portal público
          </button>
          
          <div className="brand-logo" style={{ marginBottom: 40 }}>
            <div className="brand-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" stroke="#fff" strokeWidth="2.2"/><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="brand-text">eco<em>Drain</em></span>
          </div>

          <h1 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontFamily: "var(--font-serif)", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.1, marginBottom: 24, maxWidth: "500px" }}>
            Acesso Restrito ao Centro de Operações.
          </h1>
          <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", maxWidth: "400px", lineHeight: 1.6 }}>
            Faça login para monitorar a telemetria dos sensores e gerenciar as frotas de campo em tempo real.
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 1, fontSize: "12px", color: "var(--text-dim)" }}>
          &copy; 2025 ecoDrain Sistema Operacional.
        </div>
      </div>

      {/* Right side form */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 600, color: "var(--text-main)", marginBottom: 8 }}>Entrar na Conta</h2>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: 40 }}>Insira suas credenciais institucionais.</p>

          {error && (
            <div style={{ background: "#450a0a", color: "#fda4af", padding: "12px 16px", borderRadius: "8px", marginBottom: 20, fontSize: "14px" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 32 }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 8 }}>E-mail institucional</label>
              <div style={{ position: "relative" }}>
                <User size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
                <input 
                  className="input" 
                  style={{ paddingLeft: 44, height: 48 }} 
                  placeholder="admin@ecodrain.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-main)", display: "block", marginBottom: 8 }}>Senha</label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} />
                <input 
                  className="input" 
                  type="password" 
                  style={{ paddingLeft: 44, height: 48 }} 
                  placeholder="123456" 
                  value={pass} 
                  onChange={e => setPass(e.target.value)} 
                  onKeyDown={e => e.key === 'Enter' && doLogin()} 
                />
              </div>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: "100%", height: 48, fontSize: "15px", display: "flex", justifyContent: "space-between", padding: "0 24px" }} 
            onClick={doLogin} 
            disabled={loading}
          >
            <span>{loading ? "Autenticando..." : "Acessar Plataforma"}</span>
            {!loading && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}