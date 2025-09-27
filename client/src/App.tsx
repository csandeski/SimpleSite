import { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import fundoImg from '@assets/fundo_1758886315966.png';
import TinderPage from './pages/TinderPage';

function HomePage() {
  const [userCity, setUserCity] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [, setLocation] = useLocation();

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
        backgroundAttachment: 'fixed',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      
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
        
        {/* Botão 3D CTA Principal */}
        <div style={{
          marginTop: '30px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <button
            onClick={() => setLocation('/tinder')}
            style={{
              display: 'inline-block',
              padding: '20px 40px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              background: 'linear-gradient(180deg, #FF4444 0%, #CC0000 50%, #990000 100%)',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: `
                0 6px 0 #660000,
                0 8px 10px rgba(0, 0, 0, 0.4),
                0 12px 20px rgba(255, 0, 0, 0.2),
                inset 0 -3px 0 rgba(0, 0, 0, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.3)
              `,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              transform: 'translateY(0) scale(1)',
              transition: 'all 0.1s ease',
              animation: 'scaleUpDown 2s ease-in-out infinite',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              overflow: 'visible'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(3px) scale(0.98)';
              e.currentTarget.style.boxShadow = `
                0 3px 0 #660000,
                0 5px 8px rgba(0, 0, 0, 0.3),
                0 8px 15px rgba(255, 0, 0, 0.15),
                inset 0 -3px 0 rgba(0, 0, 0, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.3)
              `;
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = `
                0 6px 0 #660000,
                0 8px 10px rgba(0, 0, 0, 0.4),
                0 12px 20px rgba(255, 0, 0, 0.2),
                inset 0 -3px 0 rgba(0, 0, 0, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.3)
              `;
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(180deg, #FF5555 0%, #DD1111 50%, #AA0000 100%)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
              e.currentTarget.style.boxShadow = `
                0 8px 0 #660000,
                0 10px 15px rgba(0, 0, 0, 0.5),
                0 15px 30px rgba(255, 0, 0, 0.3),
                inset 0 -3px 0 rgba(0, 0, 0, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.3)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(180deg, #FF4444 0%, #CC0000 50%, #990000 100%)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = `
                0 6px 0 #660000,
                0 8px 10px rgba(0, 0, 0, 0.4),
                0 12px 20px rgba(255, 0, 0, 0.2),
                inset 0 -3px 0 rgba(0, 0, 0, 0.2),
                inset 0 2px 0 rgba(255, 255, 255, 0.3)
              `;
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span>🔥</span>
              <span>ACESSAR GRUPO AGORA!</span>
            </div>
          </button>
          
          <p style={{
            marginTop: '12px',
            fontSize: '13px',
            color: '#FFD700',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)',
            letterSpacing: '0.5px'
          }}>
            Garanta seu acesso as mais safadas da cidade
          </p>
        </div>
        
        {/* Seção de Estatísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginTop: '25px',
          width: '100%',
          maxWidth: '380px',
          margin: '25px auto 0'
        }}>
          {/* Card 1 - Casadas Online */}
          <div style={{
            background: 'linear-gradient(135deg, #4B0000 0%, #8B0000 50%, #B22222 100%)',
            borderRadius: '8px',
            padding: '12px 10px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            textAlign: 'center'
          }}>
            {/* Brilho sutil */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              fontSize: '20px',
              marginBottom: '6px',
              animation: 'pulse 1.5s ease-in-out infinite',
              position: 'relative',
              display: 'inline-block'
            }}>
              🔥
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginBottom: '3px',
              position: 'relative'
            }}>
              1.327
            </div>
            <div style={{
              fontSize: '9px',
              color: 'rgba(255, 255, 255, 0.85)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '500',
              position: 'relative'
            }}>
              Casadas Online Agora
            </div>
          </div>

          {/* Card 2 - Encontros Hoje */}
          <div style={{
            background: 'linear-gradient(135deg, #4B0000 0%, #8B0000 50%, #B22222 100%)',
            borderRadius: '8px',
            padding: '12px 10px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            textAlign: 'center'
          }}>
            {/* Brilho sutil */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              fontSize: '20px',
              marginBottom: '6px',
              animation: 'bounce 2s ease-in-out infinite',
              position: 'relative',
              display: 'inline-block'
            }}>
              🍑
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#FFD700',
              marginBottom: '3px',
              position: 'relative'
            }}>
              189
            </div>
            <div style={{
              fontSize: '9px',
              color: 'rgba(255, 255, 255, 0.85)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '500',
              position: 'relative'
            }}>
              Encontros Hoje
            </div>
          </div>

          {/* Card 3 - Mensagens */}
          <div style={{
            background: 'linear-gradient(135deg, #4B0000 0%, #8B0000 50%, #B22222 100%)',
            borderRadius: '8px',
            padding: '12px 10px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            textAlign: 'center'
          }}>
            {/* Brilho sutil */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              fontSize: '20px',
              marginBottom: '6px',
              animation: 'shake 2.5s ease-in-out infinite',
              position: 'relative',
              display: 'inline-block'
            }}>
              💌
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#FF69B4',
              marginBottom: '3px',
              position: 'relative'
            }}>
              14.562
            </div>
            <div style={{
              fontSize: '9px',
              color: 'rgba(255, 255, 255, 0.85)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '500',
              position: 'relative'
            }}>
              Mensagens Safadas
            </div>
          </div>

          {/* Card 4 - Tempo Médio */}
          <div style={{
            background: 'linear-gradient(135deg, #4B0000 0%, #8B0000 50%, #B22222 100%)',
            borderRadius: '8px',
            padding: '12px 10px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            textAlign: 'center'
          }}>
            {/* Brilho sutil */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              fontSize: '20px',
              marginBottom: '6px',
              animation: 'rotate 3s linear infinite',
              position: 'relative',
              display: 'inline-block'
            }}>
              ⏳
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#00FF00',
              marginBottom: '3px',
              position: 'relative'
            }}>
              2 Dias
            </div>
            <div style={{
              fontSize: '9px',
              color: 'rgba(255, 255, 255, 0.85)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontWeight: '500',
              position: 'relative'
            }}>
              Média 1º Encontro
            </div>
          </div>
        </div>
        
        {/* Seção de Conversa WhatsApp */}
        <div style={{
          backgroundColor: 'transparent',
          padding: '30px 15px',
          marginTop: '40px'
        }}>
          <h2 style={{
            fontSize: '20px',
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '5px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
          }}>
            💬 Conversas QUENTES do Grupo
          </h2>
          <p style={{
            fontSize: '12px',
            color: '#FFD700',
            textAlign: 'center',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            ⚠️ Conteúdo Adulto +18 ⚠️
          </p>
          
          {/* Container do Chat estilo WhatsApp */}
          <div style={{
            maxWidth: '380px',
            margin: '0 auto',
            backgroundColor: '#0B141A',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Header do Chat */}
            <div style={{
              background: 'linear-gradient(90deg, #1F2C34 0%, #2A3942 100%)',
              padding: '12px 15px',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF0000 0%, #8B0000 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                boxShadow: '0 2px 8px rgba(255, 0, 0, 0.3)'
              }}>
                <span style={{ fontSize: '20px' }}>🔥</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  marginBottom: '2px'
                }}>
                  Casadas Safadas {userCity ? `- ${userCity}` : ''}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#8EBDA1'
                }}>
                  247 participantes • 89 online agora
                </div>
              </div>
            </div>
            
            {/* Área de Mensagens */}
            <div style={{
              backgroundColor: '#0B141A',
              padding: '15px',
              minHeight: '280px',
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='a' patternUnits='userSpaceOnUse' width='60' height='60'%3E%3Cpath d='M0 0h60v60H0z' fill='%230B141A'/%3E%3Cpath d='M30 30m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0' fill='%23111B21' fill-opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3C/svg%3E")`
            }}>
              
              {/* Mensagem 1 - Mulher */}
              <div style={{
                marginBottom: '16px',
                animation: 'fadeInLeft 0.5s ease-out'
              }}>
                <div style={{
                  fontSize: '10px',
                  color: '#8696A0',
                  marginBottom: '4px',
                  paddingLeft: '8px'
                }}>
                  Patrícia, 32
                </div>
                <div style={{
                  backgroundColor: '#1C5A4E',
                  color: '#FFFFFF',
                  padding: '8px 12px',
                  borderRadius: '0 10px 10px 10px',
                  maxWidth: '80%',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
                  position: 'relative'
                }}>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '1.4',
                    marginBottom: '4px'
                  }}>
                    Marido dormindo do meu lado e eu aqui no grupo 🤫 Alguém online pra conversa safada?
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#8EBDA1',
                    textAlign: 'right',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '3px'
                  }}>
                    23:47
                    <span style={{ fontSize: '12px' }}>✓✓</span>
                  </div>
                </div>
              </div>
              
              {/* Mensagem 2 - Homem */}
              <div style={{
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'flex-end',
                animation: 'fadeInRight 0.7s ease-out'
              }}>
                <div>
                  <div style={{
                    fontSize: '10px',
                    color: '#8696A0',
                    marginBottom: '4px',
                    paddingRight: '8px',
                    textAlign: 'right'
                  }}>
                    Carlos, 28
                  </div>
                  <div style={{
                    backgroundColor: '#1F2C34',
                    color: '#FFFFFF',
                    padding: '8px 12px',
                    borderRadius: '10px 0 10px 10px',
                    maxWidth: '80%',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      lineHeight: '1.4',
                      marginBottom: '4px'
                    }}>
                      Eu tô! Chama no privado 🔥 Adoro casadas
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#8696A0',
                      textAlign: 'right'
                    }}>
                      23:48
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mensagem 3 - Mulher com foto */}
              <div style={{
                marginBottom: '16px',
                animation: 'fadeInLeft 0.9s ease-out'
              }}>
                <div style={{
                  fontSize: '10px',
                  color: '#8696A0',
                  marginBottom: '4px',
                  paddingLeft: '8px'
                }}>
                  Amanda, 29
                </div>
                <div style={{
                  backgroundColor: '#1C5A4E',
                  color: '#FFFFFF',
                  padding: '8px 12px',
                  borderRadius: '0 10px 10px 10px',
                  maxWidth: '80%',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255,0,0,0.2), rgba(139,0,0,0.2))',
                    padding: '6px',
                    borderRadius: '6px',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '20px' }}>🔒</span>
                    <span style={{ fontSize: '12px', fontStyle: 'italic' }}>Foto • Clique para ver</span>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '1.4',
                    marginBottom: '4px'
                  }}>
                    Acabei de enviar uma prévia... quem quiser ver mais, só chamar 😈
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#8EBDA1',
                    textAlign: 'right',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '3px'
                  }}>
                    23:51
                    <span style={{ fontSize: '12px' }}>✓✓</span>
                  </div>
                </div>
              </div>
              
              {/* Mensagem 4 - Áudio */}
              <div style={{
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'flex-end',
                animation: 'fadeInRight 1.1s ease-out'
              }}>
                <div>
                  <div style={{
                    fontSize: '10px',
                    color: '#8696A0',
                    marginBottom: '4px',
                    paddingRight: '8px',
                    textAlign: 'right'
                  }}>
                    Rafael, 35
                  </div>
                  <div style={{
                    backgroundColor: '#1F2C34',
                    color: '#FFFFFF',
                    padding: '10px 12px',
                    borderRadius: '10px 0 10px 10px',
                    maxWidth: '200px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '4px'
                    }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#00AF9C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '14px' }}>▶️</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          height: '20px',
                          background: `repeating-linear-gradient(
                            90deg,
                            #4A5A64,
                            #4A5A64 2px,
                            transparent 2px,
                            transparent 4px
                          )`,
                          borderRadius: '10px',
                          position: 'relative'
                        }}>
                          <div style={{
                            position: 'absolute',
                            bottom: '-14px',
                            left: 0,
                            fontSize: '10px',
                            color: '#8696A0'
                          }}>
                            0:18
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#8696A0',
                      textAlign: 'right',
                      marginTop: '14px'
                    }}>
                      23:52
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Indicador de digitação */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                animation: 'fadeIn 1.5s ease-out'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#00AF9C',
                  fontStyle: 'italic'
                }}>
                  Juliana está digitando
                </span>
                <div style={{
                  display: 'flex',
                  gap: '2px'
                }}>
                  <span style={{
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#00AF9C',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0s'
                  }} />
                  <span style={{
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#00AF9C',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0.2s'
                  }} />
                  <span style={{
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#00AF9C',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite',
                    animationDelay: '0.4s'
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/tinder" component={TinderPage} />
    </Switch>
  );
}