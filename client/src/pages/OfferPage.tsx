import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export function OfferPage() {
  const [, setLocation] = useLocation();
  const [showGuarantee, setShowGuarantee] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePurchase = () => {
    // Here you would integrate with payment gateway
    alert('Redirecionando para pagamento seguro...');
    // window.location.href = 'payment_url_here';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #131313 0%, #6e5046 100%)',
      fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'relative'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #d4a490 0%, #6e5046 100%)',
        padding: isMobile ? '25px 15px' : '30px 20px',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative glow effect */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-25%',
          width: '150%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(212, 164, 144, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{
          maxWidth: '420px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '2px',
            marginBottom: '20px',
            color: '#d4a490',
            textShadow: '0 2px 10px rgba(212, 164, 144, 0.5)'
          }}>
            OFERTA EXCLUSIVA
          </p>
          
          <h1 style={{
            fontSize: '22px',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '20px',
            color: '#FFFFFF',
            opacity: 0.95,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}>
            Ative seu DNA de Deusa Irresistível
          </h1>
          
          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#FFFFFF',
            opacity: 0.8
          }}>
            Transforme sua cintura, glúteos e confiança em apenas 18 dias
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: isMobile ? '20px 15px' : '25px 20px',
        maxWidth: '420px',
        margin: '0 auto'
      }}>
        {/* What's Included */}
        <div style={{
          marginBottom: isMobile ? '25px' : '30px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#FFFFFF',
            opacity: 0.95,
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            O que você recebe:
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '10px' : '12px'
          }}>
            {[
              {
                icon: '📱',
                title: 'Aplicativo Exclusivo',
                description: '18 aulas diárias de 15-20 minutos'
              },
              {
                icon: '✨',
                title: 'Método Pilates Estético',
                description: 'Técnicas secretas para modelar o corpo'
              },
              {
                icon: '🎯',
                title: 'Resultados em 18 dias',
                description: 'Cintura afinada e glúteos empinados'
              },
              {
                icon: '💪',
                title: 'Suporte Completo',
                description: 'Acompanhamento durante toda jornada'
              },
              {
                icon: '♾️',
                title: 'Acesso Vitalício',
                description: 'Assista quantas vezes quiser'
              },
              {
                icon: '🛡️',
                title: 'Garantia de 30 dias',
                description: 'Satisfação garantida ou dinheiro de volta'
              }
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: isMobile ? '10px' : '12px',
                padding: isMobile ? '12px' : '15px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: isMobile ? '18px' : '20px', flexShrink: 0 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    opacity: 0.95,
                    marginBottom: '5px'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#FFFFFF',
                    opacity: 0.6,
                    margin: 0
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div style={{
          marginBottom: isMobile ? '25px' : '30px',
          padding: isMobile ? '15px' : '20px',
          background: 'rgba(212, 164, 144, 0.05)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          borderRadius: '10px',
          border: '1px solid rgba(212, 164, 144, 0.2)'
        }}>
          <h3 style={{
            fontSize: isMobile ? '14px' : '15px',
            fontWeight: '700',
            color: '#d4a490',
            marginBottom: isMobile ? '12px' : '15px',
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(212, 164, 144, 0.3)'
          }}>
            Mulheres que já ativaram o DNA:
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '8px' : '10px'
          }}>
            {[
              '"Em 10 dias minha cintura já estava visivelmente mais fina!" - Ana P.',
              '"Nunca recebi tantos elogios! Estou me sentindo uma deusa!" - Maria S.',
              '"20 minutos por dia mudaram completamente meu corpo!" - Julia R.'
            ].map((testimonial, index) => (
              <p key={index} style={{
                fontSize: isMobile ? '12px' : '13px',
                color: '#FFFFFF',
                opacity: 0.8,
                fontStyle: 'italic',
                padding: isMobile ? '10px' : '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                margin: 0,
                border: '1px solid rgba(255, 255, 255, 0.05)',
                lineHeight: '1.5'
              }}>
                {testimonial}
              </p>
            ))}
          </div>
        </div>

        {/* Price Section */}
        <div style={{
          background: 'rgba(26, 26, 26, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '10px',
          padding: isMobile ? '20px' : '25px',
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: isMobile ? '20px' : '25px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(212, 164, 144, 0.3)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
        }}>
          {/* Golden glow effect */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '150px' : '180px',
            height: isMobile ? '150px' : '180px',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          
          {/* Ribbon */}
          <div style={{
            position: 'absolute',
            top: isMobile ? '15px' : '18px',
            right: '-30px',
            background: '#FFD700',
            color: '#1A1A1A',
            padding: isMobile ? '3px 35px' : '4px 40px',
            transform: 'rotate(45deg)',
            fontSize: isMobile ? '10px' : '11px',
            fontWeight: '700',
            boxShadow: '0 3px 10px rgba(255, 215, 0, 0.4)'
          }}>
            HOJE
          </div>
          
          <p style={{
            fontSize: isMobile ? '14px' : '15px',
            marginBottom: '8px',
            color: '#FFFFFF',
            opacity: 0.8
          }}>
            Investimento único
          </p>
          
          <div style={{
            fontSize: isMobile ? '26px' : '28px',
            fontWeight: '800',
            marginBottom: '8px',
            color: '#FFD700',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.4)'
          }}>
            R$ 49
          </div>
          
          <p style={{
            fontSize: isMobile ? '12px' : '13px',
            marginBottom: isMobile ? '15px' : '20px',
            color: '#FFFFFF',
            opacity: 0.6
          }}>
            ou 5x de R$ 9,80 no cartão
          </p>
          
          <button
            onClick={handlePurchase}
            style={{
              width: '100%',
              padding: isMobile ? '12px' : '14px',
              background: 'linear-gradient(135deg, #d4a490 0%, #a08070 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#FFFFFF',
              fontSize: isMobile ? '14px' : '15px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(212, 164, 144, 0.3)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 164, 144, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 164, 144, 0.3)';
            }}
            data-testid="purchase-button"
          >
            ATIVAR MEU DNA DE DEUSA AGORA
          </button>
          
          <p style={{
            fontSize: isMobile ? '11px' : '12px',
            marginTop: isMobile ? '10px' : '12px',
            color: '#FFFFFF',
            opacity: 0.6
          }}>
            🔒 Pagamento 100% seguro
          </p>
        </div>

        {/* Guarantee */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? '20px' : '25px'
        }}>
          <button
            onClick={() => setShowGuarantee(!showGuarantee)}
            style={{
              background: 'none',
              border: 'none',
              color: '#d4a490',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'underline',
              textShadow: '0 2px 8px rgba(212, 164, 144, 0.3)'
            }}
          >
            🛡️ Ver garantia de 30 dias
          </button>
          
          {showGuarantee && (
            <div style={{
              marginTop: isMobile ? '12px' : '15px',
              padding: isMobile ? '12px' : '15px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '8px',
              fontSize: isMobile ? '12px' : '13px',
              color: '#FFFFFF',
              opacity: 0.8,
              lineHeight: '1.5',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              Se em 30 dias você não estiver completamente satisfeita com sua transformação,
              devolvemos 100% do seu investimento. Sem perguntas, sem burocracia.
            </div>
          )}
        </div>

        {/* Urgency */}
        <div style={{
          background: 'rgba(212, 164, 144, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '10px',
          padding: isMobile ? '12px' : '15px',
          textAlign: 'center',
          marginBottom: isMobile ? '20px' : '25px',
          border: '1px solid rgba(212, 164, 144, 0.2)'
        }}>
          <p style={{
            fontSize: isMobile ? '14px' : '15px',
            color: '#d4a490',
            fontWeight: '600',
            marginBottom: '6px',
            textShadow: '0 2px 8px rgba(212, 164, 144, 0.3)'
          }}>
            ⏰ Oferta por tempo limitado!
          </p>
          <p style={{
            fontSize: isMobile ? '12px' : '13px',
            color: '#FFFFFF',
            opacity: 0.6
          }}>
            Esta condição especial pode acabar a qualquer momento
          </p>
        </div>

        {/* FAQ */}
        <div style={{
          marginBottom: isMobile ? '20px' : '25px'
        }}>
          <h3 style={{
            fontSize: isMobile ? '14px' : '15px',
            fontWeight: '700',
            color: '#FFFFFF',
            opacity: 0.95,
            marginBottom: isMobile ? '12px' : '15px',
            textAlign: 'center'
          }}>
            Perguntas frequentes:
          </h3>
          
          {[
            {
              q: 'Preciso de experiência com Pilates?',
              a: 'Não! O método foi criado para iniciantes.'
            },
            {
              q: 'Quanto tempo preciso dedicar?',
              a: 'Apenas 15-20 minutos por dia durante 18 dias.'
            },
            {
              q: 'Quando terei acesso?',
              a: 'Imediatamente após a confirmação do pagamento.'
            }
          ].map((faq, index) => (
            <div key={index} style={{
              marginBottom: isMobile ? '8px' : '10px',
              padding: isMobile ? '12px' : '15px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
            }}>
              <p style={{
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '600',
                color: '#FFFFFF',
                opacity: 0.95,
                marginBottom: '6px'
              }}>
                {faq.q}
              </p>
              <p style={{
                fontSize: isMobile ? '12px' : '13px',
                color: '#FFFFFF',
                opacity: 0.6,
                margin: 0,
                lineHeight: '1.4'
              }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{
          position: 'sticky',
          bottom: isMobile ? '10px' : '15px',
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: isMobile ? '8px' : '10px',
          padding: isMobile ? '12px' : '15px',
          border: '1px solid rgba(212, 164, 144, 0.3)',
          boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.3)',
          margin: isMobile ? '0 -5px' : '0',
          zIndex: 10
        }}>
          <button
            onClick={handlePurchase}
            style={{
              width: '100%',
              padding: isMobile ? '12px' : '14px',
              background: 'linear-gradient(135deg, #d4a490 0%, #a08070 100%)',
              border: 'none',
              borderRadius: isMobile ? '8px' : '10px',
              color: '#FFFFFF',
              fontSize: isMobile ? '14px' : '15px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              animation: 'pulse 2s infinite',
              boxShadow: '0 0 20px rgba(212, 164, 144, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 164, 144, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 164, 144, 0.4)';
              }
            }}
            data-testid="final-cta-button"
          >
            {isMobile ? 'QUERO SER UMA DEUSA!' : 'SIM! QUERO SER UMA DEUSA IRRESISTÍVEL'}
          </button>
        </div>
      </div>

      {/* Add pulse animation with glow effect */}
      <style>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            transform: scale(1.02);
            filter: brightness(1.1);
          }
        }
      `}</style>
    </div>
  );
}