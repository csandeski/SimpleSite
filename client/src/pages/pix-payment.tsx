import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, QrCode, Loader2, CheckCircle, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Transaction {
  id: string;
  status: string;
  amount: number;
  pixPayload: string;
  pixQrCode: string;
  createdAt: string;
  expiresAt?: string;
}

export default function PixPayment() {
  const { transactionId } = useParams();
  const [, setLocation] = useLocation();
  const [timeLeft, setTimeLeft] = useState(516); // 8:36 in seconds
  const [isPolling, setIsPolling] = useState(true);
  const { toast } = useToast();

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time for display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Query to get transaction details
  const { data: transactionData, isLoading, error } = useQuery<{ transaction: Transaction }>({
    queryKey: [`/api/pix/transaction/${transactionId}`],
    enabled: !!transactionId,
    refetchInterval: isPolling ? 3000 : false, // Poll every 3 seconds
  });

  const transaction = transactionData?.transaction;

  // Watch for payment confirmation
  useEffect(() => {
    const status = transaction?.status;
    // Accept multiple success statuses
    if (status === "AUTHORIZED" || status === "PAID" || status === "APPROVED") {
      setIsPolling(false);
      
      toast({
        title: "Pagamento Confirmado! ✅",
        description: "Seu pagamento foi processado com sucesso. Você receberá o acesso por email.",
      });

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        setLocation("/success");
      }, 2000);
    }
  }, [transaction?.status, setLocation, toast]);

  // Copy PIX code to clipboard
  const copyPixCode = () => {
    if (transaction?.pixPayload) {
      navigator.clipboard.writeText(transaction.pixPayload);
      toast({
        title: "Código PIX copiado!",
        description: "Cole o código no app do seu banco para pagar.",
      });
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Aguardando Pagamento
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Processando
          </Badge>
        );
      case "AUTHORIZED":
      case "PAID":
      case "APPROVED":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Pago
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            {status}
          </Badge>
        );
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[hsl(var(--color-bg))] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[hsl(var(--color-primary))]" />
          <p className="text-lg text-[hsl(var(--color-text))]">Carregando informações do pagamento...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !transaction) {
    return (
      <main className="min-h-screen bg-[hsl(var(--color-bg))]">
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-bold mb-4 text-[hsl(var(--color-text))]">
                Erro ao carregar pagamento
              </h2>
              <p className="text-[hsl(var(--color-subtle))] mb-6">
                Não foi possível carregar as informações do pagamento. Por favor, tente novamente.
              </p>
              <Button onClick={() => setLocation("/checkout")} data-testid="button-back-checkout">
                Voltar ao Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--color-bg))] py-8">
      {/* Main PIX Payment Content */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - PIX Payment */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-300 bg-white">
              <CardContent className="p-6">
                {/* PIX Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-[hsl(var(--color-text))]" data-testid="text-pix-title">
                    Pague com PIX
                  </h2>
                  <p className="text-[hsl(var(--color-subtle))]">
                    Escaneie o QR Code ou copie o código para pagar
                  </p>
                </div>

                {/* QR Code */}
                <div className="bg-gray-50 p-8 rounded-lg mb-6">
                  <div className="max-w-sm mx-auto">
                    {transaction.pixQrCode ? (
                      <img 
                        src={transaction.pixQrCode}
                        alt="QR Code PIX"
                        className="w-full h-auto"
                        data-testid="image-qr-code"
                      />
                    ) : (
                      <div className="aspect-square bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <QrCode className="w-32 h-32 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* PIX Code */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-[hsl(var(--color-text))] mb-2 block">
                      Código PIX Copia e Cola
                    </label>
                    <div className="relative">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 pr-12 font-mono text-xs break-all" data-testid="text-pix-code">
                        {transaction.pixPayload || "Carregando código PIX..."}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-2"
                        onClick={copyPixCode}
                        data-testid="button-copy-pix"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Copy Button */}
                <Button
                  size="lg"
                  className="w-full bg-black hover:bg-gray-900 text-white font-bold"
                  onClick={copyPixCode}
                  data-testid="button-copy-pix-main"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  Copiar Código PIX
                </Button>

                {/* Instructions */}
                <div className="mt-6 space-y-3">
                  <h3 className="font-semibold text-[hsl(var(--color-text))]">Como pagar:</h3>
                  <ol className="space-y-2 text-sm text-[hsl(var(--color-subtle))]">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">1.</span>
                      <span>Abra o app do seu banco ou carteira digital</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">2.</span>
                      <span>Escolha pagar via PIX</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">3.</span>
                      <span>Escaneie o QR Code ou copie e cole o código PIX</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">4.</span>
                      <span>Confirme o pagamento</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">5.</span>
                      <span>Pronto! Você receberá o acesso por email</span>
                    </li>
                  </ol>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        Pagamento 100% Seguro
                      </p>
                      <p className="text-xs text-blue-700">
                        Seus dados estão protegidos e a transação é processada com total segurança através do PIX, 
                        o sistema de pagamentos instantâneos do Banco Central.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[hsl(var(--color-text))]">
                      Status do Pagamento:
                    </span>
                    {getStatusBadge(transaction.status)}
                  </div>
                  {transaction.status === "PENDING" && (
                    <p className="text-xs text-[hsl(var(--color-subtle))] mt-2">
                      Aguardando confirmação do pagamento. Esta página será atualizada automaticamente.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-300 bg-white sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 text-[hsl(var(--color-text))]" data-testid="text-summary-title">
                  Resumo do Pedido
                </h3>

                {/* Transaction Details */}
                <div className="space-y-3 pb-4 border-b border-[hsl(var(--color-border))]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--color-subtle))]">ID da Transação:</span>
                    <span className="font-mono text-xs" data-testid="text-transaction-id">
                      {transaction.id.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--color-subtle))]">Data:</span>
                    <span data-testid="text-transaction-date">
                      {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(var(--color-subtle))]">Hora:</span>
                    <span data-testid="text-transaction-time">
                      {new Date(transaction.createdAt).toLocaleTimeString("pt-BR")}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-[hsl(var(--color-text))]">Total:</span>
                    <span className="text-2xl font-bold text-[hsl(var(--color-primary))]" data-testid="text-total-amount">
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                </div>

                {/* Help */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-[hsl(var(--color-subtle))]">
                    <strong>Precisa de ajuda?</strong><br />
                    Entre em contato pelo WhatsApp:<br />
                    <a href="https://wa.me/5511999999999" className="text-[hsl(var(--color-primary))] hover:underline">
                      (11) 99999-9999
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}