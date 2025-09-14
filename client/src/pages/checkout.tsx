import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Shield, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Import images
import bannerImg from "@assets/image_1757886558330.png";
import instructorImg from "@assets/imgi_20_3279038_1_175616576468acf684670db711360838_1757863401611.png";

// Form validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone é obrigatório"),
  document: z.string().min(11, "CPF/CNPJ é obrigatório"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [timeLeft, setTimeLeft] = useState(516); // 8:36 in seconds
  const [upsells, setUpsells] = useState({
    calculoFios: false,
    acabamentos: false,
    primaveraVerao: false,
  });
  const [expandedUpsells, setExpandedUpsells] = useState({
    calculoFios: false,
    acabamentos: false,
    primaveraVerao: false,
  });
  const { toast } = useToast();

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      document: "",
    },
  });

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

  // Calculate total price
  const calculateTotal = () => {
    let total = 47.00;
    if (upsells.calculoFios) total += 9.90;
    if (upsells.acabamentos) total += 17.90;
    if (upsells.primaveraVerao) total += 29.90;
    return total;
  };

  // Format document (CPF/CNPJ)
  const formatDocument = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      // CPF format: 000.000.000-00
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      // CNPJ format: 00.000.000/0000-00
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
  };

  // Format phone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const onSubmit = async (data: CheckoutForm) => {
    // Show loading toast
    toast({
      title: "Processando pagamento...",
      description: "Aguarde enquanto geramos seu PIX",
    });

    // Simulate processing
    setTimeout(() => {
      toast({
        title: "PIX Gerado!",
        description: `Total: R$ ${calculateTotal().toFixed(2).replace(".", ",")}. Você receberá o código PIX em seu email.`,
      });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--color-bg))]">
      {/* Urgency Timer Bar */}
      <div className="bg-red-600 text-white py-3 px-4 text-center sticky top-0 z-50">
        <p className="text-sm md:text-base font-bold" data-testid="text-timer-header">
          🕒 Compre em até {formatTime(timeLeft)} para não perder essa oferta
        </p>
      </div>

      {/* Hero Section with Banner */}
      <section className="relative bg-gradient-to-b from-[hsl(var(--color-muted))] to-[hsl(var(--color-bg))] py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Banner Image */}
          <div className="rounded-xl overflow-hidden mb-8 shadow-xl">
            <img 
              src={bannerImg} 
              alt="Coleção Crochês que Mais Vendem"
              className="w-full h-auto"
              data-testid="image-checkout-banner"
            />
          </div>

          {/* Hero Text */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-accent))] bg-clip-text text-transparent" data-testid="text-checkout-title">
              Coleção Crochês que Mais Vendem
            </h1>
            
            <p className="text-lg md:text-xl text-[hsl(var(--color-text))]" data-testid="text-checkout-subtitle">
              Finalize sua inscrição e
            </p>
            
            <p className="text-xl md:text-2xl font-bold text-[hsl(var(--color-text))] uppercase tracking-wide max-w-3xl mx-auto" data-testid="text-checkout-main">
              Aprenda a fazer as 5 peças de crochê mais vendidas do meu ateliê
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-[hsl(var(--color-subtle))]">
              <span className="flex items-center gap-2">
                ✓ Grupo de Alunas
              </span>
              <span className="flex items-center gap-2">
                ✓ Acesso vitalício
              </span>
              <span className="flex items-center gap-2">
                ✓ Garantia de 7 Dias
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Checkout Content */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Form */}
            <Card className="rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6 text-[hsl(var(--color-text))]" data-testid="text-form-title">
                  Informações pessoais
                </h2>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Digite seu nome completo" 
                              {...field}
                              data-testid="input-fullname"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="seu@email.com" 
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <div className="flex items-center px-3 bg-[hsl(var(--color-muted))] rounded-l-md border border-r-0 border-[hsl(var(--color-border))]">
                                <span className="text-xl">🇧🇷</span>
                                <span className="ml-2 text-sm text-[hsl(var(--color-subtle))]">+55</span>
                              </div>
                              <Input 
                                placeholder="(00) 00000-0000" 
                                {...field}
                                value={formatPhone(field.value)}
                                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                                className="rounded-l-none"
                                data-testid="input-phone"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Payment Method */}
                    <div className="pt-6 border-t border-[hsl(var(--color-border))]">
                      <h3 className="text-lg font-bold mb-4 text-[hsl(var(--color-text))]" data-testid="text-payment-title">
                        Método de pagamento
                      </h3>
                      
                      <div className="bg-[hsl(var(--color-primary))]/10 border-2 border-[hsl(var(--color-primary))] rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[hsl(var(--color-primary))] flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                          <span className="font-semibold text-[hsl(var(--color-text))]">PIX</span>
                          <Badge className="bg-green-500 text-white">Desconto aplicado</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Document Field */}
                    <FormField
                      control={form.control}
                      name="document"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Documento</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="CPF ou CNPJ" 
                              {...field}
                              value={formatDocument(field.value)}
                              onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                              maxLength={18}
                              data-testid="input-document"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Optional Upsells */}
                    <div className="pt-6 border-t border-[hsl(var(--color-border))] space-y-4">
                      {/* Upsell 1 - Cálculo dos Fios */}
                      <Collapsible
                        open={expandedUpsells.calculoFios}
                        onOpenChange={(open) => setExpandedUpsells(prev => ({ ...prev, calculoFios: open }))}
                      >
                        <CollapsibleTrigger asChild>
                          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-[hsl(var(--color-border))]" data-testid="card-upsell-calculo">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                  <Checkbox
                                    checked={upsells.calculoFios}
                                    onCheckedChange={(checked) => {
                                      setUpsells(prev => ({ ...prev, calculoFios: checked as boolean }));
                                      if (checked) {
                                        setExpandedUpsells(prev => ({ ...prev, calculoFios: true }));
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    data-testid="checkbox-upsell-calculo"
                                  />
                                  <div className="flex-1">
                                    <p className="font-bold text-sm md:text-base text-[hsl(var(--color-primary))] uppercase">
                                      SIM, EU QUERO APRENDER CÁLCULO DOS FIOS
                                    </p>
                                    <p className="text-sm text-[hsl(var(--color-subtle))] mt-1">
                                      Aulão: Cálculo de Fios Descomplicado
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="text-right">
                                    <p className="text-xs line-through text-[hsl(var(--color-subtle))]">R$ 29,90</p>
                                    <p className="text-lg font-bold text-[hsl(var(--color-primary))]">R$ 9,90</p>
                                  </div>
                                  {expandedUpsells.calculoFios ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 px-4">
                          <p className="text-sm text-[hsl(var(--color-subtle))]">
                            Aprenda a calcular exatamente a quantidade de fio necessária para suas peças, 
                            evitando desperdícios e garantindo economia em todos os seus projetos.
                          </p>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Upsell 2 - Acabamentos */}
                      <Collapsible
                        open={expandedUpsells.acabamentos}
                        onOpenChange={(open) => setExpandedUpsells(prev => ({ ...prev, acabamentos: open }))}
                      >
                        <CollapsibleTrigger asChild>
                          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-[hsl(var(--color-border))]" data-testid="card-upsell-acabamentos">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                  <Checkbox
                                    checked={upsells.acabamentos}
                                    onCheckedChange={(checked) => {
                                      setUpsells(prev => ({ ...prev, acabamentos: checked as boolean }));
                                      if (checked) {
                                        setExpandedUpsells(prev => ({ ...prev, acabamentos: true }));
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    data-testid="checkbox-upsell-acabamentos"
                                  />
                                  <div className="flex-1">
                                    <p className="font-bold text-sm md:text-base text-[hsl(var(--color-primary))] uppercase">
                                      SIM, EU QUERO DOMINAR OS ACABAMENTOS
                                    </p>
                                    <p className="text-sm text-[hsl(var(--color-subtle))] mt-1">
                                      Guia Prático de Acabamentos
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="text-right">
                                    <p className="text-xs line-through text-[hsl(var(--color-subtle))]">R$ 37,90</p>
                                    <p className="text-lg font-bold text-[hsl(var(--color-primary))]">R$ 17,90</p>
                                  </div>
                                  {expandedUpsells.acabamentos ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 px-4">
                          <p className="text-sm text-[hsl(var(--color-subtle))]">
                            Técnicas profissionais de acabamento que fazem toda a diferença no resultado final. 
                            Suas peças terão aquele toque especial que as tornam irresistíveis.
                          </p>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Upsell 3 - Primavera Verão */}
                      <Collapsible
                        open={expandedUpsells.primaveraVerao}
                        onOpenChange={(open) => setExpandedUpsells(prev => ({ ...prev, primaveraVerao: open }))}
                      >
                        <CollapsibleTrigger asChild>
                          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-[hsl(var(--color-border))] relative overflow-hidden" data-testid="card-upsell-primavera">
                            <Badge className="absolute top-2 right-2 bg-red-500 text-white">Novidade</Badge>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                  <Checkbox
                                    checked={upsells.primaveraVerao}
                                    onCheckedChange={(checked) => {
                                      setUpsells(prev => ({ ...prev, primaveraVerao: checked as boolean }));
                                      if (checked) {
                                        setExpandedUpsells(prev => ({ ...prev, primaveraVerao: true }));
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    data-testid="checkbox-upsell-primavera"
                                  />
                                  <div className="flex-1">
                                    <p className="font-bold text-sm md:text-base text-[hsl(var(--color-primary))] uppercase">
                                      SIM, EU QUERO AS PEÇAS PRIMAVERA VERÃO
                                    </p>
                                    <p className="text-sm text-[hsl(var(--color-subtle))] mt-1">
                                      Combo 5 Peças Primavera Verão
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="text-right">
                                    <p className="text-lg font-bold text-[hsl(var(--color-primary))]">R$ 29,90</p>
                                  </div>
                                  {expandedUpsells.primaveraVerao ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 px-4">
                          <p className="text-sm text-[hsl(var(--color-subtle))]">
                            Coleção exclusiva com 5 peças leves e frescas, perfeitas para a estação mais quente. 
                            Modelos que são tendência e vendem muito bem no verão.
                          </p>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-black hover:bg-gray-900 text-white font-bold text-lg py-6 shadow-lg"
                      data-testid="button-submit-payment"
                    >
                      Pagar R$ {calculateTotal().toFixed(2).replace(".", ",")}
                    </Button>

                    {/* Security Notice */}
                    <div className="flex items-center justify-center gap-2 text-sm text-[hsl(var(--color-subtle))]">
                      <Lock className="w-4 h-4" />
                      <span>Transação Segura e Criptografada</span>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Terms and Footer */}
            <div className="text-center space-y-2 text-xs text-[hsl(var(--color-subtle))]">
              <p>
                Ao realizar o pagamento, você concorda com os{" "}
                <a href="#" className="underline">Termos de Uso</a> e{" "}
                <a href="#" className="underline">Política de Privacidade</a>
              </p>
              <p>© 2025 Coleção Crochês • Todos os direitos reservados</p>
              <p className="flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Powered by Hubla
              </p>
            </div>
          </div>

          {/* Right Column - Product Summary */}
          <div className="lg:col-span-1">
            <Card className="rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] sticky top-20">
              <CardContent className="p-6">
                {/* Product Info */}
                <div className="flex gap-4 mb-6">
                  <img 
                    src={instructorImg} 
                    alt="Claudete"
                    className="w-16 h-16 rounded-lg object-cover"
                    data-testid="image-instructor-small"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-[hsl(var(--color-text))]" data-testid="text-product-name">
                      Coleção Crochês que Mais Vendem - Vitalício
                    </h3>
                    <div className="mt-2">
                      <p className="text-xs line-through text-[hsl(var(--color-subtle))]">De: R$ 250,00</p>
                      <p className="text-lg font-bold text-[hsl(var(--color-primary))]">Por: R$ 47,00</p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-[hsl(var(--color-border))] pt-4 space-y-3">
                  <h4 className="font-bold text-[hsl(var(--color-text))]">Resumo do pedido</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[hsl(var(--color-subtle))]">Curso principal</span>
                      <span className="font-medium">R$ 47,00</span>
                    </div>
                    
                    {upsells.calculoFios && (
                      <div className="flex justify-between">
                        <span className="text-[hsl(var(--color-subtle))]">Cálculo dos Fios</span>
                        <span className="font-medium">R$ 9,90</span>
                      </div>
                    )}
                    
                    {upsells.acabamentos && (
                      <div className="flex justify-between">
                        <span className="text-[hsl(var(--color-subtle))]">Guia de Acabamentos</span>
                        <span className="font-medium">R$ 17,90</span>
                      </div>
                    )}
                    
                    {upsells.primaveraVerao && (
                      <div className="flex justify-between">
                        <span className="text-[hsl(var(--color-subtle))]">Primavera Verão</span>
                        <span className="font-medium">R$ 29,90</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-[hsl(var(--color-border))] pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-[hsl(var(--color-text))]">Total</span>
                      <span className="font-bold text-2xl text-[hsl(var(--color-primary))]">
                        R$ {calculateTotal().toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    <p className="text-xs text-[hsl(var(--color-subtle))] mt-1">
                      PIX à vista com desconto
                    </p>
                  </div>
                </div>

                {/* Guarantee Badge */}
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-green-700 dark:text-green-300">
                    7 DIAS DE GARANTIA
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Satisfação ou devolução total
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