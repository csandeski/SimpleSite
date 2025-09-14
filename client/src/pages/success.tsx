import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function Success() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-success-title">
              Pagamento Confirmado!
            </h1>
            <p className="text-gray-600" data-testid="text-success-message">
              Parabéns! Sua compra foi realizada com sucesso.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h2 className="font-semibold text-gray-900">O que acontece agora?</h2>
            <div className="text-sm text-gray-600 space-y-3 text-left">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Acesso enviado por email</p>
                  <p className="text-xs">Você receberá em breve o email com as instruções de acesso ao curso.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Grupo exclusivo no WhatsApp</p>
                  <p className="text-xs">O link para entrar no grupo será enviado junto com o email de confirmação.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Importante:</strong> Verifique sua caixa de spam caso não receba o email em até 10 minutos.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full" data-testid="button-home">
                Voltar ao Início
              </Button>
            </Link>
            
            <a 
              href="mailto:suporte@crochesvip.com.br"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
              data-testid="link-support"
            >
              Precisa de ajuda? Entre em contato
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}