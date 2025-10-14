import { useState, useEffect } from 'react';

export default function App() {
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [videoFocused, setVideoFocused] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [reactions] = useState({
    likes: 2341,
    loves: 523,
    wows: 89,
    comments: 156,
    shares: 47
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load Vturb video player script when component mounts and verification is complete
  useEffect(() => {
    if (isVerified) {
      const script = document.createElement("script");
      script.src = "https://scripts.converteai.net/539ae18c-7f73-47fc-95db-69b6926424c0/players/68ed9e78e32037963bdebbd2/v4/player.js";
      script.async = true;
      document.head.appendChild(script);
      
      return () => {
        // Clean up script when component unmounts
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [isVerified]);

  const handleVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setShowCheckmark(true);
      setTimeout(() => {
        setIsVerified(true);
      }, 800);
    }, 500);
  };

  // Verification Screen
  if (!isVerified) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1877f2',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px 30px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '20px'
          }}>
            🤖
          </div>
          
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '12px'
          }}>
            Verificação de Segurança
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#718096',
            marginBottom: '30px',
            lineHeight: '1.5'
          }}>
            Toque na caixa abaixo para confirmar que você não é um robô
          </p>

          <div 
            onClick={handleVerification}
            style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 24px',
              border: showCheckmark ? '4px solid #48bb78' : '4px solid #e2e8f0',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isVerifying ? 'default' : 'pointer',
              background: showCheckmark 
                ? 'linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%)' 
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: showCheckmark 
                ? '0 4px 20px rgba(72, 187, 120, 0.3), inset 0 2px 4px rgba(0,0,0,0.05)'
                : '0 4px 20px rgba(0,0,0,0.08), inset 0 2px 4px rgba(0,0,0,0.02)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isVerifying && !showCheckmark ? 'scale(0.95)' : 'scale(1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!isVerifying && !showCheckmark) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.4), inset 0 2px 4px rgba(0,0,0,0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isVerifying && !showCheckmark) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08), inset 0 2px 4px rgba(0,0,0,0.02)';
              }
            }}
          >
            {/* Loading animation circles */}
            {isVerifying && !showCheckmark && (
              <>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  border: '3px solid transparent',
                  borderTopColor: '#667eea',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <div style={{
                  position: 'absolute',
                  width: '80%',
                  height: '80%',
                  borderRadius: '12px',
                  border: '2px solid transparent',
                  borderBottomColor: '#764ba2',
                  animation: 'spin 1s linear infinite reverse'
                }} />
              </>
            )}
            
            {/* Checkbox icon when not checked */}
            {!isVerifying && !showCheckmark && (
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '3px solid #cbd5e0',
                background: 'white',
                transition: 'all 0.3s ease'
              }} />
            )}
            
            {/* Checkmark when verified */}
            {showCheckmark && (
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none"
                style={{
                  animation: 'checkmarkBounce 0.6s ease-out',
                  zIndex: 2
                }}
              >
                <path 
                  d="M20 6L9 17L4 12" 
                  stroke="#48bb78" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: '24',
                    strokeDashoffset: '0',
                    animation: 'checkmarkDraw 0.5s ease-out'
                  }}
                />
              </svg>
            )}
            
            {/* Pulse effect on hover */}
            {!isVerifying && !showCheckmark && (
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
                animation: 'pulse 2s infinite',
                pointerEvents: 'none'
              }} />
            )}
          </div>
          
          {/* Instruction text below the box */}
          {!showCheckmark && !isVerifying && (
            <p style={{
              fontSize: '13px',
              color: '#94a3b8',
              marginTop: '-8px',
              marginBottom: '20px',
              animation: 'fadeIn 0.5s ease-in-out'
            }}>
              👆 Clique na caixa acima
            </p>
          )}

          {showCheckmark && (
            <p style={{
              fontSize: '14px',
              color: '#48bb78',
              fontWeight: '600',
              animation: 'fadeIn 0.5s ease-in-out'
            }}>
              ✓ Verificação concluída!
            </p>
          )}
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes fadeIn {
              0% { opacity: 0; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1); }
            }
            
            @keyframes checkmarkDraw {
              0% { stroke-dashoffset: 24; }
              100% { stroke-dashoffset: 0; }
            }
            
            @keyframes checkmarkBounce {
              0% { transform: scale(0); }
              50% { transform: scale(1.2); }
              100% { transform: scale(1); }
            }
            
            @keyframes pulse {
              0% { opacity: 0; transform: scale(0.8); }
              50% { opacity: 0.3; transform: scale(1); }
              100% { opacity: 0; transform: scale(1.2); }
            }
            
            /* Custom Scrollbar Styles */
            ::-webkit-scrollbar {
              width: 12px;
              height: 12px;
            }
            
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
              background: #1877f2;
              border-radius: 10px;
              border: 2px solid #f1f1f1;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: #166fe5;
            }
            
            /* Firefox */
            * {
              scrollbar-width: thin;
              scrollbar-color: #1877f2 #f1f1f1;
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Dark Overlay */}
      <div 
        onClick={() => setVideoFocused(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: videoFocused ? 'rgba(0, 0, 0, 0.75)' : 'transparent',
          zIndex: videoFocused ? 90 : -1,
          cursor: videoFocused ? 'pointer' : 'default',
          transition: 'background 0.3s ease',
          pointerEvents: videoFocused ? 'auto' : 'none'
        }}
      />
      {/* Fixed Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        background: '#ffffff',
        borderBottom: '1px solid #e4e6eb',
        zIndex: videoFocused ? 85 : 100,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'filter 0.3s ease',
        filter: videoFocused ? 'brightness(0.3)' : 'brightness(1)'
      }}>
        {/* Facebook Logo */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#1877f2"/>
          <path d="M27.7852 25.9844L28.4688 21.125H23.8281V18.2031C23.8281 16.957 24.4258 15.7422 26.3164 15.7422H28.6562V11.5703C28.6562 11.5703 26.5039 11.25 24.4297 11.25C20.1328 11.25 17.8594 13.332 17.8594 17.6875V21.125H13.5625V25.9844H17.8594V37.8125C18.6602 37.9375 19.4805 38 20.3125 38C21.1445 38 21.9648 37.9375 22.7656 37.8125V25.9844H27.7852Z" fill="white"/>
        </svg>

        {/* Search Bar */}
        <div style={{
          flex: 1,
          maxWidth: '240px',
          position: 'relative'
        }}>
          <input 
            type="text"
            placeholder="Pesquisar no Facebook"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: '#f0f2f5',
              border: 'none',
              borderRadius: '20px',
              fontSize: isMobile ? '14px' : '15px',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <svg style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '16px',
            height: '16px'
          }} viewBox="0 0 16 16" fill="#65676b">
            <path d="M6.5 0a6.5 6.5 0 0 1 5.25 10.335l3.957 3.958a1 1 0 0 1-1.414 1.414l-3.958-3.957A6.5 6.5 0 1 1 6.5 0zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>
          </svg>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Navigation Icons */}
        <button style={{
          background: 'none',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#f0f2f5'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="#050505">
            <rect x="1" y="1" width="5" height="5" rx="1"/>
            <rect x="7.5" y="1" width="5" height="5" rx="1"/>
            <rect x="14" y="1" width="5" height="5" rx="1"/>
            <rect x="1" y="7.5" width="5" height="5" rx="1"/>
            <rect x="7.5" y="7.5" width="5" height="5" rx="1"/>
            <rect x="14" y="7.5" width="5" height="5" rx="1"/>
            <rect x="1" y="14" width="5" height="5" rx="1"/>
            <rect x="7.5" y="14" width="5" height="5" rx="1"/>
            <rect x="14" y="14" width="5" height="5" rx="1"/>
          </svg>
        </button>

        {/* Messenger */}
        <button style={{
          background: 'none',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#f0f2f5'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="#050505">
            <path d="M10 0C4.477 0 0 4.477 0 10c0 2.778 1.135 5.284 2.965 7.088.182.178.285.432.274.688l-.056 2.027a.72.72 0 001.048.632l2.253-1.001a.72.72 0 01.535-.04A9.941 9.941 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zM5.594 12.083l2.374-3.764a.36.36 0 01.576-.047l1.89 1.417a.72.72 0 00.866-.002l2.553-1.938a.454.454 0 01.654.662l-2.376 3.765a.36.36 0 01-.575.047l-1.89-1.417a.72.72 0 00-.866.001l-2.553 1.938a.454.454 0 01-.653-.662z"/>
          </svg>
        </button>

        {/* Notifications */}
        <button style={{
          background: 'none',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          position: 'relative'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#f0f2f5'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="#050505">
            <path d="M10 20a2 2 0 01-2-2h4a2 2 0 01-2 2zm8-4.5v.5H2v-.5l2-2v-5C4 4.86 6.86 2 10.5 2S17 4.86 17 8.5v5l1 1z"/>
          </svg>
          {/* Notification Badge */}
          <div style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '18px',
            height: '18px',
            background: '#fa3e3e',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '11px',
            fontWeight: 'bold',
            border: '2px solid white'
          }}>
            1
          </div>
        </button>

        {/* Profile */}
        <button style={{
          background: 'none',
          border: 'none',
          padding: '4px',
          cursor: 'pointer',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          position: 'relative'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#f0f2f5'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#e4e6eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#65676b">
              <path d="M10 10a3 3 0 100-6 3 3 0 000 6zm0 1.5c-4.5 0-8 2.5-8 5.5v1h16v-1c0-3-3.5-5.5-8-5.5z"/>
            </svg>
          </div>
          {/* Online Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '10px',
            height: '10px',
            background: '#31a24c',
            borderRadius: '50%',
            border: '2px solid white'
          }} />
        </button>
      </div>

      {/* Main Content Container */}
      <div style={{
        marginTop: '56px',
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'center',
        padding: isMobile ? '0' : '20px',
        transition: 'filter 0.3s ease',
        filter: videoFocused ? 'brightness(0.25)' : 'brightness(1)'
      }}>
        {/* Facebook Card Container */}
        <div style={{
          width: '100%',
          maxWidth: isMobile ? '100%' : '680px',
          minHeight: isMobile ? 'calc(100vh - 56px)' : 'auto',
          background: '#ffffff',
          borderRadius: isMobile ? '0' : '8px',
          boxShadow: isMobile ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
        {/* Post Header */}
        <div style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px'
        }}>
          {/* Profile Picture */}
          <img 
            src="/leandro-castro.jpg"
            alt="Leandro Castro"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              flexShrink: 0,
              objectFit: 'cover'
            }}
          />
          
          {/* Post Info */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{
                fontSize: isMobile ? '14px' : '15px',
                fontWeight: '600',
                color: '#050505'
              }}>
                Leandro Castro
              </span>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="#1877f2">
                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm-1 15l-5-5 1.41-1.41L9 12.17l7.59-7.59L18 6l-9 9z"/>
              </svg>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              color: '#65676b'
            }}>
              <span>2h</span>
              <span>·</span>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="#65676b">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z"/>
                <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z"/>
                <path d="M10 12a6 6 0 00-5.656 4 8 8 0 0011.312 0A6 6 0 0010 12z"/>
              </svg>
            </div>
          </div>

          {/* Three Dots Menu */}
          <button style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            borderRadius: '50%',
            transition: 'background 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0f2f5'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#65676b">
              <circle cx="10" cy="10" r="2"/>
              <circle cx="10" cy="4" r="2"/>
              <circle cx="10" cy="16" r="2"/>
            </svg>
          </button>
        </div>

        {/* Post Content */}
        <div style={{
          padding: '0 16px 12px'
        }}>
          <h3 style={{
            fontSize: '15px',
            fontWeight: '600',
            color: '#050505',
            margin: '0 0 8px 0',
            lineHeight: '1.3'
          }}>
            🚀 A oportunidade de 2025 chegou no Brasil!
          </h3>
          <p style={{
            fontSize: '15px',
            color: '#050505',
            lineHeight: '1.5',
            margin: 0
          }}>
            A nova oportunidade! A empresa onde você poderá trabalhar e receber um <strong>salário de até R$ 8.900/mês</strong>
          </p>
        </div>

        {/* Video Player Area */}
        <div 
          style={{
            position: 'relative',
            background: '#000',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: videoFocused ? 95 : 1,
            transition: 'all 0.3s ease',
            boxShadow: videoFocused ? '0 20px 60px rgba(0, 0, 0, 0.8)' : 'none'
          }}>
          {/* Vturb Smart Player */}
          <div 
            id="video-container" 
            style={{
              width: '100%',
              height: '100%'
            }}
            dangerouslySetInnerHTML={{
              __html: `<vturb-smartplayer id="vid-68ed9e78e32037963bdebbd2" style="display: block; margin: 0 auto; width: 100%; height: 100%;"></vturb-smartplayer>`
            }}
          />
        </div>

        {/* Reactions Bar */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #e4e6eb'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {/* Reaction Icons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{
                display: 'flex',
                marginRight: '6px',
                position: 'relative'
              }}>
                {/* Like Icon */}
                <img 
                  src="/fb-like.png"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '1px solid white',
                    marginRight: '-6px',
                    zIndex: 3
                  }}
                  alt="like"
                />
                {/* Love Icon */}
                <img 
                  src="/fb-love.png"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '1px solid white',
                    marginRight: '-6px',
                    zIndex: 2
                  }}
                  alt="love"
                />
                {/* Wow Icon */}
                <img 
                  src="/fb-wow.png"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '1px solid white',
                    zIndex: 1
                  }}
                  alt="wow"
                />
              </div>
              <span style={{
                fontSize: isMobile ? '13px' : '15px',
                color: '#65676b'
              }}>
                {(reactions.likes + reactions.loves + reactions.wows).toLocaleString()}
              </span>
            </div>

            {/* Comments and Shares */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '12px' : '16px',
              fontSize: isMobile ? '13px' : '15px',
              color: '#65676b'
            }}>
              <span>{reactions.comments} comentários</span>
              <span>{reactions.shares} compartilhamentos</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          padding: '4px 16px',
          display: 'flex',
          justifyContent: 'space-around'
        }}>
          {/* Like Button */}
          <button
            onClick={() => setLiked(!liked)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px',
              background: 'none',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background 0.2s',
              color: liked ? '#1877f2' : '#65676b',
              fontWeight: '600',
              fontSize: isMobile ? '14px' : '15px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f0f2f5'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? '#1877f2' : 'none'} stroke={liked ? '#1877f2' : '#65676b'} strokeWidth="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            Curtir
          </button>

          {/* Comment Button */}
          <button style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '8px',
            background: 'none',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.2s',
            color: '#65676b',
            fontWeight: '600',
            fontSize: '15px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0f2f5'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#65676b" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Comentar
          </button>

          {/* Share Button */}
          <button style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '8px',
            background: 'none',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.2s',
            color: '#65676b',
            fontWeight: '600',
            fontSize: '15px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0f2f5'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#65676b" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            Compartilhar
          </button>
        </div>

        {/* Comments Section */}
        <div style={{
          borderTop: '1px solid #e4e6eb',
          padding: '16px'
        }}>
          {/* Existing Comments */}
          <div style={{
            marginBottom: '16px'
          }}>
            {/* Comment 1 */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <img 
                src="/maria-silva.jpg"
                alt="Maria Silva"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  background: '#f0f2f5',
                  borderRadius: '16px',
                  padding: '8px 12px',
                  display: 'inline-block',
                  maxWidth: '100%'
                }}>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    marginBottom: '2px'
                  }}>
                    Maria Silva
                  </div>
                  <div style={{
                    fontSize: isMobile ? '14px' : '15px',
                    lineHeight: '1.4'
                  }}>
                    Incrível! Isso realmente funciona? 🤩
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '4px',
                  marginLeft: '12px',
                  fontSize: '12px',
                  color: '#65676b'
                }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1877f2', fontWeight: '600', padding: 0 }}>Curtir</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Responder</button>
                  <span>15 min</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', position: 'relative' }}>
                      <img src="/fb-like.png" style={{ width: '18px', height: '18px', marginRight: '-6px', zIndex: 3, borderRadius: '50%', border: '1px solid white' }} alt="like" />
                      <img src="/fb-love.png" style={{ width: '18px', height: '18px', marginRight: '-6px', zIndex: 2, borderRadius: '50%', border: '1px solid white' }} alt="love" />
                      <img src="/fb-wow.png" style={{ width: '18px', height: '18px', marginRight: '4px', zIndex: 1, borderRadius: '50%', border: '1px solid white' }} alt="wow" />
                    </div>
                    <span style={{ color: '#65676b', fontSize: '12px' }}>47</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <img 
                src="/ana-costa.jpg"
                alt="Ana Costa"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  background: '#f0f2f5',
                  borderRadius: '16px',
                  padding: '8px 12px',
                  display: 'inline-block',
                  maxWidth: '100%'
                }}>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    marginBottom: '2px'
                  }}>
                    Ana Costa
                  </div>
                  <div style={{
                    fontSize: isMobile ? '14px' : '15px',
                    lineHeight: '1.4'
                  }}>
                    Já estou aplicando e os resultados são impressionantes! Recomendo muito 💪
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '4px',
                  marginLeft: '12px',
                  fontSize: '12px',
                  color: '#65676b'
                }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1877f2', fontWeight: '600', padding: 0 }}>
                    <span style={{ marginRight: '4px' }}>👍</span>Curtir
                  </button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Responder</button>
                  <span>32 min</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', position: 'relative' }}>
                      <img src="/fb-like.png" style={{ width: '18px', height: '18px', marginRight: '-6px', zIndex: 3, borderRadius: '50%', border: '1px solid white' }} alt="like" />
                      <img src="/fb-love.png" style={{ width: '18px', height: '18px', marginRight: '-6px', zIndex: 2, borderRadius: '50%', border: '1px solid white' }} alt="love" />
                      <img src="/fb-wow.png" style={{ width: '18px', height: '18px', marginRight: '4px', zIndex: 1, borderRadius: '50%', border: '1px solid white' }} alt="wow" />
                    </div>
                    <span style={{ color: '#65676b', fontSize: '12px' }}>89</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment 3 with reply */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <img 
                src="/juliana-santos.jpg"
                alt="Juliana Santos"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  background: '#f0f2f5',
                  borderRadius: '16px',
                  padding: '8px 12px',
                  display: 'inline-block',
                  maxWidth: '100%'
                }}>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    marginBottom: '2px'
                  }}>
                    Juliana Santos
                  </div>
                  <div style={{
                    fontSize: isMobile ? '14px' : '15px',
                    lineHeight: '1.4'
                  }}>
                    Onde posso saber mais sobre isso?
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '4px',
                  marginLeft: '12px',
                  fontSize: '12px',
                  color: '#65676b'
                }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Curtir</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Responder</button>
                  <span>1h</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', position: 'relative' }}>
                      <img src="/fb-like.png" style={{ width: '18px', height: '18px', marginRight: '-6px', zIndex: 2, borderRadius: '50%', border: '1px solid white' }} alt="like" />
                      <img src="/fb-wow.png" style={{ width: '18px', height: '18px', marginRight: '4px', zIndex: 1, borderRadius: '50%', border: '1px solid white' }} alt="wow" />
                    </div>
                    <span style={{ color: '#65676b', fontSize: '12px' }}>15</span>
                  </div>
                </div>
                
                {/* Reply */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '12px',
                  marginLeft: '32px'
                }}>
                  <img 
                    src="/leandro-castro.jpg"
                    alt="Leandro Castro"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      background: '#f0f2f5',
                      borderRadius: '16px',
                      padding: '8px 12px',
                      display: 'inline-block',
                      maxWidth: '100%'
                    }}>
                      <div style={{
                        fontWeight: '600',
                        fontSize: '13px',
                        marginBottom: '2px'
                      }}>
                        Leandro Castro
                      </div>
                      <div style={{
                        fontSize: isMobile ? '14px' : '15px',
                        lineHeight: '1.4'
                      }}>
                        <span style={{ color: '#1877f2', fontWeight: '600' }}>@Juliana Santos</span> Clique no vídeo para assistir a apresentação completa! 😊
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      marginTop: '4px',
                      marginLeft: '12px',
                      fontSize: '12px',
                      color: '#65676b'
                    }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1877f2', fontWeight: '600', padding: 0 }}>Curtir</button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Responder</button>
                      <span>45 min</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', position: 'relative' }}>
                          <img src="/fb-like.png" style={{ width: '16px', height: '16px', marginRight: '-5px', zIndex: 2, borderRadius: '50%', border: '1px solid white' }} alt="like" />
                          <img src="/fb-love.png" style={{ width: '16px', height: '16px', marginRight: '4px', zIndex: 1, borderRadius: '50%', border: '1px solid white' }} alt="love" />
                        </div>
                        <span style={{ color: '#65676b', fontSize: '11px' }}>28</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment 4 */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <img 
                src="/carla-mendes.jpg"
                alt="Carla Mendes"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  background: '#f0f2f5',
                  borderRadius: '16px',
                  padding: '8px 12px',
                  display: 'inline-block',
                  maxWidth: '100%'
                }}>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    marginBottom: '2px'
                  }}>
                    Carla Mendes
                  </div>
                  <div style={{
                    fontSize: isMobile ? '14px' : '15px',
                    lineHeight: '1.4'
                  }}>
                    Já enviei meu currículo! Tomara que dê certo 🙏
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '4px',
                  marginLeft: '12px',
                  fontSize: '12px',
                  color: '#65676b'
                }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1877f2', fontWeight: '600', padding: 0 }}>Curtir</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Responder</button>
                  <span>2h</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', position: 'relative' }}>
                      <img src="/fb-like.png" style={{ width: '18px', height: '18px', marginRight: '-6px', zIndex: 3, borderRadius: '50%', border: '1px solid white' }} alt="like" />
                      <img src="/fb-love.png" style={{ width: '18px', height: '18px', marginRight: '-6px', zIndex: 2, borderRadius: '50%', border: '1px solid white' }} alt="love" />
                      <img src="/fb-wow.png" style={{ width: '18px', height: '18px', marginRight: '4px', zIndex: 1, borderRadius: '50%', border: '1px solid white' }} alt="wow" />
                    </div>
                    <span style={{ color: '#65676b', fontSize: '12px' }}>156</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment 5 with replies */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <img 
                src="/beatriz-rocha.jpg"
                alt="Beatriz Rocha"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  background: '#f0f2f5',
                  borderRadius: '16px',
                  padding: '8px 12px',
                  display: 'inline-block',
                  maxWidth: '100%'
                }}>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '13px',
                    marginBottom: '2px'
                  }}>
                    Beatriz Rocha
                  </div>
                  <div style={{
                    fontSize: isMobile ? '14px' : '15px',
                    lineHeight: '1.4'
                  }}>
                    Precisa de experiência prévia ou aceita iniciantes?
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '4px',
                  marginLeft: '12px',
                  fontSize: '12px',
                  color: '#65676b'
                }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Curtir</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Responder</button>
                  <span>3h</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', position: 'relative' }}>
                      <img src="/fb-like.png" style={{ width: '18px', height: '18px', marginRight: '-6px', zIndex: 2, borderRadius: '50%', border: '1px solid white' }} alt="like" />
                      <img src="/fb-wow.png" style={{ width: '18px', height: '18px', marginRight: '4px', zIndex: 1, borderRadius: '50%', border: '1px solid white' }} alt="wow" />
                    </div>
                    <span style={{ color: '#65676b', fontSize: '12px' }}>34</span>
                  </div>
                </div>
                
                {/* Reply from Leandro */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '12px',
                  marginLeft: '32px'
                }}>
                  <img 
                    src="/leandro-castro.jpg"
                    alt="Leandro Castro"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      background: '#f0f2f5',
                      borderRadius: '16px',
                      padding: '8px 12px',
                      display: 'inline-block',
                      maxWidth: '100%'
                    }}>
                      <div style={{
                        fontWeight: '600',
                        fontSize: '13px',
                        marginBottom: '2px'
                      }}>
                        Leandro Castro
                      </div>
                      <div style={{
                        fontSize: isMobile ? '14px' : '15px',
                        lineHeight: '1.4'
                      }}>
                        <span style={{ color: '#1877f2', fontWeight: '600' }}>@Beatriz Rocha</span> Oferecemos treinamento completo! Não precisa de experiência prévia 💪
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      marginTop: '4px',
                      marginLeft: '12px',
                      fontSize: '12px',
                      color: '#65676b'
                    }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1877f2', fontWeight: '600', padding: 0 }}>Curtir</button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Responder</button>
                      <span>2h</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', position: 'relative' }}>
                          <img src="/fb-like.png" style={{ width: '16px', height: '16px', marginRight: '-5px', zIndex: 3, borderRadius: '50%', border: '1px solid white' }} alt="like" />
                          <img src="/fb-love.png" style={{ width: '16px', height: '16px', marginRight: '-5px', zIndex: 2, borderRadius: '50%', border: '1px solid white' }} alt="love" />
                          <img src="/fb-wow.png" style={{ width: '16px', height: '16px', marginRight: '4px', zIndex: 1, borderRadius: '50%', border: '1px solid white' }} alt="wow" />
                        </div>
                        <span style={{ color: '#65676b', fontSize: '11px' }}>67</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Another reply */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '8px',
                  marginLeft: '32px'
                }}>
                  <img 
                    src="/larissa-alves.jpg"
                    alt="Larissa Alves"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      background: '#f0f2f5',
                      borderRadius: '16px',
                      padding: '8px 12px',
                      display: 'inline-block',
                      maxWidth: '100%'
                    }}>
                      <div style={{
                        fontWeight: '600',
                        fontSize: '13px',
                        marginBottom: '2px'
                      }}>
                        Larissa Alves
                      </div>
                      <div style={{
                        fontSize: isMobile ? '14px' : '15px',
                        lineHeight: '1.4'
                      }}>
                        Eu comecei sem experiência e hoje ganho R$ 7.000! Vale muito a pena 🚀
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      marginTop: '4px',
                      marginLeft: '12px',
                      fontSize: '12px',
                      color: '#65676b'
                    }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1877f2', fontWeight: '600', padding: 0 }}>Curtir</button>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Responder</button>
                      <span>1h</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px', position: 'relative' }}>
                          <img src="/fb-like.png" style={{ width: '16px', height: '16px', marginRight: '-5px', zIndex: 3, borderRadius: '50%', border: '1px solid white' }} alt="like" />
                          <img src="/fb-love.png" style={{ width: '16px', height: '16px', marginRight: '-5px', zIndex: 2, borderRadius: '50%', border: '1px solid white' }} alt="love" />
                          <img src="/fb-wow.png" style={{ width: '16px', height: '16px', marginRight: '4px', zIndex: 1, borderRadius: '50%', border: '1px solid white' }} alt="wow" />
                        </div>
                        <span style={{ color: '#65676b', fontSize: '11px' }}>234</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* View more comments link */}
            <button style={{
              background: 'none',
              border: 'none',
              color: '#65676b',
              fontSize: isMobile ? '14px' : '15px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: '8px 0',
              marginBottom: '8px'
            }}>
              Ver mais comentários
            </button>
          </div>

          {/* Comment Input */}
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#e4e6eb',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="#65676b">
                <path d="M10 10a3 3 0 100-6 3 3 0 000 6zm0 1.5c-4.5 0-8 2.5-8 5.5v1h16v-1c0-3-3.5-5.5-8-5.5z"/>
              </svg>
            </div>
            <div style={{
              flex: 1,
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Escreva um comentário..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 60px 8px 12px',
                  background: '#f0f2f5',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: isMobile ? '14px' : '15px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{
                position: 'absolute',
                right: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                gap: '2px'
              }}>
                <button style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                  <span style={{ fontSize: '18px' }}>😊</span>
                </button>
                <button style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#65676b">
                    <path d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" stroke="#65676b" strokeWidth="2" fill="none"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}