import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export function ResultPage() {
  const [, setLocation] = useLocation();
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const storedScore = sessionStorage.getItem('quizScore');
    if (!storedScore) {
      setLocation('/');
      return;
    }
    
    setScore(parseInt(storedScore));
    
    // Simulate loading/calculating result
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 500);
    }, 2000);
  }, [setLocation]);

  const isDNA = score >= 6;

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #131313 0%, #6e5046 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          {/* Loading animation */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '4px solid rgba(255, 255, 255, 0.1)',
            borderTopColor: '#d4a490',
            margin: '0 auto 30px',
            animation: 'spin 1s linear infinite',
            boxShadow: '0 0 20px rgba(212, 164, 144, 0.3)'
          }} />
          
          <p style={{
            fontSize: '18px',
            color: '#FFFFFF',
            fontWeight: '500',
            opacity: 0.9
          }}>
            Analisando seu DNA...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #131313 0%, #6e5046 100%)',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'relative'
    }}>
      <div style={{
        padding: '40px 20px',
        maxWidth: '500px',
        margin: '0 auto',
        opacity: showContent ? 1 : 0,
        transform: showContent ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease'
      }}>
        {/* Result Badge */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: isDNA 
              ? 'linear-gradient(135deg, #d4a490 0%, #b8917a 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            borderRadius: '30px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '1px',
            marginBottom: '20px',
            boxShadow: isDNA 
              ? '0 8px 25px rgba(212, 164, 144, 0.4)'
              : '0 8px 20px rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {isDNA ? '✨ DNA DE DEUSA DETECTADO ✨' : 'DNA ADORMECIDO'}
          </div>
          
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            lineHeight: '1.2',
            color: '#FFFFFF',
            marginBottom: '20px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            {isDNA 
              ? 'Parabéns! Você tem o DNA da Deusa Irresistível.'
              : 'Seu DNA da Deusa ainda não foi ativado.'}
          </h1>
        </div>

        {/* Result Text */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          marginBottom: '30px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {isDNA ? (
            <>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#FFFFFF',
                marginBottom: '20px',
                opacity: 0.95
              }}>
                Você é uma das <strong style={{ color: '#d4a490' }}>raras mulheres</strong> que carregam dentro de si o código genético da transformação rápida.
              </p>
              
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#FFFFFF',
                marginBottom: '30px',
                opacity: 0.85
              }}>
                Em apenas <strong style={{ color: '#d4a490' }}>18 dias</strong> e <strong style={{ color: '#d4a490' }}>20 minutos por dia</strong>, você vai:
              </p>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {[
                  '✨ Afinar a cintura de forma visível',
                  '✨ Levantar e modelar seus glúteos',
                  '✨ Transformar sua postura e confiança',
                  '✨ Se tornar irresistível e admirada'
                ].map((benefit, index) => (
                  <div key={index} style={{
                    padding: '12px',
                    background: 'rgba(212, 164, 144, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: '#FFFFFF',
                    border: '1px solid rgba(212, 164, 144, 0.2)',
                    opacity: 0.9
                  }}>
                    {benefit}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#FFFFFF',
                marginBottom: '20px',
                opacity: 0.95
              }}>
                A verdade é que, hoje, você ainda não mostrou força suficiente para provar que pertence ao <strong style={{ color: '#d4a490' }}>1%</strong>.
              </p>
              
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#FFFFFF',
                opacity: 0.85
              }}>
                Mas existe um detalhe que muda tudo: o DNA da Deusa pode ser <strong style={{ color: '#d4a490' }}>despertado</strong> em qualquer mulher que aceite o desafio.
              </p>
            </>
          )}
        </div>

        {/* Offer Section */}
        <div style={{
          background: 'rgba(212, 164, 144, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '30px',
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: '30px',
          border: '1px solid rgba(212, 164, 144, 0.3)',
          boxShadow: '0 15px 35px rgba(212, 164, 144, 0.2)'
        }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '1px',
            marginBottom: '10px',
            opacity: 0.9,
            color: '#d4a490'
          }}>
            PROGRAMA DEUSA18DAY
          </p>
          
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '20px',
            color: '#FFFFFF'
          }}>
            DNA da Deusa Irresistível
          </h2>
          
          <div style={{
            fontSize: '36px',
            fontWeight: '800',
            marginBottom: '10px',
            color: '#d4a490',
            textShadow: '0 2px 10px rgba(212, 164, 144, 0.5)'
          }}>
            R$ 49
          </div>
          
          <p style={{
            fontSize: '14px',
            marginBottom: '20px',
            opacity: 0.85,
            color: '#FFFFFF'
          }}>
            Pagamento único • 30 dias de garantia
          </p>
          
          <button
            onClick={() => setLocation('/oferta')}
            style={{
              width: '100%',
              padding: '18px',
              background: 'linear-gradient(135deg, #d4a490 0%, #b8917a 100%)',
              border: 'none',
              borderRadius: '30px',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '700',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(212, 164, 144, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 30px rgba(212, 164, 144, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 164, 144, 0.5)';
            }}
            data-testid="cta-button"
          >
            {isDNA 
              ? 'QUERO ATIVAR MEU DNA DE DEUSA AGORA'
              : 'QUERO DESPERTAR MEU DNA DE DEUSA'}
          </button>
        </div>

        {/* Urgency */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          background: 'rgba(212, 164, 144, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '15px',
          marginBottom: '20px',
          border: '1px solid rgba(212, 164, 144, 0.2)'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#d4a490',
            fontWeight: '600'
          }}>
            ⚠️ Vagas limitadas para este mês
          </p>
        </div>

        {/* Trust Elements */}
        <div style={{
          textAlign: 'center',
          color: '#FFFFFF',
          fontSize: '13px',
          opacity: 0.7
        }}>
          <p>✅ Acesso imediato • 📱 Direto no celular • 💳 Pagamento seguro</p>
        </div>
      </div>

      {/* Add spin animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}