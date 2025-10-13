import { useState, useEffect } from 'react';

export default function App() {
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
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

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)',
      padding: isMobile ? '0' : '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Facebook Card Container */}
      <div style={{
        width: '100%',
        maxWidth: isMobile ? '100%' : '680px',
        minHeight: isMobile ? '100vh' : 'auto',
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
                fontSize: '15px',
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

        {/* Video Mockup Area */}
        <div style={{
          position: 'relative',
          background: '#000',
          aspectRatio: '16/9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          {/* Play Button Overlay */}
          <div style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            background: 'rgba(23, 119, 242, 0.9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          
          {/* Video Thumbnail Placeholder */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            opacity: 0.3
          }}/>
          
          {/* Video Duration */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '12px',
            color: 'white',
            fontWeight: '500'
          }}>
            3:45
          </div>
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
                marginRight: '6px'
              }}>
                {/* Like Icon */}
                <div style={{
                  width: '18px',
                  height: '18px',
                  background: '#1877f2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid white',
                  marginRight: '-4px',
                  zIndex: 3
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                {/* Love Icon */}
                <div style={{
                  width: '18px',
                  height: '18px',
                  background: '#f02849',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid white',
                  marginRight: '-4px',
                  zIndex: 2
                }}>
                  <span style={{ fontSize: '10px' }}>❤️</span>
                </div>
                {/* Wow Icon */}
                <div style={{
                  width: '18px',
                  height: '18px',
                  background: '#f7b125',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid white',
                  zIndex: 1
                }}>
                  <span style={{ fontSize: '10px' }}>😮</span>
                </div>
              </div>
              <span style={{
                fontSize: '15px',
                color: '#65676b'
              }}>
                {(reactions.likes + reactions.loves + reactions.wows).toLocaleString()}
              </span>
            </div>

            {/* Comments and Shares */}
            <div style={{
              display: 'flex',
              gap: '16px',
              fontSize: '15px',
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
              fontSize: '15px'
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
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                MS
              </div>
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
                    fontSize: '15px',
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
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Curtir</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#65676b', fontWeight: '600', padding: 0 }}>Responder</button>
                  <span>15 min</span>
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                PC
              </div>
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
                    Pedro Costa
                  </div>
                  <div style={{
                    fontSize: '15px',
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
                </div>
              </div>
            </div>

            {/* Comment 3 with reply */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#333',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                AL
              </div>
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
                    Ana Lima
                  </div>
                  <div style={{
                    fontSize: '15px',
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
                        fontSize: '15px',
                        lineHeight: '1.4'
                      }}>
                        <span style={{ color: '#1877f2', fontWeight: '600' }}>@Ana Lima</span> Clique no vídeo para assistir a apresentação completa! 😊
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
                      <span>45 min</span>
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
              fontSize: '15px',
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
              background: 'linear-gradient(135deg, #00d2ff 0%, #3a47d5 100%)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              VC
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
                  fontSize: '15px',
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
  );
}