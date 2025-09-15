import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Mail, ArrowRight, Heart } from "lucide-react";
import { useLocation, useSearch } from "wouter";

// Import images
import instructorImg from "@assets/imgi_20_3279038_1_175616576468acf684670db711360838_1757863401611.png";
import logoImg from "@assets/imgi_22_3279038_1_175616576468acf6846826a252308403_1757863401610.png";

export default function Obrigado() {
  const [, setLocation] = useLocation();
  const searchParams = useSearch();
  
  // Parse URL parameters
  const params = new URLSearchParams(searchParams);
  const amount = params.get('amount') ? parseFloat(params.get('amount')!) : 29.90;
  const transactionId = params.get('transactionId') || 'unknown';

  // Scroll to top and track purchase event
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fire Facebook Pixel Purchase event with actual transaction data
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: amount,
        currency: 'BRL',
        content_ids: ['course_main'],
        content_type: 'product',
        content_name: 'Coleção Crochês que Mais Vendem',
        num_items: 1,
        order_id: transactionId
      });
      
      console.log('Facebook Pixel Purchase event fired:', {
        value: amount,
        currency: 'BRL',
        order_id: transactionId
      });
    }
  }, [amount, transactionId]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[hsl(var(--color-bg))] to-[hsl(var(--color-bg-secondary))]">
      {/* Logo Header */}
      <div className="w-full py-4 px-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-center">
          <img 
            src={logoImg} 
            alt="Logo" 
            className="h-12 object-contain"
            data-testid="img-logo-header"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Success Animation */}
        <div className="flex justify-center mb-8 animate-bounce-slow">
          <div className="relative">
            <CheckCircle2 className="w-24 h-24 md:w-32 md:h-32 text-green-500" />
            <div className="absolute inset-0 animate-ping">
              <CheckCircle2 className="w-24 h-24 md:w-32 md:h-32 text-green-500 opacity-30" />
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardContent className="p-0">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-secondary))] text-white p-6 md:p-10 text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-thank-you-title">
                Parabéns pela sua compra! 🎉
              </h1>
              <p className="text-lg md:text-xl opacity-95" data-testid="text-welcome-message">
                Bem-vinda à família Crochês que Mais Vendem!
              </p>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10">
              {/* Instructor Welcome */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <img 
                  src={instructorImg} 
                  alt="Claudete Oliveira" 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg"
                  data-testid="img-instructor"
                />
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2" data-testid="text-instructor-name">
                    Claudete Oliveira
                  </h2>
                  <p className="text-gray-600" data-testid="text-instructor-message">
                    "Estou muito feliz em ter você como minha aluna! Prepare-se para uma jornada incrível no mundo do crochê."
                  </p>
                </div>
              </div>

              {/* Email Notice */}
              <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white p-3 rounded-full">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2" data-testid="text-email-title">
                      📧 Verifique seu Email!
                    </h3>
                    <p className="text-gray-700 mb-3" data-testid="text-email-instructions">
                      <strong>Seus dados de acesso foram enviados para o email cadastrado.</strong>
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <p className="text-sm text-gray-600 mb-2" data-testid="text-email-tips">
                        <strong>Não encontrou o email?</strong> Verifique:
                      </p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li data-testid="text-spam-check">• A pasta de <strong>spam</strong> ou <strong>promoções</strong></li>
                        <li data-testid="text-email-correct">• Se o email cadastrado está correto</li>
                        <li data-testid="text-wait-time">• Aguarde até 10 minutos para a entrega</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2" data-testid="text-next-steps-title">
                  <ArrowRight className="w-5 h-5 text-green-600" />
                  Próximos Passos
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-gray-700" data-testid="text-step-1">
                      <strong>Acesse seu email</strong> e clique no link de acesso à plataforma
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-gray-700" data-testid="text-step-2">
                      <strong>Crie sua senha</strong> de acesso na primeira vez que entrar
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-gray-700" data-testid="text-step-3">
                      <strong>Entre no grupo VIP do WhatsApp</strong> para tirar dúvidas e compartilhar suas criações
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      4
                    </div>
                    <p className="text-gray-700" data-testid="text-step-4">
                      <strong>Comece pelo módulo básico</strong> se você é iniciante, ou vá direto para as peças avançadas
                    </p>
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div className="bg-amber-50 rounded-xl p-6 mb-8 border border-amber-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3" data-testid="text-support-title">
                  💬 Precisa de Ajuda?
                </h3>
                <p className="text-gray-700 mb-4" data-testid="text-support-description">
                  Nossa equipe está pronta para te ajudar! Se tiver qualquer dúvida ou problema com o acesso:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p data-testid="text-support-email">
                    <strong>Email de suporte:</strong> suporte@crochesvitalicios.com.br
                  </p>
                  <p data-testid="text-support-response">
                    <strong>Tempo de resposta:</strong> Até 24 horas úteis
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 text-lg shadow-lg transform hover:scale-105 transition-all"
                  data-testid="button-whatsapp-group"
                >
                  <svg 
                    className="w-6 h-6 mr-2" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Entrar no Grupo VIP
                </Button>
                <Button 
                  onClick={() => setLocation('/')}
                  variant="outline"
                  className="font-bold py-6 px-8 text-lg border-2 hover:bg-gray-50"
                  data-testid="button-back-home"
                >
                  Voltar ao Início
                </Button>
              </div>

              {/* Motivational Footer */}
              <div className="text-center mt-10 pt-8 border-t border-gray-200">
                <div className="flex justify-center mb-4">
                  <Heart className="w-8 h-8 text-red-500 animate-pulse" />
                </div>
                <p className="text-gray-600 italic" data-testid="text-motivational">
                  "O crochê é mais que uma arte, é uma forma de expressar amor em cada ponto. 
                  Sua jornada de sucesso começa agora!"
                </p>
                <p className="text-sm text-gray-500 mt-4" data-testid="text-footer">
                  © 2025 Coleção Crochês que Mais Vendem - Todos os direitos reservados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}