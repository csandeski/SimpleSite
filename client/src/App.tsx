import { Route, Switch, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { QuizPage } from "./pages/QuizPage";
import { ResultPage } from "./pages/ResultPage";
import { OfferPage } from "./pages/OfferPage";

function LandingPage() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="page-enter" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #131313 0%, #6e5046 100%)',
      fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle glow effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '150%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(212, 164, 144, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      
      {/* Hero Section */}
      <div style={{
        padding: '60px 20px',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo */}
        <img 
          src="/logo-deusa.png" 
          alt="DEUSA18DAY" 
          style={{
            height: '60px',
            marginBottom: '30px',
            filter: 'drop-shadow(0 4px 20px rgba(212, 164, 144, 0.3))',
            animation: 'fadeInScale 0.8s ease-out'
          }}
        />
        
        {/* Main headline */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          lineHeight: '1.2',
          color: '#FFFFFF',
          marginBottom: '20px',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}>
          99% das mulheres não suportam este desafio.
        </h1>
        
        <h2 style={{
          fontSize: '24px',
          fontWeight: '300',
          lineHeight: '1.4',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '30px'
        }}>
          Mas se você for a <span style={{ 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #d4a490 0%, #e8c4b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(212, 164, 144, 0.5))'
          }}>1%</span>... vai despertar o seu DNA de Deusa Irresistível em apenas <strong style={{ color: '#d4a490' }}>18 dias</strong>.
        </h2>
        
        {/* Separator */}
        <div style={{
          width: '60px',
          height: '4px',
          background: 'linear-gradient(90deg, #d4a490 0%, #e8c4b8 100%)',
          margin: '40px auto',
          borderRadius: '2px',
          boxShadow: '0 0 20px rgba(212, 164, 144, 0.4)'
        }} />
        
        {/* Subheadline */}
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '40px'
        }}>
          Não é dieta. Não é academia.<br/>
          É um <strong style={{ color: '#d4a490' }}>método secreto de Pilates estético</strong> que modela cintura, levanta glúteos e transforma a sua presença em apenas 18 dias.
        </p>
        
        {/* Benefits with glassmorphism */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginBottom: '40px',
          textAlign: 'left'
        }}>
          {[
            '✨ Afinar cintura de forma visível',
            '✨ Levantar e modelar glúteos',
            '✨ Transformar postura e confiança',
            '✨ 20 minutos por dia apenas'
          ].map((benefit, index) => (
            <div key={index} className="card-enter" style={{
              padding: '18px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              animationDelay: `${index * 0.1}s`,
              transition: 'all 0.3s ease',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateX(5px)';
              e.currentTarget.style.boxShadow = '0 8px 40px rgba(212, 164, 144, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}>
              {benefit}
            </div>
          ))}
        </div>
        
        {/* Premium CTA Button */}
        <button
          onClick={() => setLocation('/quiz')}
          style={{
            width: '100%',
            padding: '22px',
            background: 'linear-gradient(135deg, #d4a490 0%, #c09480 50%, #d4a490 100%)',
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s ease infinite',
            border: 'none',
            borderRadius: '30px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '700',
            letterSpacing: '1.2px',
            cursor: 'pointer',
            boxShadow: '0 10px 40px rgba(212, 164, 144, 0.4)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(212, 164, 144, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(212, 164, 144, 0.4)';
          }}
        >
          FAÇA O QUIZ GRATUITO E DESCUBRA SE VOCÊ É A ESCOLHIDA
        </button>
        
        {/* Trust element */}
        <p style={{
          marginTop: '20px',
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.6)',
          letterSpacing: '0.5px'
        }}>
          Quiz rápido • Menos de 60 segundos • 100% gratuito
        </p>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .card-enter {
          animation: slideInRight 0.5s ease forwards;
          opacity: 0;
        }
        
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// Animated wrapper component for smooth page transitions
function AnimatedPage({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={isVisible ? "page-enter" : ""} style={{ opacity: isVisible ? 1 : 0 }}>
      {children}
    </div>
  );
}

// Wrapper components for each route with animations
function AnimatedLandingPage() {
  return <AnimatedPage><LandingPage /></AnimatedPage>;
}

function AnimatedQuizPage() {
  return <AnimatedPage><QuizPage /></AnimatedPage>;
}

function AnimatedResultPage() {
  return <AnimatedPage><ResultPage /></AnimatedPage>;
}

function AnimatedOfferPage() {
  return <AnimatedPage><OfferPage /></AnimatedPage>;
}

function App() {
  return (
    <Switch>
      <Route path="/" component={AnimatedLandingPage} />
      <Route path="/quiz" component={AnimatedQuizPage} />
      <Route path="/resultado" component={AnimatedResultPage} />
      <Route path="/oferta" component={AnimatedOfferPage} />
    </Switch>
  );
}

export default App;