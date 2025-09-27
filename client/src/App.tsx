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
        
        {/* Card de localização */}
        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.1), rgba(139, 0, 0, 0.1))',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          borderRadius: '8px',
          padding: '8px 16px',
          marginBottom: '20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        }}>
          <p style={{
            fontSize: '12px',
            color: '#ffffff',
            margin: 0,
            fontWeight: '500',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            Grupo Exclusivo para:{' '}
            <span style={{ 
              color: '#FFD700',
              fontWeight: 'bold'
            }}>
              {isLoadingLocation ? '...' : userCity || 'sua cidade'}!
            </span>
          </p>
        </div>

        {/* Título principal em exatamente 2 linhas */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#ffffff',
          lineHeight: '1.3',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)',
          marginBottom: '20px',
          marginTop: '0'
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
        
        {/* Vídeo 9:16 */}
        <div style={{
          width: '100%',
          maxWidth: '350px',
          margin: '0 auto',
          aspectRatio: '9/16',
          backgroundColor: '#000000',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
          position: 'relative'
        }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        {/* Seção de Estatísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '15px',
          marginTop: '30px',
          width: '100%',
          maxWidth: '400px',
          margin: '30px auto 0'
        }}>
          {/* Card 1 - Casadas Online */}
          <div style={{
            background: 'linear-gradient(145deg, #2B0000 0%, #5C0000 25%, #8B0000 50%, #B22222 75%, #DC143C 100%)',
            borderRadius: '15px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `
              inset 0 1px 1px rgba(255, 255, 255, 0.1),
              0 8px 32px rgba(139, 0, 0, 0.5),
              0 0 40px rgba(255, 0, 0, 0.2)
            `,
            textAlign: 'center',
            transform: 'perspective(1000px) rotateX(2deg)',
            transition: 'all 0.3s ease'
          }}>
            {/* Brilho superior */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              borderRadius: '15px 15px 0 0',
              pointerEvents: 'none'
            }} />
            <div style={{
              fontSize: '28px',
              marginBottom: '10px',
              animation: 'pulse 1.5s ease-in-out infinite',
              filter: 'drop-shadow(0 0 10px rgba(255, 100, 0, 0.8))',
              position: 'relative'
            }}>
              🔥
            </div>
            <div style={{
              fontSize: '26px',
              fontWeight: '900',
              color: '#FFFFFF',
              marginBottom: '6px',
              textShadow: '0 2px 10px rgba(255, 0, 0, 0.8)',
              position: 'relative'
            }}>
              1.327
            </div>
            <div style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.8)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '600',
              position: 'relative'
            }}>
              Casadas Online Agora
            </div>
          </div>

          {/* Card 2 - Encontros Hoje */}
          <div style={{
            background: 'linear-gradient(145deg, #2B0000 0%, #5C0000 25%, #8B0000 50%, #B22222 75%, #DC143C 100%)',
            borderRadius: '15px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `
              inset 0 1px 1px rgba(255, 255, 255, 0.1),
              0 8px 32px rgba(139, 0, 0, 0.5),
              0 0 40px rgba(255, 0, 0, 0.2)
            `,
            textAlign: 'center',
            transform: 'perspective(1000px) rotateX(2deg)',
            transition: 'all 0.3s ease'
          }}>
            {/* Brilho superior */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              borderRadius: '15px 15px 0 0',
              pointerEvents: 'none'
            }} />
            <div style={{
              fontSize: '28px',
              marginBottom: '10px',
              animation: 'bounce 2s ease-in-out infinite',
              filter: 'drop-shadow(0 0 10px rgba(255, 165, 0, 0.8))',
              position: 'relative'
            }}>
              🍑
            </div>
            <div style={{
              fontSize: '26px',
              fontWeight: '900',
              color: '#FFD700',
              marginBottom: '6px',
              textShadow: '0 2px 10px rgba(255, 215, 0, 0.8)',
              position: 'relative'
            }}>
              189
            </div>
            <div style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.8)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '600',
              position: 'relative'
            }}>
              Encontros Hoje
            </div>
          </div>

          {/* Card 3 - Mensagens */}
          <div style={{
            background: 'linear-gradient(145deg, #2B0000 0%, #5C0000 25%, #8B0000 50%, #B22222 75%, #DC143C 100%)',
            borderRadius: '15px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `
              inset 0 1px 1px rgba(255, 255, 255, 0.1),
              0 8px 32px rgba(139, 0, 0, 0.5),
              0 0 40px rgba(255, 0, 0, 0.2)
            `,
            textAlign: 'center',
            transform: 'perspective(1000px) rotateX(2deg)',
            transition: 'all 0.3s ease'
          }}>
            {/* Brilho superior */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              borderRadius: '15px 15px 0 0',
              pointerEvents: 'none'
            }} />
            <div style={{
              fontSize: '28px',
              marginBottom: '10px',
              animation: 'shake 2.5s ease-in-out infinite',
              filter: 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.8))',
              position: 'relative'
            }}>
              💌
            </div>
            <div style={{
              fontSize: '26px',
              fontWeight: '900',
              color: '#FF69B4',
              marginBottom: '6px',
              textShadow: '0 2px 10px rgba(255, 105, 180, 0.8)',
              position: 'relative'
            }}>
              14.562
            </div>
            <div style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.8)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '600',
              position: 'relative'
            }}>
              Mensagens Safadas
            </div>
          </div>

          {/* Card 4 - Tempo Médio */}
          <div style={{
            background: 'linear-gradient(145deg, #2B0000 0%, #5C0000 25%, #8B0000 50%, #B22222 75%, #DC143C 100%)',
            borderRadius: '15px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `
              inset 0 1px 1px rgba(255, 255, 255, 0.1),
              0 8px 32px rgba(139, 0, 0, 0.5),
              0 0 40px rgba(255, 0, 0, 0.2)
            `,
            textAlign: 'center',
            transform: 'perspective(1000px) rotateX(2deg)',
            transition: 'all 0.3s ease'
          }}>
            {/* Brilho superior */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              borderRadius: '15px 15px 0 0',
              pointerEvents: 'none'
            }} />
            <div style={{
              fontSize: '28px',
              marginBottom: '10px',
              animation: 'rotate 3s linear infinite',
              filter: 'drop-shadow(0 0 10px rgba(0, 255, 0, 0.8))',
              position: 'relative'
            }}>
              ⏳
            </div>
            <div style={{
              fontSize: '26px',
              fontWeight: '900',
              color: '#00FF00',
              marginBottom: '6px',
              textShadow: '0 2px 10px rgba(0, 255, 0, 0.8)',
              position: 'relative'
            }}>
              2 Dias
            </div>
            <div style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.8)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '600',
              position: 'relative'
            }}>
              Média 1º Encontro
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}