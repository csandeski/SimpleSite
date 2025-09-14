import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, QrCode, Loader2, CheckCircle, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

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
  const [isPolling, setIsPolling] = useState(true);
  const { toast } = useToast();

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
    <main className="min-h-screen bg-[hsl(var(--color-bg))] flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
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

            {/* Total */}
            <div className="mt-4 text-center">
              <p className="text-sm text-[hsl(var(--color-subtle))]">Valor Total:</p>
              <p className="text-2xl font-bold text-[hsl(var(--color-primary))]" data-testid="text-total-amount">
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}