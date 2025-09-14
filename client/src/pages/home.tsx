import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Check, ChevronLeft, ChevronRight, Users, Infinity } from "lucide-react";
import { useState } from "react";

// Import all images
import instructorHeroImg from "@assets/imgi_1_3279038_1_175616576468acf684611e1979289725_1757863401608.png";
import blusaAlessandraImg from "@assets/imgi_7_3279038_1_175616576468acf6846c600407934409_1757863401610.jpg";
import camisaAmandaImg from "@assets/imgi_6_3279038_1_175616576468acf6846c45d610278439_1757863401610.jpg";
import blusaPamelaImg from "@assets/imgi_8_3279038_1_175616576468acf6846c764643255696_1757863401610.jpg";
import regataBiancaImg from "@assets/imgi_9_3279038_1_175616576468acf6846cab1769481279_1757863401611.jpg";
import blusaVioletaImg from "@assets/imgi_10_3279038_1_175616576468acf6846cceb653110487_1757863401609.jpg";
import testimonial1Img from "@assets/imgi_12_3279038_1_175616576468acf6846d04e7315860909823333_1757863401608.png";
import testimonial2Img from "@assets/imgi_11_3279038_1_175616576468acf6846d04e7315860902770816_1757863401609.png";
import testimonial3Img from "@assets/imgi_13_3279038_1_175616576468acf6846d04e7315860909713622_1757863401609.png";
import testimonial4Img from "@assets/imgi_14_3279038_1_175616576468acf6846d04e7315860903433062_1757863401609.jpg";
import crochetHandsImg from "@assets/imgi_15_3279038_1_175616576468acf684622c7931240388_1757863401608.jpg";
import instructorAboutImg from "@assets/imgi_20_3279038_1_175616576468acf684670db711360838_1757863401611.png";
import logoImg from "@assets/imgi_22_3279038_1_175616576468acf6846826a252308403_1757863401610.png";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Maria Silva",
      text: "Curso maravilhoso! As aulas são super detalhadas e a Claudete explica tudo com muita paciência. Já estou recebendo encomendas!",
      rating: 5,
      image: testimonial1Img
    },
    {
      name: "Ana Paula",
      text: "Aprendi técnicas que nunca tinha visto antes. As peças ficam lindas e profissionais. Vale muito a pena o investimento!",
      rating: 5,
      image: testimonial2Img
    },
    {
      name: "Fernanda Costa",
      text: "Melhor curso de crochê que já fiz! O grupo no WhatsApp é muito acolhedor e a Claudete sempre tira nossas dúvidas.",
      rating: 5,
      image: testimonial3Img
    },
    {
      name: "Juliana Santos",
      text: "A Blusa Pamela ficou perfeita! As explicações são claras e o resultado é profissional.",
      rating: 5,
      image: testimonial4Img
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--color-bg))]">
      {/* Urgency Header Bar */}
      <div className="bg-[hsl(var(--color-primary))] text-white py-3 px-4 text-center sticky top-0 z-50">
        <p className="text-sm md:text-base font-bold animate-pulse" data-testid="text-urgency-header">
          🔥 A OFERTA LIBERADA POR POUCO TEMPO! GARANTA SUA VAGA 🔥
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Desktop Layout with background image */}
        <div 
          className="hidden md:block absolute inset-0"
          style={{
            backgroundImage: `url(${instructorHeroImg})`,
            backgroundPosition: 'center 20%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Light overlay for text readability */}
          <div className="absolute inset-0 bg-[hsl(var(--color-bg))] bg-opacity-30"></div>
          {/* Bottom gradient overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[hsl(var(--color-bg))]/90 via-[hsl(var(--color-bg))]/60 to-transparent" />
        </div>
        
        {/* Mobile Layout - Full width image */}
        <div 
          className="md:hidden relative" 
          style={{ 
            height: '400px',
            backgroundImage: `url(${instructorHeroImg})`,
            backgroundPosition: 'center 15%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Bottom gradient overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(var(--color-bg))] via-[hsl(var(--color-bg))]/90 to-transparent z-10" />
        </div>

        {/* Desktop Content */}
        <div className="hidden md:flex relative z-10 max-w-6xl mx-auto flex-col items-center justify-end min-h-[700px] px-4 pb-12">
          {/* Title in overlay box */}
          <div className="bg-[hsl(var(--color-surface))]/95 rounded-2xl p-8 mb-6 max-w-3xl shadow-2xl border border-[hsl(var(--color-border))]">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-center text-[hsl(var(--color-text))]" data-testid="text-hero-title-desktop">
              Coleção Crochês que Mais Vendem
            </h1>
          </div>
          
          <h2 className="text-xl md:text-2xl font-semibold leading-snug text-center mb-4 text-[hsl(var(--color-text))] max-w-2xl" data-testid="text-hero-subtitle-desktop">
            Tenha acesso as 5 peças de crochê mais vendidas do meu ateliê
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-center text-[hsl(var(--color-subtle))] mb-8 max-w-2xl" data-testid="text-hero-description-desktop">
            Aprenda a produzir as 5 peças mais em alta e receba encomendas toda a semana
          </p>

          <Button 
            size="lg" 
            className="bg-[hsl(var(--color-cta))] text-[hsl(var(--color-cta-foreground))] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg hover:opacity-95 transition-opacity font-bold text-base md:text-lg"
            onClick={() => scrollToSection("pricing")}
            data-testid="button-hero-cta-desktop"
          >
            QUERO ME INSCREVER
          </Button>

          <p className="text-center text-[hsl(var(--color-accent))] font-bold flex items-center justify-center gap-2 mt-6" data-testid="text-promo-notice-desktop">
            <span className="text-xl">⏰</span>
            <span className="text-sm md:text-base">CONDIÇÃO PROMOCIONAL POR TEMPO LIMITADO</span>
          </p>
        </div>
      </section>

      {/* Mobile Hero Content Section */}
      <section className="md:hidden py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-center mb-4 text-[hsl(var(--color-text))]" data-testid="text-hero-title">
            Coleção Crochês que Mais Vendem
          </h1>
          
          <h2 className="text-xl md:text-2xl font-semibold leading-snug text-center mb-4 text-[hsl(var(--color-text))]" data-testid="text-hero-subtitle">
            Tenha acesso as 5 peças de crochê mais vendidas do meu ateliê
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-center text-[hsl(var(--color-subtle))] mb-8" data-testid="text-hero-description">
            Aprenda a produzir as 5 peças mais em alta e receba encomendas toda a semana
          </p>

          <div className="text-center mb-6">
            <Button 
              size="lg" 
              className="bg-[hsl(var(--color-cta))] text-[hsl(var(--color-cta-foreground))] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg hover:opacity-95 transition-opacity font-bold text-base md:text-lg"
              onClick={() => scrollToSection("pricing")}
              data-testid="button-hero-cta"
            >
              QUERO ME INSCREVER
            </Button>
          </div>

          <p className="text-center text-[hsl(var(--color-accent))] font-bold flex items-center justify-center gap-2" data-testid="text-promo-notice">
            <span className="text-xl animate-pulse">⏰</span>
            <span className="text-sm md:text-base">CONDIÇÃO PROMOCIONAL POR TEMPO LIMITADO</span>
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-10 md:py-16 px-4 bg-[hsl(var(--color-muted))]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight text-center mb-12 text-[hsl(var(--color-text))]" data-testid="text-products-title">
            Confira as 5 peças que você aprenderá a fazer:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Blusa Alessandra", image: blusaAlessandraImg, description: "Blusa branca elegante" },
              { name: "Camisa Amanda", image: camisaAmandaImg, description: "Cardigan bege versátil" },
              { name: "Blusa Pamela", image: blusaPamelaImg, description: "Blusa marrom aconchegante" },
              { name: "Regata Bianca", image: regataBiancaImg, description: "Regata bege leve" },
              { name: "Blusa Violeta", image: blusaVioletaImg, description: "Blusa roxa moderna" }
            ].map((product, index) => (
              <Card key={index} className="rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] shadow-md hover:shadow-lg transition-shadow overflow-hidden" data-testid={`card-product-${index}`}>
                <CardContent className="p-6 md:p-8">
                  <div className="aspect-[4/3] rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      data-testid={`image-product-${index}`}
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold leading-snug text-[hsl(var(--color-text))] text-center" data-testid={`text-product-name-${index}`}>
                    {product.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 md:py-16 px-4 bg-[hsl(var(--color-bg))]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight text-center mb-12 text-[hsl(var(--color-text))]" data-testid="text-testimonials-title">
            DÁ UMA OLHADA NO QUE AS MINHAS ALUNAS ESTÃO DIZENDO
          </h2>

          <div className="relative">
            <Card className="rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] shadow-md p-6 md:p-8" data-testid={`card-testimonial-${currentTestimonial}`}>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[hsl(var(--color-accent))] text-[hsl(var(--color-accent))]" />
                      ))}
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-[hsl(var(--color-text))] mb-4 italic" data-testid={`text-testimonial-content-${currentTestimonial}`}>
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <p className="font-semibold text-[hsl(var(--color-text))]" data-testid={`text-testimonial-name-${currentTestimonial}`}>
                      — {testimonials[currentTestimonial].name}
                    </p>
                  </div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={`Depoimento de ${testimonials[currentTestimonial].name}`}
                      className="w-full h-full object-cover"
                      data-testid={`image-testimonial-${currentTestimonial}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[hsl(var(--color-surface))] rounded-full p-2 shadow-lg hover:bg-[hsl(var(--color-muted))]"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-6 h-6 text-[hsl(var(--color-text))]" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[hsl(var(--color-surface))] rounded-full p-2 shadow-lg hover:bg-[hsl(var(--color-muted))]"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-6 h-6 text-[hsl(var(--color-text))]" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTestimonial 
                    ? "bg-[hsl(var(--color-primary))] w-8" 
                    : "bg-[hsl(var(--color-border))]"
                }`}
                data-testid={`button-testimonial-indicator-${index}`}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="bg-[hsl(var(--color-cta))] text-[hsl(var(--color-cta-foreground))] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg hover:opacity-95 transition-opacity font-bold text-base md:text-lg"
              onClick={() => scrollToSection("pricing")}
              data-testid="button-testimonials-cta"
            >
              QUERO FAZER PARTE
            </Button>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-10 md:py-16 px-4 bg-[hsl(var(--color-muted))]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4 text-[hsl(var(--color-text))]" data-testid="text-bonus-title">
              Entrando hoje, você ganhará <span className="text-[hsl(var(--color-primary))]">3 bônus exclusivos</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[hsl(var(--color-subtle))] max-w-2xl mx-auto">
              Tudo isso para garantir seu sucesso no crochê
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Bônus 1",
                name: "Curso de Crochê Fundamental",
                description: "Aprenda do zero todas as técnicas básicas do crochê com aulas detalhadas",
                image: crochetHandsImg,
                icon: null
              },
              {
                title: "Bônus 2",
                name: "Grupo Exclusivo de Alunas",
                description: "Acesso ao grupo no WhatsApp com suporte direto e tira-dúvidas diárias",
                image: null,
                icon: "whatsapp"
              },
              {
                title: "Bônus 3",
                name: "Acesso Vitalício",
                description: "Acesso para sempre ao curso e todas as atualizações futuras",
                image: null,
                icon: "infinity"
              }
            ].map((bonus, index) => (
              <Card key={index} className="rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] shadow-md hover:shadow-lg transition-shadow overflow-hidden" data-testid={`card-bonus-${index}`}>
                <CardContent className="p-6 md:p-8">
                  {bonus.image ? (
                    <div className="aspect-[4/3] rounded-lg mb-6 overflow-hidden">
                      <img 
                        src={bonus.image} 
                        alt={bonus.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        data-testid={`image-bonus-${index}`}
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-[hsl(var(--color-muted))] rounded-lg mb-6 flex items-center justify-center">
                      {bonus.icon === "whatsapp" && (
                        <Users className="w-16 h-16 md:w-20 md:h-20 text-[hsl(var(--color-primary))]" />
                      )}
                      {bonus.icon === "infinity" && (
                        <Infinity className="w-16 h-16 md:w-20 md:h-20 text-[hsl(var(--color-primary))]" />
                      )}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <Badge className="bg-[hsl(var(--color-accent))] text-[hsl(var(--color-accent-foreground))] border-0 px-3 py-1 text-sm md:text-base font-medium" data-testid={`badge-bonus-${index}`}>
                      {bonus.title}
                    </Badge>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold leading-snug mb-3 text-[hsl(var(--color-text))]" data-testid={`text-bonus-name-${index}`}>
                    {bonus.name}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-[hsl(var(--color-subtle))] mb-6" data-testid={`text-bonus-description-${index}`}>
                    {bonus.description}
                  </p>

                  <div className="pt-4 border-t border-[hsl(var(--color-border))]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[hsl(var(--color-primary))]/10 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-[hsl(var(--color-primary))]" />
                      </div>
                      <p className="text-[hsl(var(--color-primary))] font-semibold text-sm md:text-base">
                        Incluído gratuitamente
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-base md:text-lg leading-relaxed text-[hsl(var(--color-text))] mb-6">
              Total de bônus: <span className="font-bold text-[hsl(var(--color-primary))]">3 recursos exclusivos</span> para acelerar seu aprendizado
            </p>
            <Button 
              size="lg" 
              className="bg-[hsl(var(--color-cta))] text-[hsl(var(--color-cta-foreground))] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg hover:opacity-95 transition-opacity font-bold text-base md:text-lg"
              onClick={() => scrollToSection("pricing")}
              data-testid="button-bonus-cta"
            >
              QUERO TODOS OS BÔNUS
            </Button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-10 md:py-16 px-4 bg-[hsl(var(--color-bg))]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[hsl(var(--color-primary))]/10 rounded-full w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 flex items-center justify-center">
            <Shield className="w-16 h-16 md:w-20 md:h-20 text-[hsl(var(--color-cta))]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-6 text-[hsl(var(--color-text))]" data-testid="text-guarantee-title">
            7 DIAS DE GARANTIA
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[hsl(var(--color-subtle))]" data-testid="text-guarantee-content">
            Você tem 7 dias para testar o curso. Se por qualquer motivo você não ficar satisfeita, 
            basta solicitar o reembolso e devolveremos 100% do seu investimento. Sem perguntas, 
            sem burocracia. Essa é nossa garantia de qualidade!
          </p>
          <div className="mt-8 p-4 bg-[hsl(var(--color-primary))]/10 rounded-lg inline-block">
            <p className="text-[hsl(var(--color-primary))] font-semibold text-sm md:text-base">
              ✓ Garantia total de satisfação ou seu dinheiro de volta
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-10 md:py-16 px-4 bg-[hsl(var(--color-muted))]">
        <div className="max-w-2xl mx-auto">
          <Card className="relative rounded-xl border-2 border-[hsl(var(--color-primary))] bg-[hsl(var(--color-surface))] shadow-xl hover:shadow-2xl transition-shadow" data-testid="card-pricing">
            {/* Premium badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-[hsl(var(--color-accent))] text-[hsl(var(--color-accent-foreground))] px-6 py-2 rounded-full shadow-lg">
                <p className="text-sm md:text-base font-bold uppercase tracking-wide">Oferta Especial</p>
              </div>
            </div>
            
            <CardContent className="p-6 md:p-10">
              <h3 className="text-xl md:text-2xl font-semibold leading-snug text-center mb-8 text-[hsl(var(--color-text))]" data-testid="text-pricing-title">
                Coleção Crochês que Mais Vendem
              </h3>

              <div className="bg-[hsl(var(--color-muted))] rounded-xl p-6 mb-8">
                <div className="space-y-3">
                  {[
                    "5 peças completas em vídeo aulas",
                    "Passo a passo detalhado",
                    "Suporte direto com a professora",
                    "Certificado de conclusão",
                    "Acesso vitalício",
                    "Grupo exclusivo no WhatsApp",
                    "Curso bônus de fundamentos"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3" data-testid={`text-pricing-item-${index}`}>
                      <div className="w-5 h-5 bg-[hsl(var(--color-cta))]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[hsl(var(--color-cta))]" />
                      </div>
                      <span className="text-base md:text-lg leading-relaxed text-[hsl(var(--color-text))]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mb-8 p-6 bg-[hsl(var(--color-muted))] rounded-xl">
                <p className="text-[hsl(var(--color-subtle))] line-through text-base md:text-lg mb-3" data-testid="text-pricing-original">
                  De R$ 297,00
                </p>
                <p className="text-3xl md:text-5xl font-bold text-[hsl(var(--color-cta))] mb-2" data-testid="text-pricing-discounted">
                  R$ 97,00
                </p>
                <p className="text-sm md:text-base text-[hsl(var(--color-subtle))]" data-testid="text-pricing-installments">
                  ou em até 10x de R$ 9,70
                </p>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-[hsl(var(--color-cta))] text-[hsl(var(--color-cta-foreground))] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg hover:opacity-95 transition-opacity font-bold text-base md:text-lg"
                onClick={() => window.open('#', '_blank')}
                data-testid="button-pricing-cta"
              >
                GARANTIR MINHA VAGA AGORA
              </Button>

              <p className="text-center text-sm md:text-base text-[hsl(var(--color-subtle))] mt-6" data-testid="text-pricing-urgency">
                ⚡ Últimas vagas com desconto especial
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Instructor Section */}
      <section className="py-10 md:py-16 px-4 bg-gradient-to-b from-[hsl(var(--color-bg))] to-[hsl(var(--color-muted))]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight text-center mb-12 text-[hsl(var(--color-text))]" data-testid="text-about-title">
            Conheça sua professora
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img 
                src={instructorAboutImg}
                alt="Claudete - Professora de Crochê"
                className="w-full h-full object-cover"
                data-testid="image-instructor"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-semibold leading-snug text-[hsl(var(--color-text))]" data-testid="text-instructor-name">
                Claudete - Especialista em Crochê
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-[hsl(var(--color-subtle))]" data-testid="text-instructor-bio">
                Com mais de 15 anos de experiência no mundo do crochê, já ensinei centenas de alunas a transformarem 
                sua paixão em uma fonte de renda. Minhas peças são conhecidas pela qualidade e beleza, e agora quero 
                compartilhar todos os meus segredos com você.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--color-primary))]">500+</p>
                  <p className="text-sm md:text-base text-[hsl(var(--color-subtle))]">Alunas formadas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--color-primary))]">15+</p>
                  <p className="text-sm md:text-base text-[hsl(var(--color-subtle))]">Anos de experiência</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--color-primary))]">98%</p>
                  <p className="text-sm md:text-base text-[hsl(var(--color-subtle))]">Satisfação</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-[hsl(var(--color-cta))] text-[hsl(var(--color-cta-foreground))] rounded-full px-6 md:px-8 py-3 md:py-4 shadow-lg hover:opacity-95 transition-opacity font-bold text-base md:text-lg"
                onClick={() => scrollToSection("pricing")}
                data-testid="button-about-cta"
              >
                COMEÇAR AGORA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Logo */}
      <footer className="py-10 md:py-16 px-4 bg-[hsl(var(--color-text))] text-[hsl(var(--color-surface))]">
        <div className="max-w-6xl mx-auto text-center">
          <img 
            src={logoImg}
            alt="Logo"
            className="h-16 md:h-20 mx-auto mb-6 opacity-90"
            data-testid="image-footer-logo"
          />
          <p className="text-sm md:text-base mb-2" data-testid="text-footer-copyright">
            © 2024 Coleção Crochês que Mais Vendem. Todos os direitos reservados.
          </p>
          <p className="text-sm md:text-base opacity-80" data-testid="text-footer-contact">
            Suporte: contato@crochequevendem.com.br
          </p>
        </div>
      </footer>
    </main>
  );
}