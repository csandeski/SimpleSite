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
          marginTop: '40px',
          borderTop: '2px solid rgba(255, 0, 0, 0.2)'
        }}>
          <h2 style={{
            fontSize: '18px',
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            👀 Conversas Reais Rolando AGORA no Grupo…
          </h2>
          
          {/* Container do Chat */}
          <div style={{
            maxWidth: '380px',
            margin: '0 auto',
            backgroundColor: '#1C2831',
            borderRadius: '10px',
            padding: '15px',
            minHeight: '400px',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E")'
          }}>
            
            {/* Mensagem 1 - Mulher */}
            <div style={{
              marginBottom: '12px',
              animation: 'fadeInLeft 0.5s ease-out',
              opacity: 1
            }}>
              <div style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '0 15px 15px 15px',
                maxWidth: '75%',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: '#D4FFE4'
                }}>
                  Patrícia, 32
                </div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  Tô carente demais... quem vem me fazer companhia hoje? 🔥
                </div>
              </div>
            </div>
            
            {/* Mensagem 2 - Homem */}
            <div style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'flex-end',
              animation: 'fadeInRight 0.7s ease-out',
              opacity: 1
            }}>
              <div style={{
                backgroundColor: '#373737',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '15px 0 15px 15px',
                maxWidth: '75%',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: '#B8B8B8'
                }}>
                  Carlos, 28
                </div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  Eu vou! Adoro uma casada safada... onde vc mora? 😈
                </div>
              </div>
            </div>
            
            {/* Mensagem 3 - Mulher */}
            <div style={{
              marginBottom: '12px',
              animation: 'fadeInLeft 0.9s ease-out',
              opacity: 1
            }}>
              <div style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '0 15px 15px 15px',
                maxWidth: '75%',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: '#D4FFE4'
                }}>
                  Amanda, 29
                </div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  Alguém curte fazer ao ar livre? Tenho um lugar bem discreto 💦
                </div>
              </div>
            </div>
            
            {/* Mensagem 4 - Homem */}
            <div style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'flex-end',
              animation: 'fadeInRight 1.1s ease-out',
              opacity: 1
            }}>
              <div style={{
                backgroundColor: '#373737',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '15px 0 15px 15px',
                maxWidth: '75%',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: '#B8B8B8'
                }}>
                  Rafael, 35
                </div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  Acabei de sair do motel com uma do grupo... valeu a pena! 🍑
                </div>
              </div>
            </div>
            
            {/* Mensagem 5 - Mulher */}
            <div style={{
              marginBottom: '12px',
              animation: 'fadeInLeft 1.3s ease-out',
              opacity: 1
            }}>
              <div style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '0 15px 15px 15px',
                maxWidth: '75%',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: '#D4FFE4'
                }}>
                  Juliana, 36
                </div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  Marido viajou... casa livre o fds todo! Quem vem? 🏠🔥
                </div>
              </div>
            </div>
            
            {/* Mensagem 6 - Homem */}
            <div style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'flex-end',
              animation: 'fadeInRight 1.5s ease-out',
              opacity: 1
            }}>
              <div style={{
                backgroundColor: '#373737',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '15px 0 15px 15px',
                maxWidth: '75%',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: '#B8B8B8'
                }}>
                  Bruno, 31
                </div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  Prefiro as mais experientes... tem alguma 40+ online? 😋
                </div>
              </div>
            </div>
            
            {/* Mensagem 7 - Mulher */}
            <div style={{
              marginBottom: '12px',
              animation: 'fadeInLeft 1.7s ease-out',
              opacity: 1
            }}>
              <div style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '0 15px 15px 15px',
                maxWidth: '75%',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: '#D4FFE4'
                }}>
                  Fernanda, 42
                </div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  Eu estou Bruno! E adoro ensinar os mais novos... vem privado 💋
                </div>
              </div>
            </div>
            
            {/* Mensagem 8 - Homem */}
            <div style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'flex-end',
              animation: 'fadeInRight 1.9s ease-out',
              opacity: 1
            }}>
              <div style={{
                backgroundColor: '#373737',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '15px 0 15px 15px',
                maxWidth: '75%',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: '#B8B8B8'
                }}>
                  Pedro, 26
                </div>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  Alguém topa algo agora? Hotel centro, pago tudo! 💰
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}