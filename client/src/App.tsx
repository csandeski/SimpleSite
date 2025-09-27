import { useState, useEffect } from 'react';
import fundoImg from '@assets/fundo_1758886315966.png';

export default function App() {
  const [userCity, setUserCity] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    // Função para obter a cidade através de reverse geocoding
    const getCityFromCoords = async (latitude: number, longitude: number) => {
      try {
        // Usando Nominatim (OpenStreetMap) para reverse geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'pt-BR,pt;q=0.9',
            }
          }
        );
        
        if (!response.ok) throw new Error('Erro ao buscar localização');
        
        const data = await response.json();
        
        // Prioridade: city > town > municipality > village > suburb
        const city = data.address?.city || 
                    data.address?.town || 
                    data.address?.municipality ||
                    data.address?.village ||
                    data.address?.suburb ||
                    data.address?.county ||
                    null;
        
        if (city) {
          setUserCity(city);
        }
      } catch (error) {
        console.error('Erro no reverse geocoding:', error);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    // Tentar obter localização do usuário
    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          // Sucesso
          (position) => {
            getCityFromCoords(position.coords.latitude, position.coords.longitude);
          },
          // Erro ou negação de permissão
          (error) => {
            console.error('Erro ao obter localização:', error);
            setIsLoadingLocation(false);
          },
          // Opções
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000 // Cache de 5 minutos
          }
        );
      } else {
        // Navegador não suporta geolocalização
        setIsLoadingLocation(false);
      }
    };

    getLocation();
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
      }}>
        
        {/* Título principal em 2 linhas */}
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#ffffff',
          lineHeight: '1.3',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)',
          marginBottom: '20px',
          marginTop: '20px'
        }}>
          <div>ELAS NÃO QUEREM <span style={{ color: '#FF0000' }}>MARIDO</span>...</div>
          <div>QUEREM <span style={{ color: '#FF0000' }}>APENAS DIVERSÃO</span>.</div>
        </h1>
        
        {/* Descrição com cidade dinâmica */}
        <p style={{
          fontSize: '16px',
          color: '#ffffff',
          lineHeight: '1.5',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          marginBottom: '30px',
          padding: '0 10px',
          minHeight: '48px'
        }}>
          {isLoadingLocation ? (
            <span style={{ opacity: 0.7 }}>Localizando...</span>
          ) : userCity ? (
            <>
              Clique no vídeo para liberar sua vaga no grupo das casadas safadas{' '}
              <span style={{ 
                color: '#FFD700', 
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '18px'
              }}>
                de {userCity}
              </span>
              !
            </>
          ) : (
            'Clique no vídeo para liberar sua vaga no grupo das casadas safadas da sua região!'
          )}
        </p>
        
      </div>
    </div>
  );
}