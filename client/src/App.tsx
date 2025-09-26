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
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Overlay escuro */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}
      />
      
      {/* Conteúdo */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center',
      }}>
        
        {/* Texto superior */}
        <p style={{
          fontSize: '14px',
          color: '#ffffff',
          marginBottom: '20px',
          marginTop: '10px',
          letterSpacing: '0.5px',
          lineHeight: '1.4'
        }}>
          ACESSE AGORA O <span style={{ color: '#FF0000', fontWeight: 'bold' }}>GRUPO SECRETO</span>
          <br />
          DAS CASADAS DA SUA REGIÃO.
        </p>
        
        {/* Título principal */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '30px',
          lineHeight: '1.2',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
        }}>
          ELAS NÃO QUEREM <span style={{ color: '#FF0000' }}>MARIDO</span>...
          <br />
          QUEREM <span style={{ color: '#FF0000' }}>APENAS DIVERSÃO</span>.
        </h1>
        
        {/* Container do vídeo */}
        <div style={{
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          aspectRatio: '9/16',
          backgroundColor: '#000000',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)'
        }}>
          {/* Área do vídeo - placeholder preto */}
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Você pode adicionar um iframe de vídeo aqui se necessário */}
          </div>
        </div>
        
      </div>
    </div>
  );
}