import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, ArrowDown, Check, Copy, QrCode, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { formatUTMsForAPI } from "@/lib/utm-tracker";

// Import images
import bannerImg from "@assets/272e6e60-4077-41f3-bea7-3f35166880f4 (1)_1757887269746.png";
import instructorImg from "@assets/imgi_20_3279038_1_175616576468acf684670db711360838_1757863401611.png";
// Upsell product images
import calculoFiosImg from "@assets/imgi_7_3279038_1_175616576468acf6846c600407934409_1757863401610.jpg";
import acabamentosImg from "@assets/imgi_8_3279038_1_175616576468acf6846c764643255696_1757863401610.jpg";
import primaveraVeraoImg from "@assets/imgi_9_3279038_1_175616576468acf6846cab1769481279_1757863401611.jpg";

// Form validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone é obrigatório"),
  document: z.string().min(11, "CPF/CNPJ é obrigatório").refine((doc) => {
    const numbers = doc.replace(/\D/g, "");
    // For now, only validate CPF (11 digits), not CNPJ (14 digits)
    if (numbers.length === 11) {
      // Check if all digits are the same (invalid CPFs like 111.111.111-11)
      if (/^(\d)\1+$/.test(numbers)) return false;
      
      // Validate first digit
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(numbers.charAt(i)) * (10 - i);
      }
      let remainder = (sum * 10) % 11;
      if (remainder === 10) remainder = 0;
      if (remainder !== parseInt(numbers.charAt(9))) return false;
      
      // Validate second digit
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(numbers.charAt(i)) * (11 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10) remainder = 0;
      if (remainder !== parseInt(numbers.charAt(10))) return false;
      
      return true;
    }
    // For CNPJ or other lengths, just pass for now
    return true;
  }, "CPF inválido. Por favor, verifique os números digitados."),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [timeLeft, setTimeLeft] = useState(516); // 8:36 in seconds
  const [upsells, setUpsells] = useState({
    calculoFios: false,
    acabamentos: false,
    primaveraVerao: false,
  });
  const [addPaymentInfoFired, setAddPaymentInfoFired] = useState(false);
  const [, setLocation] = useLocation();
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

  // Scroll to top when component mounts and track Facebook Pixel event
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fire Facebook Pixel InitiateCheckout event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 29.90,
        currency: 'BRL',
        num_items: 1,
        content_ids: ['course_main'],
        content_type: 'product'
      });
    }
  }, []);

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
    let total = 29.90;
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
  
  // Validate CPF
  const validateCPF = (cpf: string): boolean => {
    const numbers = cpf.replace(/\D/g, "");
    
    if (numbers.length !== 11) return false;
    
    // Check if all digits are the same
    if (/^(\d)\1+$/.test(numbers)) return false;
    
    // Validate first digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(9))) return false;
    
    // Validate second digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(10))) return false;
    
    return true;
  };

  // Format phone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  // Create payment mutation
  const createPaymentMutation = useMutation({
    mutationFn: async (data: CheckoutForm) => {
      // Prepare items array
      const items = [
        {
          id: "course_main",
          title: "Coleção Crochês que Mais Vendem - Vitalício",
          description: "Acesso vitalício ao curso completo de crochê",
          price: 29.90,
          quantity: 1,
        },
      ];

      // Add upsells to items
      if (upsells.calculoFios) {
        items.push({
          id: "upsell_calculo",
          title: "Aulão: Cálculo de Fios Descomplicado",
          description: "Aprenda a calcular a quantidade de fio necessária",
          price: 9.90,
          quantity: 1,
        });
      }

      if (upsells.acabamentos) {
        items.push({
          id: "upsell_acabamentos",
          title: "Guia Prático de Acabamentos",
          description: "Técnicas profissionais de acabamento",
          price: 17.90,
          quantity: 1,
        });
      }

      if (upsells.primaveraVerao) {
        items.push({
          id: "upsell_primavera",
          title: "Combo 5 Peças Primavera Verão",
          description: "Coleção exclusiva com 5 peças leves",
          price: 29.90,
          quantity: 1,
        });
      }

      // Get stored UTM parameters
      const utmParams = formatUTMsForAPI();
      
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        document: data.document,
        items,
        totalAmount: calculateTotal(),
        utmParams, // Include UTM parameters
      };

      const response = await apiRequest("POST", "/api/pix/create-payment", payload);
      const responseData = await response.json();
      return responseData;
    },
    onSuccess: (data) => {
      if (data.success && data.transaction) {
        toast({
          title: "PIX Gerado com Sucesso!",
          description: "Redirecionando para a página de pagamento...",
        });
        
        // Redirect to PIX payment page
        setTimeout(() => {
          setLocation(`/pix-payment/${data.transaction.id}`);
        }, 1000);
      }
    },
    onError: (error: any) => {
      console.error("Payment error:", error);
      
      // Extract error message from response
      let errorMessage = "Tente novamente em alguns instantes.";
      let errorTitle = "Erro ao processar pagamento";
      
      // Check if error has a specific message from the server
      if (error.message) {
        // Parse specific error types for better user messages
        if (error.message.includes("CPF") || error.message.includes("CNPJ")) {
          errorTitle = "Erro no documento";
          errorMessage = error.message;
        } else if (error.message.includes("Email")) {
          errorTitle = "Erro no email";
          errorMessage = error.message;
        } else if (error.message.includes("Telefone")) {
          errorTitle = "Erro no telefone";
          errorMessage = error.message;
        } else if (error.message.includes("Nome")) {
          errorTitle = "Erro no nome";
          errorMessage = error.message;
        } else if (error.message.includes("Dados inválidos")) {
          errorTitle = "Dados incorretos";
          errorMessage = error.message;
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
        duration: 5000, // Show for 5 seconds so user has time to read
      });
    },
  });

  const onSubmit = async (data: CheckoutForm) => {
    createPaymentMutation.mutate(data);
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
          <div className="overflow-hidden mb-6">
            <img 
              src={bannerImg} 
              alt="Coleção Crochês que Mais Vendem"
              className="w-full h-auto"
              data-testid="image-checkout-banner"
            />
          </div>

          {/* Product Card */}
          <div className="mb-6 border border-gray-300 bg-white p-3">
            <div className="flex items-center gap-3">
              {/* Product Image */}
              <img 
                src={instructorImg}
                alt="Claudete Oliveira"
                className="w-14 h-14 object-cover border border-gray-200"
                data-testid="image-product-instructor"
              />
              
              {/* Product Info */}
              <div>
                <h3 className="text-sm font-medium text-gray-900" data-testid="text-product-name">
                  Coleção Crochês que Mais Vendem - Vitalício
                </h3>
                <p className="text-xs text-gray-500 line-through mt-1" data-testid="text-price-old">De: R$ 250,00</p>
                <p className="text-base font-bold text-gray-900" data-testid="text-price-new">Por: R$ 29,90</p>
              </div>
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
            <Card className="border border-gray-300 bg-white">
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
                              className="h-12 border-gray-300 focus:border-[hsl(var(--color-primary))] placeholder:text-gray-400"
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
                              className="h-12 border-gray-300 focus:border-[hsl(var(--color-primary))] placeholder:text-gray-400"
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
                              <div className="flex items-center px-3 h-12 bg-[hsl(var(--color-muted))] border border-r-0 border-gray-300">
                                <span className="text-xl">🇧🇷</span>
                                <span className="ml-2 text-sm text-[hsl(var(--color-subtle))]">+55</span>
                              </div>
                              <Input 
                                placeholder="(00) 00000-0000" 
                                {...field}
                                value={formatPhone(field.value)}
                                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                                className="h-12 border-gray-300 focus:border-[hsl(var(--color-primary))] placeholder:text-gray-400"
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
                      
                      <div className="bg-emerald-50/40 border border-emerald-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Simplified PIX Icon */}
                            <div className="w-10 h-10 rounded bg-[#32BCAD] flex items-center justify-center">
                              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                  <path d="M19.5 8.5L16.5 5.5L13.5 8.5C12.5 7.8 11.3 7.4 10 7.4C6.4 7.4 3.5 10.3 3.5 13.9C3.5 17.5 6.4 20.4 10 20.4C11.3 20.4 12.5 20 13.5 19.3L16.5 22.3L19.5 19.3L22.5 22.3L24.5 20.3L19.5 15.3L24.5 10.3L22.5 8.3L19.5 11.3V8.5Z" fill="white"/>
                                  <path d="M8.5 19.5L5.5 22.5L3.5 20.5L5.5 18.5C4.8 17.5 4.4 16.3 4.4 15C4.4 11.4 7.3 8.5 10.9 8.5C12.2 8.5 13.4 8.9 14.4 9.6L16.4 7.6L19.4 10.6L22.4 7.6L20.4 5.6L15.4 10.6L10.4 5.6L8.4 7.6L11.4 10.6C10.4 9.9 9.2 9.5 7.9 9.5C4.3 9.5 1.4 12.4 1.4 16C1.4 19.6 4.3 22.5 7.9 22.5C9.2 22.5 10.4 22.1 11.4 21.4L8.5 19.5Z" fill="white" opacity="0.7"/>
                                </g>
                              </svg>
                            </div>
                            
                            <div>
                              <span className="font-semibold text-[hsl(var(--color-text))] text-base">PIX</span>
                              <p className="text-xs text-gray-500">Pagamento instantâneo</p>
                            </div>
                          </div>
                          
                          <Badge className="bg-emerald-500 text-white border-0 text-xs">
                            Desconto aplicado
                          </Badge>
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
                              onChange={(e) => {
                                const newValue = e.target.value.replace(/\D/g, "");
                                field.onChange(newValue);
                                
                                // Fire Facebook Pixel AddPaymentInfo event when CPF is filled (only once)
                                if (!addPaymentInfoFired && newValue.length >= 11 && typeof window !== 'undefined' && (window as any).fbq) {
                                  (window as any).fbq('track', 'AddPaymentInfo', {
                                    value: calculateTotal(),
                                    currency: 'BRL',
                                    content_ids: ['course_main'],
                                    content_type: 'product'
                                  });
                                  setAddPaymentInfoFired(true);
                                  console.log('Facebook Pixel AddPaymentInfo event fired');
                                }
                              }}
                              maxLength={18}
                              data-testid="input-document"
                              className="h-12 border-gray-300 focus:border-[hsl(var(--color-primary))] placeholder:text-gray-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Optional Upsells */}
                    <div className="pt-6 border-t border-[hsl(var(--color-border))] space-y-4">
                      {/* Upsell 1 - Cálculo dos Fios */}
                      <Card 
                        className="cursor-pointer overflow-hidden transition-all hover:shadow-lg"
                        onClick={() => setUpsells(prev => ({ ...prev, calculoFios: !prev.calculoFios }))}
                        data-testid="card-upsell-calculo"
                      >
                        {/* Header */}
                        <div className={`p-4 flex items-center gap-3 text-white font-bold transition-colors ${
                          upsells.calculoFios ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            {upsells.calculoFios ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <ArrowDown className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <span className="text-sm md:text-base uppercase">
                            {upsells.calculoFios ? 'Adicionado ao carrinho' : 'SIM, EU QUERO APRENDER CÁLCULO DOS FIOS'}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <CardContent className="p-4 bg-white dark:bg-gray-900">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 w-4 h-4 border-2 border-gray-300 flex items-center justify-center">
                              {upsells.calculoFios && <Check className="w-3 h-3 text-green-600" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                <img 
                                  src={calculoFiosImg}
                                  alt="Cálculo de Fios"
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="font-semibold text-sm text-[hsl(var(--color-text))]">
                                        Aulão: Cálculo de Fios Descomplicado
                                      </h4>
                                      <p className="text-xs text-[hsl(var(--color-subtle))] mt-2">
                                        Aprenda a calcular exatamente a quantidade de fio necessária para suas peças
                                      </p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                      Preço Especial
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 mt-3">
                                    <span className="text-sm line-through text-red-500">R$ 29,90</span>
                                    <span className="text-lg font-bold text-green-600">R$ 9,90</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Upsell 2 - Acabamentos */}
                      <Card 
                        className="cursor-pointer overflow-hidden transition-all hover:shadow-lg"
                        onClick={() => setUpsells(prev => ({ ...prev, acabamentos: !prev.acabamentos }))}
                        data-testid="card-upsell-acabamentos"
                      >
                        {/* Header */}
                        <div className={`p-4 flex items-center gap-3 text-white font-bold transition-colors ${
                          upsells.acabamentos ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            {upsells.acabamentos ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <ArrowDown className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <span className="text-sm md:text-base uppercase">
                            {upsells.acabamentos ? 'Adicionado ao carrinho' : 'SIM, EU QUERO DOMINAR OS ACABAMENTOS'}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <CardContent className="p-4 bg-white dark:bg-gray-900">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 w-4 h-4 border-2 border-gray-300 flex items-center justify-center">
                              {upsells.acabamentos && <Check className="w-3 h-3 text-green-600" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                <img 
                                  src={acabamentosImg}
                                  alt="Guia de Acabamentos"
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="font-semibold text-sm text-[hsl(var(--color-text))]">
                                        Guia Prático de Acabamentos
                                      </h4>
                                      <p className="text-xs text-[hsl(var(--color-subtle))] mt-2">
                                        Técnicas profissionais que fazem toda a diferença no resultado final
                                      </p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                      Preço Especial
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 mt-3">
                                    <span className="text-sm line-through text-red-500">R$ 37,90</span>
                                    <span className="text-lg font-bold text-green-600">R$ 17,90</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Upsell 3 - Primavera Verão */}
                      <Card 
                        className="cursor-pointer overflow-hidden transition-all hover:shadow-lg"
                        onClick={() => setUpsells(prev => ({ ...prev, primaveraVerao: !prev.primaveraVerao }))}
                        data-testid="card-upsell-primavera"
                      >
                        {/* Header */}
                        <div className={`p-4 flex items-center gap-3 text-white font-bold transition-colors ${
                          upsells.primaveraVerao ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            {upsells.primaveraVerao ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <ArrowDown className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <span className="text-sm md:text-base uppercase">
                            {upsells.primaveraVerao ? 'Adicionado ao carrinho' : 'SIM, EU QUERO AS PEÇAS PRIMAVERA VERÃO'}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <CardContent className="p-4 bg-white dark:bg-gray-900">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 w-4 h-4 border-2 border-gray-300 flex items-center justify-center">
                              {upsells.primaveraVerao && <Check className="w-3 h-3 text-green-600" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                <img 
                                  src={primaveraVeraoImg}
                                  alt="Primavera Verão"
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="font-semibold text-sm text-[hsl(var(--color-text))]">
                                        Combo 5 Peças Primavera Verão
                                      </h4>
                                      <p className="text-xs text-[hsl(var(--color-subtle))] mt-2">
                                        Coleção exclusiva com 5 peças leves e frescas para a estação
                                      </p>
                                    </div>
                                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                      Novidade
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 mt-3">
                                    <span className="text-lg font-bold text-green-600">R$ 29,90</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full relative overflow-hidden bg-gradient-to-b from-green-400 to-green-600 text-white rounded-lg px-6 md:px-8 py-3 md:py-4 font-bold text-base md:text-lg border border-green-500/30 shadow-[0_4px_0_0_#15803d,0_7px_0_0_rgba(0,0,0,0.15)] hover:shadow-[0_2px_0_0_#15803d,0_4px_0_0_rgba(0,0,0,0.15)] hover:translate-y-[2px] transition-all duration-150 transform active:scale-95 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
                      data-testid="button-submit-payment"
                      disabled={createPaymentMutation.isPending}
                    >
                      {createPaymentMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>Pagar R$ {calculateTotal().toFixed(2).replace(".", ",")}</>
                      )}
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
            <Card className="border border-gray-300 bg-white sticky top-20">
              <CardContent className="p-6">
                {/* Product Info */}
                <div className="flex gap-4 mb-6">
                  <img 
                    src={instructorImg} 
                    alt="Claudete"
                    className="w-16 h-16 object-cover border border-gray-200"
                    data-testid="image-instructor-small"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-[hsl(var(--color-text))]" data-testid="text-product-name">
                      Coleção Crochês que Mais Vendem - Vitalício
                    </h3>
                    <div className="mt-2">
                      <p className="text-xs line-through text-[hsl(var(--color-subtle))]">De: R$ 250,00</p>
                      <p className="text-lg font-bold text-[hsl(var(--color-primary))]">Por: R$ 29,90</p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-[hsl(var(--color-border))] pt-4 space-y-3">
                  <h4 className="font-bold text-[hsl(var(--color-text))]">Resumo do pedido</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[hsl(var(--color-subtle))]">Curso principal</span>
                      <span className="font-medium">R$ 29,90</span>
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
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 text-center">
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