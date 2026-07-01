import { useState, useEffect } from 'react';
import LMap from '../../components/map/LMap';

export default function PublicHome({ onGoLogin, bueiros }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publicBueiros = bueiros.map(b => ({ ...b, status: "vazio" }));

  return (
    <div className="scroll-page" style={{ background: "var(--bg-main)", overflowX: "hidden" }}>
      
      <nav className={`pub-nav ${scrolled ? 'scrolled' : ''}`} style={{ zIndex: 200, background: scrolled ? "var(--bg-blur)" : "transparent", borderBottom: scrolled ? "1px solid var(--border-light)" : "none" }}>
        <div className="brand-logo">
          <div className="brand-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" stroke="#fff" strokeWidth="2.2"/><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="brand-text">eco<em>Drain</em></span>
        </div>
        <button className="btn btn-primary" onClick={onGoLogin}>Acesso Operacional</button>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="hero" style={{ padding: "140px 5vw 80px", position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000&auto=format&fit=crop') center/cover fixed", opacity: 0.15, zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,11,13,0.5), var(--bg-main))", zIndex: 1 }} />
        
        <div className="hero-content" style={{ gridTemplateColumns: "1.2fr 1fr", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2, gap: "60px" }}>
          <div className="hero-text-wrap" style={{ maxWidth: "100%" }}>
            <div className="badge ok" style={{ marginBottom: 32, background: "var(--bg-blur)", border: "1px solid var(--border-light)" }}><span className="badge-dot" /> Rede 100% Operacional</div>
            <h1 className="hero-h1" style={{ fontSize: "clamp(48px, 6vw, 84px)", fontWeight: 600, letterSpacing: "-0.04em", marginBottom: 24, lineHeight: 1.1 }}>Enquanto a cidade dorme, o sistema <em style={{ color: "var(--brand-main)", fontStyle: "normal" }}>continua monitorando.</em></h1>
            <p className="hero-p" style={{ fontSize: "1.25rem", color: "var(--text-muted)", maxWidth: "600px", marginBottom: 40, lineHeight: 1.6 }}>Alertas preventivos antes que a água alcance as ruas. A infraestrutura de drenagem de São Paulo agora é monitorada continuamente em tempo real.</p>
            <div style={{ display: 'flex', gap: 16 }}>
              <button className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "15px" }} onClick={onGoLogin}>Acesso para Funcionários</button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="cinematic-map-wrapper" style={{ width: '100%', maxWidth: '460px', border: '1px solid var(--border-light)', background: 'var(--bg-surface-2)', borderRadius: '50%', aspectRatio: '1/1', position: 'relative', overflow: 'hidden', boxShadow: '0 0 60px rgba(0,0,0,0.5)' }}>
              <div className="cinematic-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, transparent 40%, var(--bg-main) 95%)', zIndex: 10 }} />
              <LMap bueiros={publicBueiros} filter="all" search="" showW={false} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY WE EXIST (HUMAN / EMOTIONAL IMPACT) */}
      <section style={{ padding: "160px 5vw", position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2000&auto=format&fit=crop') center/cover fixed", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--bg-main) 0%, rgba(10,11,13,0.9) 40%, rgba(10,11,13,0.6) 100%)", zIndex: 1 }} />
        
        <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "680px" }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 32, lineHeight: 1.2, color: "var(--text-main)" }}>
              Por que o ecoDrain existe?
            </h2>
            <div style={{ fontSize: "1.25rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
              <p style={{ marginBottom: 24 }}>Todos os anos, chuvas intensas paralisam São Paulo. Bairros inteiros sofrem com alagamentos, o trânsito colapsa e o impacto recai sobre milhões de trabalhadores que tentam voltar para casa ou manter seus negócios funcionando.</p>
              <p style={{ marginBottom: 24 }}>A culpa raramente é apenas da chuva. O grande problema estrutural é operar a cidade às cegas: a <strong>incapacidade de prever</strong> com antecedência onde a infraestrutura invisível vai falhar.</p>
              <p style={{ color: "var(--text-main)", fontWeight: 500, fontSize: "1.35rem", borderLeft: "4px solid var(--brand-main)", paddingLeft: "24px", marginTop: "40px", fontStyle: "italic", lineHeight: 1.6 }}>
                "Nós nascemos para devolver o controle da rua para quem a opera. Trocamos o desespero e a reação pós-caos pela prevenção brutalmente cirúrgica."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OPERATIONAL REALITY */}
      <section style={{ padding: "160px 5vw", background: "var(--bg-main)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "center" }}>
          <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}>
            <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop" alt="Trabalhador operando infraestrutura sob chuva" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) contrast(1.1) grayscale(0.2)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, var(--bg-main), transparent)", height: "60%" }} />
            <div style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span className="badge warn"><span className="badge-dot" /> Viaturas em campo</span>
                <span className="t-mono" style={{ color: "var(--text-muted)" }}>BELA VISTA, SP</span>
              </div>
              <div style={{ fontSize: "18px", fontWeight: 500, color: "var(--text-main)", textShadow: "0 2px 8px rgba(0,0,0,0.8)", lineHeight: 1.4 }}>
                Equipe acionada via GPS após sensor do bueiro apontar 85% de obstrução sólida.
              </div>
            </div>
          </div>
          
          <div>
            <h2 style={{ fontSize: "36px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 32, lineHeight: 1.2, color: "var(--text-main)" }}>Resposta rápida antes que o problema alcance o asfalto.</h2>
            <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 24 }}>Manutenções cíclicas — limpar todos os bueiros uma vez a cada três meses — custam caro e não resolvem a urgência de uma tempestade inesperada. Nós alteramos esse modelo instalando sensores compactos conectados nas redes de drenagem mais críticas da cidade.</p>
            <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 40 }}>Quando os detritos se acumulam e o nível sobe perigosamente, a telemetria avisa a central. O operador não precisa adivinhar rotas: a tela aponta o local exato em vermelho e roteia a equipe operacional mais próxima. <strong>Isto é infraestrutura inteligente na prática.</strong></p>
            
            <button className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "15px" }} onClick={onGoLogin}>
              Entrar na Central Operacional
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS (Integrated urban layout) */}
      <section style={{ padding: "160px 5vw", position: "relative", zIndex: 2, background: "url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2000&auto=format&fit=crop') center/cover fixed" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,11,13,0.9)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }} />
        
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: 100 }}>
            <h2 style={{ fontSize: "36px", fontWeight: 600, color: "var(--text-main)", marginBottom: 16 }}>Infraestrutura urbana monitorada continuamente</h2>
            <p style={{ fontSize: "1.125rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto" }}>Como transformamos galerias de concreto abandonadas em nós vivos e integrados de gestão da cidade.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64 }}>
            <div style={{ borderLeft: "2px solid var(--brand-main)", paddingLeft: 32 }}>
              <div style={{ color: "var(--brand-main)", fontFamily: "var(--font-mono)", fontSize: "13px", marginBottom: 16 }}>01 — CAPTURA IOT</div>
              <h3 style={{ fontSize: "24px", fontWeight: 600, color: "var(--text-main)", marginBottom: 16 }}>Os olhos na rua</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>Equipamentos discretos e autônomos escaneiam o nível da água a cada 5 minutos, enviando pulsos de dados ininterruptos sobre o estado real de escoamento de cada galeria.</p>
            </div>
            
            <div style={{ borderLeft: "2px solid var(--warn-main)", paddingLeft: 32 }}>
              <div style={{ color: "var(--warn-main)", fontFamily: "var(--font-mono)", fontSize: "13px", marginBottom: 16 }}>02 — PROCESSAMENTO</div>
              <h3 style={{ fontSize: "24px", fontWeight: 600, color: "var(--text-main)", marginBottom: 16 }}>O cérebro na central</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>Milhares de pontos de dados convergem para nossos servidores. O algoritmo filtra o ruído de campo e identifica anomalias de obstrução com alta precisão.</p>
            </div>
            
            <div style={{ borderLeft: "2px solid var(--info-main)", paddingLeft: 32 }}>
              <div style={{ color: "var(--info-main)", fontFamily: "var(--font-mono)", fontSize: "13px", marginBottom: 16 }}>03 — DESPACHO TÁTICO</div>
              <h3 style={{ fontSize: "24px", fontWeight: 600, color: "var(--text-main)", marginBottom: 16 }}>A força em campo</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>O painel do operador alerta emergências iminentes. Viaturas de limpeza são direcionadas por GPS ao ponto exato, executando o serviço antes que o primeiro alagamento ocorra.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{ padding: "60px 5vw", borderTop: "1px solid var(--border)", background: "var(--bg-surface)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2 }}>
        <div>
          <span className="brand-text" style={{ fontSize: 18 }}>eco<em>Drain</em></span>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>São Paulo, Brasil</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--text-dim)" }}>© 2025 ecoDrain Sistema Institucional</div>
      </footer>
    </div>
  );
}
