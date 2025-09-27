import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

// Import das imagens fornecidas
import img1 from '@assets/spdexpebofal7eo3wog800wssw0gg4k.r300x600.gCenter.c4c29140b4094c23306128ad1c2d1a0b_1758968152472.jpg';
import img2 from '@assets/spdexp2hx3d8j2jikgosk88o04sws8c.r300x600.gCenter.1a39b309bb6e294ef63f1beeb4883481_1758968152473.jpg';
import img3 from '@assets/spdexp3chjzxy03dicg84cccwc8sgsk.r300x600.gCenter.f7d3bf1f257409ba4e30f12ba6cda919_1758968152473.jpg';
import img4 from '@assets/spdexp3qiloznib0w0cgck0gwwwwcg8.r300x600.gCenter.7e1f146c635ea199c41a60453af0b0a1_1758968152473.jpg';
import img5 from '@assets/spdexp5ibqj5sfto0sw004k8k0ogsg0.r300x600.gCenter.e34511c00bcb166e82fbc64a34baaf79_1758968152474.jpg';
import img6 from '@assets/spdexp7su2nlahsykgg0g8og4k4gkks.r300x600.gCenter.ebfbd3c6fc70b5da5d7fc5750f0517cf_1758968152474.jpg';
import img7 from '@assets/spdexp644v2rmpihoggwoc0o40ocoww.r300x600.gCenter.197ffc158329553d1042da9df9ff7892_1758968152474.jpg';
import img8 from '@assets/spdexpa2t0l397emg484kgkk08skccg.r300x600.gCenter.888f5bf95410c3fc5af69ebc004513fe_1758968152474.jpg';
import img9 from '@assets/spdexpadf2cvksw6gocggw8ckkc4wco.r300x600.gCenter.69bd2f45182bd2e9cfb385d9f6930ebc_1758968152475.jpg';
import img10 from '@assets/spdexpblbgnpvsoxkw0s00oo0okog40.r300x600.gCenter.7f2e70918b64751fb781d152a4116633_1758968152475.jpg';
import img11 from '@assets/spdexpbx0ncxyud80s04ks4cgkckwco.r300x600.gCenter.59f17c71f447b3f2383bcfc813b05d96_1758968152475.jpg';
import img12 from '@assets/spdexpccnb58qhrtsg0o88go84kksw8.r300x600.gCenter.53b3b56174eebac222096b23576e8edd_1758968152475.jpg';
import img13 from '@assets/spdexpcubkzd5c2lcg0o448o0os4g48.r300x600.gCenter.6ba57bd8c0cfd8306fd170652fc94e3c_1758968152476.jpg';
import img14 from '@assets/spdexpd81p0qn9fk84kwgoks8co4w4c.r300x600.gCenter.5db384b664ad16f5057607f9ee5469b1_1758968152476.jpg';

interface Profile {
  id: number;
  name: string;
  age: number;
  city: string;
  photo: string;
  bio: string;
}

const profiles: Profile[] = [
  { id: 1, name: "Juliana", age: 28, city: "São Paulo", photo: img1, bio: "Casada carente buscando aventuras 🔥" },
  { id: 2, name: "Amanda", age: 32, city: "Rio de Janeiro", photo: img2, bio: "Marido viaja muito... preciso de companhia 😈" },
  { id: 3, name: "Patricia", age: 29, city: "Belo Horizonte", photo: img3, bio: "Adoro provocar homens casados 💋" },
  { id: 4, name: "Fernanda", age: 35, city: "Curitiba", photo: img4, bio: "Procuro sigilo e prazer sem compromisso" },
  { id: 5, name: "Carolina", age: 31, city: "Porto Alegre", photo: img5, bio: "Louca por sexo e aventuras proibidas 🍑" },
  { id: 6, name: "Beatriz", age: 27, city: "Salvador", photo: img6, bio: "Quero realizar suas fantasias mais safadas" },
  { id: 7, name: "Rafaela", age: 33, city: "Fortaleza", photo: img7, bio: "Casada mas livre para brincar 🔥" },
  { id: 8, name: "Mariana", age: 30, city: "Recife", photo: img8, bio: "Te espero hoje à noite... vem? 💦" },
  { id: 9, name: "Isabela", age: 34, city: "Brasília", photo: img9, bio: "Adoro homens que sabem o que querem" },
  { id: 10, name: "Gabriela", age: 26, city: "Manaus", photo: img10, bio: "Safada e sem limites para prazer 😈" },
  { id: 11, name: "Larissa", age: 29, city: "Goiânia", photo: img11, bio: "Casada mas o marido não me satisfaz" },
  { id: 12, name: "Letícia", age: 31, city: "Campinas", photo: img12, bio: "Quero sexo selvagem agora! 🔥" },
  { id: 13, name: "Natália", age: 28, city: "Santos", photo: img13, bio: "Procuro homem para me fazer mulher" },
  { id: 14, name: "Vanessa", age: 32, city: "Vitória", photo: img14, bio: "Disponível 24h para suas fantasias 💋" },
];

export default function TinderPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interactions, setInteractions] = useState(0);
  const [showBlock, setShowBlock] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [, setLocation] = useLocation();
  const [userCity, setUserCity] = useState<string | null>(null);

  useEffect(() => {
    // Obter cidade do usuário
    fetch('/api/location')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.city) {
          setUserCity(data.city);
        }
      })
      .catch(console.error);
  }, []);

  const handleAction = (action: 'accept' | 'decline') => {
    const newInteractions = interactions + 1;
    setInteractions(newInteractions);
    
    if (newInteractions >= 3) {
      setShowBlock(true);
    } else {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    }
    
    // Reset drag
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setDragOffset(e.clientX - dragStart);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      setDragOffset(e.touches[0].clientX - dragStart);
    }
  };

  const handleMouseUp = () => {
    if (Math.abs(dragOffset) > 100) {
      handleAction(dragOffset > 0 ? 'accept' : 'decline');
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragOffset) > 100) {
      handleAction(dragOffset > 0 ? 'accept' : 'decline');
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const currentProfile = profiles[currentIndex];

  if (showBlock) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '20px',
          padding: '40px 30px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(255, 0, 0, 0.3)',
          border: '2px solid rgba(255, 0, 0, 0.5)'
        }}>
          <div style={{
            fontSize: '50px',
            marginBottom: '20px',
            animation: 'pulse 1.5s infinite'
          }}>
            🔒
          </div>
          
          <h2 style={{
            fontSize: '24px',
            color: '#FFFFFF',
            marginBottom: '20px',
            fontWeight: 'bold',
            lineHeight: '1.3'
          }}>
            👉 Para ver todas as mulheres da sua cidade, Crie sua Conta Agora!
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#FFD700',
            marginBottom: '30px'
          }}>
            {userCity ? `Mais de 47 mulheres online em ${userCity} esperando por você!` : 'Dezenas de mulheres online na sua região!'}
          </p>
          
          <button
            onClick={() => window.open('https://af.sejalinked.fun?utm_source=FB&utm_campaign={{campaign.name}}|{{campaign.id}}&utm_medium={{adset.name}}|{{adset.id}}&utm_content={{ad.name}}|{{ad.id}}&utm_term={{placement}}', '_blank')}
            style={{
              width: '100%',
              padding: '18px',
              background: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
              border: 'none',
              borderRadius: '50px',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(255, 0, 0, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              animation: 'scaleUpDown 2s infinite'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ENTRAR AGORA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%)',
      padding: '20px',
      paddingTop: '60px',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        padding: '15px',
        zIndex: 10,
        borderBottom: '2px solid rgba(255, 0, 0, 0.3)'
      }}>
        <h1 style={{
          fontSize: '16px',
          color: '#FFFFFF',
          textAlign: 'center',
          margin: 0,
          fontWeight: 'bold'
        }}>
          Tem Mulheres Querendo o SEU PAU agora! 🍆🔥 Qual você escolhe?
        </h1>
      </div>

      {/* Contador */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(255, 0, 0, 0.2)',
          padding: '8px 16px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 0, 0, 0.4)'
        }}>
          <span style={{
            color: '#FFD700',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            🔥 23 mulheres online na sua região AGORA
          </span>
        </div>
      </div>

      {/* Card Container */}
      <div style={{
        maxWidth: '380px',
        margin: '0 auto',
        position: 'relative',
        height: '500px'
      }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#FFFFFF',
            borderRadius: '15px',
            overflow: 'hidden',
            position: 'absolute',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            cursor: isDragging ? 'grabbing' : 'grab',
            transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`,
            transition: isDragging ? 'none' : 'all 0.3s ease',
            opacity: Math.abs(dragOffset) > 100 ? 0.5 : 1
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Indicadores de ação */}
          {dragOffset > 50 && (
            <div style={{
              position: 'absolute',
              top: '50px',
              left: '20px',
              transform: 'rotate(-30deg)',
              zIndex: 10
            }}>
              <div style={{
                fontSize: '60px',
                color: '#00FF00',
                fontWeight: 'bold',
                textShadow: '0 0 20px rgba(0, 255, 0, 0.8)'
              }}>
                ❤️ GOSTEI
              </div>
            </div>
          )}
          
          {dragOffset < -50 && (
            <div style={{
              position: 'absolute',
              top: '50px',
              right: '20px',
              transform: 'rotate(30deg)',
              zIndex: 10
            }}>
              <div style={{
                fontSize: '60px',
                color: '#FF0000',
                fontWeight: 'bold',
                textShadow: '0 0 20px rgba(255, 0, 0, 0.8)'
              }}>
                ❌ PRÓXIMA
              </div>
            </div>
          )}

          {/* Foto */}
          <div style={{
            width: '100%',
            height: '70%',
            backgroundImage: `url(${currentProfile.photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          
          {/* Info */}
          <div style={{
            padding: '15px',
            background: '#FFFFFF',
            height: '30%'
          }}>
            <h3 style={{
              fontSize: '22px',
              margin: 0,
              color: '#333',
              fontWeight: 'bold'
            }}>
              {currentProfile.name}, {currentProfile.age}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#666',
              margin: '5px 0'
            }}>
              📍 {userCity || currentProfile.city}
            </p>
            <p style={{
              fontSize: '15px',
              color: '#444',
              margin: '10px 0 0 0',
              fontStyle: 'italic'
            }}>
              "{currentProfile.bio}"
            </p>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
        marginTop: '30px'
      }}>
        <button
          onClick={() => handleAction('decline')}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '3px solid #FF0000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
          }}
        >
          <span style={{ fontSize: '35px', color: '#FF0000' }}>❌</span>
        </button>
        
        <button
          onClick={() => handleAction('accept')}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '3px solid #00FF00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
          }}
        >
          <span style={{ fontSize: '35px', color: '#00FF00' }}>❤️</span>
        </button>
      </div>
    </div>
  );
}