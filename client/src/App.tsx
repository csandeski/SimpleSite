import { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import { Helmet } from 'react-helmet-async';
import fundoImg from '@assets/fundo_1758886315966.png';
import sexyLogo from '@assets/123123_1758969742043.png';
import TinderPage from './pages/TinderPage';
import PreSellPage from './pages/PreSellPage';

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
  const [userCity] = useState<string>('Sua região (até 20km)');
  const [, setLocation] = useLocation();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [currentName, setCurrentName] = useState('');
  
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
    "Maria", "Ana", "Juliana", "Beatriz", "Fernanda",
    "Carolina", "Patricia", "Amanda", "Larissa", "Gabriela",
    "Rafaela", "Natália", "Isabella", "Letícia", "Camila",
    "Bruna", "Mariana", "Vanessa", "Aline", "Renata"
  ];

  // Location fetching removed - now using static text
  
  // Auto-rotate do carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex(prev => (prev + 1) % carouselImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);
  
  // Notification system effect
  useEffect(() => {
    const notificationNames = [
      "Maria", "Ana", "Juliana", "Beatriz", "Fernanda",
      "Carolina", "Patricia", "Amanda", "Larissa", "Gabriela",
      "Rafaela", "Natália", "Isabella", "Letícia", "Camila",
      "Bruna", "Mariana", "Vanessa", "Aline", "Renata"
    ];
    
    const showRandomNotification = () => {
      const randomName = notificationNames[Math.floor(Math.random() * notificationNames.length)];
      setCurrentName(randomName);
      setShowNotification(true);
      
      // Hide after 4 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    };
    
    // Show first notification after 2 seconds
    const initialTimeout = setTimeout(showRandomNotification, 2000);
    
    // Then show notifications every 6-8 seconds
    const interval = setInterval(() => {
      showRandomNotification();
    }, Math.random() * 2000 + 6000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  
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
    <>
      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes scaleUpDown {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.05);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
      
      {/* Fixed background layer */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${fundoImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1
      }} />
      
      {/* Notification container */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: 'rgba(0, 0, 0, 0.9)',
          borderRadius: '30px',
          padding: '10px 20px 10px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          animation: 'slideInLeft 0.5s ease-out',
          maxWidth: '280px'
        }}>
          {/* Pink circle with letter */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <span style={{
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              {currentName ? currentName[0] : 'M'}
            </span>
          </div>
          
          {/* Text content */}
          <div>
            <div style={{
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {currentName} acabou de entrar
            </div>
            <div style={{
              color: '#999999',
              fontSize: '12px',
              marginTop: '2px'
            }}>
              de {userCity}
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div 
        style={{
          minHeight: '100vh',
          width: '100%',
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
          Clique no vídeo para liberar sua vaga no grupo das casadas safadas{' '}
          <span style={{
            color: '#FFD700',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            de {userCity}
          </span>
          !
        </p>
        
        {/* Vídeo Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px',
          padding: '0 20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px'
          }}>
            <div dangerouslySetInnerHTML={{ 
              __html: '<vturb-smartplayer id="vid-68d915ace29a31783c99d9b3" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>' 
            }} />
            <Helmet>
              <script type="text/javascript">
                {`var s=document.createElement("script");s.src="https://scripts.converteai.net/35834812-7106-48d5-a046-1382b29c0d59/players/68d915ace29a31783c99d9b3/v4/player.js",s.async=!0,document.head.appendChild(s);`}
              </script>
            </Helmet>
          </div>
        </div>
        
        {/* CTA Button Section */}
        <div style={{
          marginTop: '30px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          {/* Pricing Information */}
          <div style={{
            marginBottom: '20px',
            padding: '15px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            maxWidth: '350px',
            margin: '0 auto 20px'
          }}>
            <p style={{
              fontSize: '16px',
              color: '#FFD700',
              margin: '0 0 8px 0',
              textDecoration: 'line-through',
              opacity: 0.8
            }}>
              De R$ 97,00
            </p>
            <p style={{
              fontSize: '24px',
              color: '#00FF00',
              fontWeight: 'bold',
              margin: '0 0 10px 0',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
            }}>
              Por apenas R$ 47,00
            </p>
            <p style={{
              fontSize: '14px',
              color: '#FF4444',
              fontWeight: 'bold',
              margin: 0,
              animation: 'pulse 1.5s infinite'
            }}>
              ⚠️ Restam apenas 16 vagas na sua região!
            </p>
          </div>
          
          <button
            onClick={() => {
              // Get current URL parameters
              const currentParams = new URLSearchParams(window.location.search);
              
              // Base PepperPay URL
              const baseUrl = 'https://go.pepperpay.com.br/rwxfk';
              
              // Preserve all UTM parameters
              const utmParams: string[] = [];
              currentParams.forEach((value, key) => {
                if (key.startsWith('utm_') || key === 'src' || key === 'sck') {
                  utmParams.push(`${key}=${encodeURIComponent(value)}`);
                }
              });
              
              // Build final URL with UTMs
              const finalUrl = utmParams.length > 0 
                ? `${baseUrl}?${utmParams.join('&')}`
                : baseUrl;
              
              // Redirect to PepperPay
              window.location.href = finalUrl;
            }}
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
            ⚡ Últimas vagas disponíveis
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
        
        {/* 3D Carousel Component */}
        {true && (
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
            🔥 Mulheres Online Agora em {userCity}
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
                        📍 {userCity}
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
        )}
      </div>
    </div>
  </>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path="/" component={PreSellPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/tinder" component={TinderPage} />
    </Switch>
  );
}