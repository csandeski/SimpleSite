import { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import fundoImg from '@assets/fundo_1758886315966.png';
import sexyLogo from '@assets/123123_1758969742043.png';
import TinderPage from './pages/TinderPage';

// Import das imagens do carousel
import carouselImg1 from '@assets/spdexpebofal7eo3wog800wssw0gg4k.r300x600.gCenter.c4c29140b4094c23306128ad1c2d1a0b_1758970676857.jpg';
import carouselImg2 from '@assets/spdexp2hx3d8j2jikgosk88o04sws8c.r300x600.gCenter.1a39b309bb6e294ef63f1beeb4883481_1758970676857.jpg';
import carouselImg3 from '@assets/spdexp3qiloznib0w0cgck0gwwwwcg8.r300x600.gCenter.7e1f146c635ea199c41a60453af0b0a1_1758970676857.jpg';
import carouselImg4 from '@assets/spdexp5ibqj5sfto0sw004k8k0ogsg0.r300x600.gCenter.e34511c00bcb166e82fbc64a34baaf79_1758970676857.jpg';
import carouselImg5 from '@assets/spdexp7su2nlahsykgg0g8og4k4gkks.r300x600.gCenter.ebfbd3c6fc70b5da5d7fc5750f0517cf_1758970676858.jpg';
import carouselImg6 from '@assets/spdexp644v2rmpihoggwoc0o40ocoww.r300x600.gCenter.197ffc158329553d1042da9df9ff7892_1758970676858.jpg';
import carouselImg7 from '@assets/spdexpa2t0l397emg484kgkk08skccg.r300x600.gCenter.888f5bf95410c3fc5af69ebc004513fe_1758970676858.jpg';
import carouselImg8 from '@assets/spdexpadf2cvksw6gocggw8ckkc4wco.r300x600.gCenter.69bd2f45182bd2e9cfb385d9f6930ebc_1758970676858.jpg';
import carouselImg9 from '@assets/spdexpblbgnpvsoxkw0s00oo0okog40.r300x600.gCenter.7f2e70918b64751fb781d152a4116633_1758970676859.jpg';
import carouselImg10 from '@assets/spdexpbx0ncxyud80s04ks4cgkckwco.r300x600.gCenter.59f17c71f447b3f2383bcfc813b05d96_1758970676859.jpg';
import carouselImg11 from '@assets/spdexpccnb58qhrtsg0o88go84kksw8.r300x600.gCenter.53b3b56174eebac222096b23576e8edd_1758970676859.jpg';
import carouselImg12 from '@assets/spdexpcubkzd5c2lcg0o448o0os4g48.r300x600.gCenter.6ba57bd8c0cfd8306fd170652fc94e3c_1758970676859.jpg';
import carouselImg13 from '@assets/spdexpd81p0qn9fk84kwgoks8co4w4c.r300x600.gCenter.5db384b664ad16f5057607f9ee5469b1_1758970676860.jpg';

function HomePage() {
  const [userCity, setUserCity] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [, setLocation] = useLocation();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  // Array de imagens do carousel
  const carouselImages = [
    carouselImg1,
    carouselImg2,
    carouselImg3,
    carouselImg4,
    carouselImg5,
    carouselImg6,
    carouselImg7,
    carouselImg8,
    carouselImg9,
    carouselImg10,
    carouselImg11,
    carouselImg12,
    carouselImg13
  ];

  const womenNames = [
    "Carolina", "Amanda", "Juliana", "Patricia", "Fernanda",
    "Beatriz", "Rafaela", "Mariana", "Isabella", "Gabriela",
    "Larissa", "Letícia", "Natália"
  ];

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
  
  // Auto-rotate do carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex(prev => (prev + 1) % carouselImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);
  
  // Função para calcular a posição e escala de cada imagem no carousel
  const getCarouselItemStyle = (index: number) => {
    const totalImages = carouselImages.length;
    const anglePerItem = 360 / totalImages;
    const rotation = ((index - currentCarouselIndex) * anglePerItem + 360) % 360;
    
    // Converte rotação para radianos
    const radian = (rotation * Math.PI) / 180;
    
    // Calcula posição X e Z
    const translateX = Math.sin(radian) * 250;
    const translateZ = Math.cos(radian) * 250 - 250;
    
    // Escala baseada na posição Z (mais perto = maior)
    const scale = translateZ > -150 ? 1.2 : 0.6 + (translateZ + 500) / 2000;
    
    // Opacidade baseada na posição
    const opacity = translateZ > -300 ? 1 : 0.6;
    
    // Z-index baseado na posição Z
    const zIndex = Math.floor(translateZ + 500);
    
    return {
      position: 'absolute' as const,
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      width: '180px',
      height: '320px'
    };
  };

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
        
        {/* Logo Sexy Premium */}
        <img
          src={sexyLogo}
          alt="Sexy Premium"
          style={{
            width: '120px',
            height: 'auto',
            marginBottom: '15px'
          }}
        />
        
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
            textAlign: 'left',
            marginBottom: '5px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
          }}>
            💬 Conversas QUENTES do Grupo
          </h2>
          <p style={{
            fontSize: '12px',
            color: '#FFD700',
            textAlign: 'left',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            ⚠️ Conteúdo Adulto +18 ⚠️
          </p>
          
          {/* Container do Chat estilo WhatsApp */}
          <div style={{
            maxWidth: '380px',
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
                  marginBottom: '2px',
                  textAlign: 'left'
                }}>
                  Casadas Safadas {userCity ? `- ${userCity}` : ''}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#8EBDA1',
                  textAlign: 'left'
                }}>
                  642 participantes • 227 online agora
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
                display: 'flex',
                justifyContent: 'flex-start',
                animation: 'fadeInLeft 0.9s ease-out'
              }}>
                <div>
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
        
        {/* 3D Carousel Component */}
        <div style={{
          marginTop: '60px',
          marginBottom: '60px',
          position: 'relative',
          width: '100%',
          maxWidth: '100vw',
          overflow: 'hidden',
          padding: '40px 0'
        }}>
          <h2 style={{
            fontSize: '24px',
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '10px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
          }}>
            🔥 Mulheres Online Agora em {userCity || 'Sua Região'}
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#FFD700',
            textAlign: 'center',
            marginBottom: '40px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            ⚡ Deslize para ver mais perfis disponíveis ⚡
          </p>
          
          {/* Container do Carousel 3D */}
          <div style={{
            position: 'relative',
            height: '400px',
            width: '100%',
            perspective: '1200px',
            perspectiveOrigin: 'center center',
            transformStyle: 'preserve-3d',
            margin: '0 auto'
          }}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(-250px)',
              left: '50%',
              marginLeft: '-90px'
            }}>
              {carouselImages.map((img, index) => (
                <div
                  key={index}
                  style={getCarouselItemStyle(index)}
                  onClick={() => setCurrentCarouselIndex(index)}
                >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
                    cursor: 'pointer',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
                  }}>
                    <img
                      src={img}
                      alt={`Perfil ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    
                    {/* Dark overlay for non-center images */}
                    {index !== currentCarouselIndex && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1
                      }} />
                    )}
                    
                    {/* Badge verde "disponível agora" */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'linear-gradient(135deg, #00C853 0%, #00E676 100%)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: '0 4px 12px rgba(0, 230, 118, 0.5)',
                      animation: index === currentCarouselIndex ? 'pulse 1.5s infinite' : 'none'
                    }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        background: '#FFFFFF',
                        borderRadius: '50%',
                        animation: 'blink 1s infinite'
                      }} />
                      <span style={{
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        Disponível Agora
                      </span>
                    </div>
                    
                    {/* Bottom info section with name and location */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                      padding: '15px 10px 10px',
                      zIndex: 2
                    }}>
                      <p style={{
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        margin: '0 0 2px 0'
                      }}>
                        {womenNames[index]}
                      </p>
                      <p style={{
                        color: '#FFD700',
                        fontSize: '11px',
                        margin: 0
                      }}>
                        📍 {userCity || 'Sua cidade'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicadores de posição */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '40px'
          }}>
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCarouselIndex(index)}
                style={{
                  width: index === currentCarouselIndex ? '30px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  border: 'none',
                  background: index === currentCarouselIndex 
                    ? 'linear-gradient(90deg, #FF0000, #FFD700)'
                    : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: index === currentCarouselIndex 
                    ? '0 0 10px rgba(255, 0, 0, 0.5)'
                    : 'none'
                }}
              />
            ))}
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