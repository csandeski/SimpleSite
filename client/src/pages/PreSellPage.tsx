import { useLocation } from 'wouter';
import sexyLogo from '@assets/123123_1758969742043.png';
import blurredBg from '@assets/spdexpebofal7eo3wog800wssw0gg4k.r300x600.gCenter.c4c29140b4094c23306128ad1c2d1a0b_1758970676857.jpg';

export default function PreSellPage() {
  const [, setLocation] = useLocation();

  const handleEnterGroup = () => {
    setLocation('/home');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Blurred background image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${blurredBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(8px)',
        transform: 'scale(1.1)'
      }} />
      
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(139,0,0,0.8) 100%)'
      }} />
      
      {/* Content container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        padding: '20px',
        paddingTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        {/* Logo */}
        <img
          src={sexyLogo}
          alt="SEXY PREMIUM"
          style={{
            width: '150px',
            height: 'auto',
            marginBottom: '30px'
          }}
          data-testid="img-logo"
        />
        
        {/* Progress bar - 100% */}
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '5px',
          marginBottom: '50px',
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #CC0000 0%, #FF0000 100%)',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
            transition: 'width 0.3s ease'
          }}
            data-testid="progress-bar-100"
          />
        </div>
        
        {/* Fire icon with text */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px 20px',
          marginBottom: '40px',
          border: '2px solid rgba(255, 0, 0, 0.5)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '20px',
            animation: 'pulse 1s infinite',
            filter: 'drop-shadow(0 0 20px rgba(255, 69, 0, 0.8))'
          }}
            data-testid="icon-fire"
          >
            🔥
          </div>
          
          <p style={{
            fontSize: '20px',
            color: '#FFFFFF',
            fontWeight: 'bold',
            lineHeight: '1.4',
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.9)',
            margin: 0
          }}
            data-testid="text-click-enter-group"
          >
            CLIQUE E ENTRE NO GRUPO PARA SABER QUEM ESTÁ PERTO DE VOCÊ
          </p>
        </div>
        
        {/* Enter group button */}
        <button
          onClick={handleEnterGroup}
          style={{
            display: 'inline-block',
            padding: '22px 50px',
            fontSize: '20px',
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
            letterSpacing: '1px',
            textTransform: 'uppercase',
            animation: 'scaleUpDown 2s ease-in-out infinite'
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
          data-testid="button-enter-group"
        >
          ENTRAR NO GRUPO
        </button>
      </div>
      
      {/* Add animation keyframes */}
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes scaleUpDown {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}