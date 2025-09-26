import fundoImg from '@assets/fundo_1758886315966.png';

export default function App() {
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: '10px 15px',
        zIndex: 3,
        borderBottom: '1px solid rgba(255, 0, 0, 0.3)',
      }}>
        <p style={{
          fontSize: '13px',
          color: '#ffffff',
          margin: 0,
          textAlign: 'center',
          letterSpacing: '0.5px',
        }}>
          ACESSE AGORA O <span style={{ color: '#FF0000', fontWeight: 'bold' }}>GRUPO SECRETO</span> DAS CASADAS DA SUA REGIÃO.
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
        
        {/* Título principal */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#ffffff',
          lineHeight: '1.3',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)',
          marginBottom: '30px'
        }}>
          ELAS NÃO QUEREM <span style={{ color: '#FF0000' }}>MARIDO</span>...
          <br />
          QUEREM <span style={{ color: '#FF0000' }}>APENAS DIVERSÃO</span>.
        </h1>
        
      </div>
    </div>
  );
}