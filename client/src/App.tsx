import { useEffect, useState, useRef, useCallback } from 'react';
import './index.css';
import logoImg from '@assets/123123_1758883312995.png';

function App() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user already verified age
    const verified = localStorage.getItem('age_verified');
    if (verified === 'true') {
      setAgeVerified(true);
    }

    // Add scroll animations
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((el) => {
        const speed = (el as HTMLElement).dataset.parallax || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    // Add magnetic cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const magneticElements = document.querySelectorAll('.magnetic');
      magneticElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 150) {
          const force = Math.min(20, (1 - distance / 150) * 20);
          (el as HTMLElement).style.transform = `translate(${distX * force / distance}px, ${distY * force / distance}px) scale(1.05)`;
        } else {
          (el as HTMLElement).style.transform = '';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Add entrance animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const handleAgeConfirm = () => {
    localStorage.setItem('age_verified', 'true');
    setAgeVerified(true);
  };

  const handleAgeDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };

  const WHATSAPP_LINK = "https://wa.me/5511999999999?text=Quero%20entrar%20no%20grupo";

  // Kinetic typography animation for headline
  const animateText = useCallback(() => {
    const headline = document.querySelector('.main-headline');
    if (headline) {
      const text = headline.textContent || '';
      const words = text.split(' ');
      headline.innerHTML = words.map((word, i) => 
        `<span class="word" style="--delay: ${i * 0.1}s">${word}</span>`
      ).join(' ');
    }
  }, []);

  useEffect(() => {
    if (ageVerified) {
      setTimeout(animateText, 100);
    }
  }, [ageVerified, animateText]);

  if (!ageVerified) {
    return (
      <div className="age-gate">
        <div className="age-card">
          <h2>Conteúdo apenas para maiores de 18 anos</h2>
          <p>Este site contém material adulto e é voltado apenas para pessoas maiores de 18 anos. Confirma que você tem 18 anos ou mais?</p>
          <div className="age-actions">
            <button className="btn-ghost magnetic" onClick={handleAgeDecline}>Não</button>
            <button className="btn-accept magnetic" onClick={handleAgeConfirm}>Sim, sou maior</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Luxury Background Layers */}
      <div className="luxury-bg" />
      
      {/* Animated Spotlights */}
      <div className="spotlight-container">
        <div className="spotlight" />
        <div className="spotlight" />
      </div>
      
      {/* Particle Field */}
      <div className="particle-field">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      <div className="main-wrapper">
      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo">
            <img src={logoImg} alt="Sexy Premium" className="logo-img" />
          </div>
          <a 
            className="cta desktop-cta magnetic" 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="cta-text">Entrar no WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container">
        {/* Main Headline - Before Video */}
        <h1 className="main-headline animate-on-scroll" data-parallax="0.3">
          O Segredo Que Vai Mudar<br />
          <span className="highlight">Suas Noites Para Sempre</span>
        </h1>
        
        <p className="sub-headline animate-on-scroll" data-parallax="0.2">
          Descubra o método exclusivo que está revolucionando a vida íntima de milhares de pessoas
        </p>
        
        <section className="hero animate-on-scroll">
          <div className="hero-content">
            {/* VSL Video Player */}
            <div className="vsl-wrap" data-parallax="0.1">
              {!videoPlaying ? (
                <div 
                  className="poster"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="play-overlay" onClick={handlePlayVideo}>
                    <div className="play-btn">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <video
                  className="video-player"
                  controls
                  autoPlay
                  muted
                  style={{ width: '100%', borderRadius: '14px' }}
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
              )}
            </div>

            <h1 className="headline">
              <span className="headline-accent">Encontros rápidos.</span> Discrição total.
            </h1>
            <p className="sub">
              Grupo VIP exclusivo para adultos sofisticados. Conexões reais com segurança e consentimento.
            </p>
            
            <div className="cta-wrapper">
              <a 
                className="cta cta-primary cta-pulse magnetic" 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Entrar no grupo
              </a>
            </div>

            <div className="social-proof">
              <span className="member-count">+7.892 membros</span>
              <span className="verified">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#3ddc84">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                verificados
              </span>
            </div>
          </div>

          {/* Side Card */}
          <aside className="hero-aside">
            <div className="proof-card">
              <p className="proof-label">Prova social</p>
              <p className="proof-number">+7.892</p>
              <p className="proof-desc">membros ativos</p>
              <a 
                className="cta cta-card magnetic" 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Entrar no grupo
              </a>
            </div>
          </aside>
        </section>

        {/* Steps Section */}
        <section className="steps animate-on-scroll">
          <div className="step" style={{ '--i': 0 } as React.CSSProperties}>
            <div className="step-icon">1</div>
            <h4>Perfil rápido</h4>
            <p>Crie um perfil curto; sem dados sensíveis.</p>
          </div>
          <div className="step" style={{ '--i': 1 } as React.CSSProperties}>
            <div className="step-icon">2</div>
            <h4>Escolha e combine</h4>
            <p>Converse com segurança e marque encontros com consentimento.</p>
          </div>
          <div className="step" style={{ '--i': 2 } as React.CSSProperties}>
            <div className="step-icon">3</div>
            <h4>Regras & segurança</h4>
            <p>Grupo moderado por regras claras; respeito obrigatório.</p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials animate-on-scroll">
          <h2 className="section-title">O que dizem nossos membros</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <div className="testimonial-header">
                <div className="avatar">M</div>
                <div className="testimonial-info">
                  <span className="name">Marina, 28</span>
                  <span className="verified-badge">Verificado</span>
                </div>
              </div>
              <p className="testimonial-text">
                "Finalmente um grupo com pessoas reais e respeito. Já fiz ótimas conexões aqui."
              </p>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-header">
                <div className="avatar">R</div>
                <div className="testimonial-info">
                  <span className="name">Rafael, 32</span>
                  <span className="verified-badge">Verificado</span>
                </div>
              </div>
              <p className="testimonial-text">
                "Discrição total e pessoas interessantes. Recomendo para quem busca algo sem compromisso."
              </p>
            </div>
            
            <div className="testimonial">
              <div className="testimonial-header">
                <div className="avatar">L</div>
                <div className="testimonial-info">
                  <span className="name">Larissa, 25</span>
                  <span className="verified-badge">Verificado</span>
                </div>
              </div>
              <p className="testimonial-text">
                "Me sinto segura aqui. As regras são claras e a moderação funciona muito bem."
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq animate-on-scroll">
          <h2 className="section-title">Perguntas frequentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>É realmente seguro?</h4>
              <p>Sim. Todos os membros são verificados e temos regras claras de respeito e consentimento.</p>
            </div>
            <div className="faq-item">
              <h4>Preciso pagar algo?</h4>
              <p>Não. O grupo é totalmente gratuito. Não cobramos taxas ou mensalidades.</p>
            </div>
            <div className="faq-item">
              <h4>Como funciona a verificação?</h4>
              <p>Fazemos uma verificação simples para garantir que são pessoas reais e maiores de idade.</p>
            </div>
            <div className="faq-item">
              <h4>Posso sair quando quiser?</h4>
              <p>Sim. Você pode sair do grupo a qualquer momento, sem perguntas ou complicações.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="disclaimer">
              <strong>AVISO:</strong> Este site contém conteúdo adulto e é destinado apenas para maiores de 18 anos. 
              Não oferecemos serviços pagos de acompanhantes. Todos os encontros devem ser consensuais.
            </p>
            <div className="footer-links">
              <a href="#">Política de Privacidade</a>
              <a href="#">Termos de Uso</a>
              <a href="#">Regras do Grupo</a>
            </div>
            <p className="copyright">
              © 2025 Noite Rubra. Todos os direitos reservados. | Apenas para maiores de 18 anos.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile WhatsApp FAB */}
      <a 
        className="whatsapp-fab magnetic"
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Entrar no WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
        </svg>
      </a>
    </div>
    </>
  );
}

export default App;