import { useState, useEffect } from 'react';
import fundoImg from '@assets/fundo_1758886315966.png';

export default function App() {
  const [userCity, setUserCity] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    // Função para obter a cidade através do nosso backend (sem CORS)
    const getCityFromBackend = async () => {
      try {
        // Faz requisição para nosso próprio backend
        const response = await fetch('/api/location');
        const data = await response.json();
        
        if (data.success && data.city) {
          setUserCity(data.city);
        }
      } catch (error) {
        console.error('Erro ao obter localização:', error);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    // Chama a função de geolocalização
    getCityFromBackend();
  }, []);

  return (
    <div 
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${fundoImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Overlay escuro suave */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}
      />
      
      {/* Barra fixa no topo */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #FF0000 100%)',
        padding: '10px 15px',
        zIndex: 3,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden'
      }}>
        {/* Textura quadriculada */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.1) 10px,
              rgba(255, 255, 255, 0.1) 20px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.1) 10px,
              rgba(255, 255, 255, 0.1) 20px
            )
          `,
          pointerEvents: 'none'
        }} />
        
        <p style={{
          fontSize: '13px',
          color: '#ffffff',
          margin: 0,
          textAlign: 'center',
          letterSpacing: '0.5px',
          position: 'relative',
          fontWeight: '500',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
        }}>
          ACESSE AGORA O <span style={{ color: '#ffffff', fontWeight: 'bold' }}>GRUPO SECRETO</span> DAS CASADAS SAFADAS!
        </p>
      </div>
      
      {/* Conteúdo principal */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '80px 20px 40px',
      }}>
        
        {/* Título principal em exatamente 2 linhas */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#ffffff',
          lineHeight: '1.3',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)',
          marginBottom: '20px',
          marginTop: '20px'
        }}>
          <div style={{ marginBottom: '5px' }}>
            ELAS NÃO QUEREM <span style={{ color: '#FF0000' }}>MARIDO</span>...
          </div>
          <div>
            QUEREM <span style={{ color: '#FF0000' }}>APENAS DIVERSÃO</span>.
          </div>
        </h1>
        
        {/* Descrição com cidade dinâmica */}
        <p style={{
          fontSize: '14px',
          color: '#ffffff',
          lineHeight: '1.5',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          marginBottom: '30px',
          padding: '0 10px',
          minHeight: '42px'
        }}>
          {isLoadingLocation ? (
            <span style={{ opacity: 0.7 }}>Localizando...</span>
          ) : userCity ? (
            <>
              Clique no vídeo para liberar sua vaga no grupo das casadas safadas{' '}
              <span style={{ 
                color: '#FFD700', 
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                de {userCity}
              </span>
              !
            </>
          ) : (
            'Clique no vídeo para liberar sua vaga no grupo das casadas safadas da sua região!'
          )}
        </p>
        
      </div>
    </div>
  );
}