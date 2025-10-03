import { Route, Switch, useLocation } from "wouter";
import { useState } from "react";
import { QuizPage } from "./pages/QuizPage";

function LandingPage() {
  const [, setLocation] = useLocation();
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: '#1A1A1A'
    }}>
      {/* Hero Section */}
      <div style={{
        padding: '60px 20px',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Small subtitle */}
        <p style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#FF006E',
          letterSpacing: '2px',
          marginBottom: '20px',
          textTransform: 'uppercase'
        }}>
          DEUSA18DAY
        </p>
        
        {/* Main headline */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          lineHeight: '1.2',
          color: '#1A1A1A',
          marginBottom: '20px'
        }}>
          99% das mulheres não suportam este desafio.
        </h1>
        
        <h2 style={{
          fontSize: '24px',
          fontWeight: '300',
          lineHeight: '1.4',
          color: '#4A4A4A',
          marginBottom: '30px'
        }}>
          Mas se você for a <span style={{ 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #FF006E 0%, #FF4458 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>1%</span>... vai despertar o seu DNA de Deusa Irresistível em apenas <strong>18 dias</strong>.
        </h2>
        
        {/* Separator */}
        <div style={{
          width: '60px',
          height: '4px',
          background: 'linear-gradient(90deg, #FF006E 0%, #FF4458 100%)',
          margin: '40px auto',
          borderRadius: '2px'
        }} />
        
        {/* Subheadline */}
        <p style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: '#6A6A6A',
          marginBottom: '40px'
        }}>
          Não é dieta. Não é academia.<br/>
          É um <strong>método secreto de Pilates estético</strong> que modela cintura, levanta glúteos e transforma a sua presença em apenas 18 dias.
        </p>
        
        {/* Benefits */}
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
            <div key={index} style={{
              padding: '15px',
              background: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              fontSize: '16px',
              color: '#4A4A4A',
              border: '1px solid #F0F0F0'
            }}>
              {benefit}
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <button
          onClick={() => setLocation('/quiz')}
          style={{
            width: '100%',
            padding: '20px',
            background: 'linear-gradient(135deg, #FF006E 0%, #FF4458 100%)',
            border: 'none',
            borderRadius: '30px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '700',
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(255, 0, 110, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 0, 110, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 0, 110, 0.3)';
          }}
        >
          FAÇA O QUIZ GRATUITO E DESCUBRA SE VOCÊ É A ESCOLHIDA
        </button>
        
        {/* Trust element */}
        <p style={{
          marginTop: '20px',
          fontSize: '13px',
          color: '#9A9A9A'
        }}>
          Quiz rápido • Menos de 60 segundos • 100% gratuito
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/quiz" component={QuizPage} />
      <Route path="/resultado">Result Page (To be implemented)</Route>
      <Route path="/oferta">Offer Page (To be implemented)</Route>
    </Switch>
  );
}

export default App;