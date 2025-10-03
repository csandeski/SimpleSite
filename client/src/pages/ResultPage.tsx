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
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          {/* Loading animation */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '4px solid #F0F0F0',
            borderTopColor: '#FF006E',
            margin: '0 auto 30px',
            animation: 'spin 1s linear infinite'
          }} />
          
          <p style={{
            fontSize: '18px',
            color: '#4A4A4A',
            fontWeight: '500'
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
      background: isDNA 
        ? 'linear-gradient(180deg, #FFF5F8 0%, #FFFFFF 100%)'
        : 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
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
              ? 'linear-gradient(135deg, #FF006E 0%, #FF4458 100%)'
              : 'linear-gradient(135deg, #9A9A9A 0%, #6A6A6A 100%)',
            borderRadius: '30px',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '1px',
            marginBottom: '20px',
            boxShadow: isDNA 
              ? '0 8px 20px rgba(255, 0, 110, 0.3)'
              : '0 8px 20px rgba(0, 0, 0, 0.1)'
          }}>
            {isDNA ? '✨ DNA DE DEUSA DETECTADO ✨' : 'DNA ADORMECIDO'}
          </div>
          
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            lineHeight: '1.2',
            color: '#1A1A1A',
            marginBottom: '20px'
          }}>
            {isDNA 
              ? 'Parabéns! Você tem o DNA da Deusa Irresistível.'
              : 'Seu DNA da Deusa ainda não foi ativado.'}
          </h1>
        </div>

        {/* Result Text */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          marginBottom: '30px'
        }}>
          {isDNA ? (
            <>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#4A4A4A',
                marginBottom: '20px'
              }}>
                Você é uma das <strong>raras mulheres</strong> que carregam dentro de si o código genético da transformação rápida.
              </p>
              
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#6A6A6A',
                marginBottom: '30px'
              }}>
                Em apenas <strong>18 dias</strong> e <strong>20 minutos por dia</strong>, você vai:
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
                    background: '#FFF5F8',
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: '#4A4A4A'
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
                color: '#4A4A4A',
                marginBottom: '20px'
              }}>
                A verdade é que, hoje, você ainda não mostrou força suficiente para provar que pertence ao <strong>1%</strong>.
              </p>
              
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#6A6A6A'
              }}>
                Mas existe um detalhe que muda tudo: o DNA da Deusa pode ser <strong>despertado</strong> em qualquer mulher que aceite o desafio.
              </p>
            </>
          )}
        </div>

        {/* Offer Section */}
        <div style={{
          background: 'linear-gradient(135deg, #FF006E 0%, #FF4458 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '1px',
            marginBottom: '10px',
            opacity: 0.9
          }}>
            PROGRAMA DEUSA18DAY
          </p>
          
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '20px'
          }}>
            DNA da Deusa Irresistível
          </h2>
          
          <div style={{
            fontSize: '36px',
            fontWeight: '800',
            marginBottom: '10px'
          }}>
            R$ 49
          </div>
          
          <p style={{
            fontSize: '14px',
            marginBottom: '20px',
            opacity: 0.9
          }}>
            Pagamento único • 30 dias de garantia
          </p>
          
          <button
            onClick={() => setLocation('/oferta')}
            style={{
              width: '100%',
              padding: '18px',
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '30px',
              color: '#FF006E',
              fontSize: '16px',
              fontWeight: '700',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
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
          background: '#FFF5F8',
          borderRadius: '15px',
          marginBottom: '20px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#FF006E',
            fontWeight: '600'
          }}>
            ⚠️ Vagas limitadas para este mês
          </p>
        </div>

        {/* Trust Elements */}
        <div style={{
          textAlign: 'center',
          color: '#9A9A9A',
          fontSize: '13px'
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