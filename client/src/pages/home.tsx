import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Check, ChevronLeft, ChevronRight, Users, MessageCircle, Infinity } from "lucide-react";
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
    <main className="min-h-screen">
      {/* Urgency Header Bar */}
      <div className="bg-red-600 text-white py-3 px-4 text-center sticky top-0 z-50">
        <p className="text-sm md:text-base font-bold animate-pulse" data-testid="text-urgency-header">
          🔥 A OFERTA LIBERADA POR POUCO TEMPO! GARANTA SUA VAGA 🔥
        </p>
      </div>

      {/* Hero Section */}
      <section 
        className="relative bg-white"
        style={{
          backgroundImage: `url(${instructorHeroImg})`,
          backgroundPosition: 'center top',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Light overlay for text readability - only on larger screens where image might cover */}
        <div className="absolute inset-0 bg-white bg-opacity-10 md:block hidden"></div>
        {/* Bottom gradient overlay for text readability - only on desktop */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/90 via-white/60 to-transparent md:block hidden" />
        
        {/* Mobile Layout - Only image */}
        <div className="md:hidden relative" style={{ height: '280px' }}>
          {/* Bottom gradient overlay for smooth transition */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
        </div>

        {/* Desktop Layout - Keep original structure */}
        <div className="hidden md:flex relative z-10 max-w-4xl mx-auto flex-col items-center justify-end min-h-[700px] pb-8">
          {/* Title in overlay box */}
          <div className="bg-amber-50/95 rounded-2xl p-8 mb-4 max-w-3xl shadow-2xl border border-amber-100">
            <h1 className="text-5xl font-bold text-center text-amber-700" data-testid="text-hero-title-desktop">
              Coleção Crochês que Mais Vendem
            </h1>
          </div>
          
          <h2 className="text-2xl text-center mb-3 text-gray-900 font-bold px-4" data-testid="text-hero-subtitle-desktop">
            Tenha acesso as 5 peças de crochê mais vendidas do meu ateliê
          </h2>

          <p className="text-base text-center text-gray-800 mb-4 max-w-2xl mx-auto font-medium px-4" data-testid="text-hero-description-desktop">
            Aprenda a produzir as 5 peças mais em alta e receba encomendas toda a semana
          </p>

          <div className="text-center mb-4">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all font-bold"
              onClick={() => scrollToSection("pricing")}
              data-testid="button-hero-cta-desktop"
            >
              QUERO ME INSCREVER
            </Button>
          </div>

          <p className="text-center text-gray-900 font-bold flex items-center justify-center gap-1 px-4" data-testid="text-promo-notice-desktop">
            <span className="text-xl">⏰</span>
            <span className="text-lg">CONDIÇÃO PROMOCIONAL POR TEMPO LIMITADO</span>
          </p>
        </div>
      </section>

      {/* Mobile Hero Content Section - Shows below hero on mobile only */}
      <section className="md:hidden py-0 px-4 bg-gradient-to-b from-white to-gray-50">
        <h2 className="text-3xl text-center mb-3 text-gray-900 font-extrabold leading-tight" data-testid="text-hero-subtitle">
          Tenha acesso as 5 peças de crochê mais vendidas do meu ateliê
        </h2>

        <p className="text-base text-center text-gray-700 mb-6 max-w-2xl mx-auto font-medium leading-relaxed" data-testid="text-hero-description">
          Aprenda a produzir as 5 peças mais em alta e receba encomendas toda a semana
        </p>

        <div className="text-center mb-6">
          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all font-bold animate-pulse"
            onClick={() => scrollToSection("pricing")}
            data-testid="button-hero-cta"
          >
            QUERO ME INSCREVER
          </Button>
        </div>

        <p className="text-center text-red-600 font-bold flex items-center justify-center gap-2" data-testid="text-promo-notice">
          <span className="text-2xl animate-pulse">⏰</span>
          <span className="text-sm uppercase tracking-wide">CONDIÇÃO PROMOCIONAL POR TEMPO LIMITADO</span>
        </p>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 md:py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-white" data-testid="text-products-title">
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
              <Card key={index} className="bg-gray-800 border-gray-700 hover:scale-105 transition-transform overflow-hidden" data-testid={`card-product-${index}`}>
                <CardContent className="p-6">
                  <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      data-testid={`image-product-${index}`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white text-center" data-testid={`text-product-name-${index}`}>
                    {product.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-gray-900" data-testid="text-testimonials-title">
            DÁ UMA OLHADA NO QUE AS MINHAS ALUNAS ESTÃO DIZENDO
          </h2>

          <div className="relative">
            <Card className="p-8 shadow-xl" data-testid={`card-testimonial-${currentTestimonial}`}>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic" data-testid={`text-testimonial-content-${currentTestimonial}`}>
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <p className="font-semibold text-gray-900" data-testid={`text-testimonial-name-${currentTestimonial}`}>
                      — {testimonials[currentTestimonial].name}
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={`Depoimento de ${testimonials[currentTestimonial].name}`}
                      className="w-full h-64 object-cover"
                      data-testid={`image-testimonial-${currentTestimonial}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTestimonial ? "bg-pink-600 w-8" : "bg-gray-300"
                }`}
                data-testid={`button-testimonial-indicator-${index}`}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full shadow-xl"
              onClick={() => scrollToSection("pricing")}
              data-testid="button-testimonials-cta"
            >
              QUERO FAZER PARTE
            </Button>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white via-gray-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900" data-testid="text-bonus-title">
              Entrando hoje, você ganhará <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">3 bônus exclusivos</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Tudo isso para garantir seu sucesso no crochê
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <Card key={index} className="group bg-white border border-gray-200 hover:border-green-400 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative transform hover:-translate-y-2" data-testid={`card-bonus-${index}`}>
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-emerald-50/0 group-hover:from-green-50/10 group-hover:to-emerald-50/10 transition-all duration-300 pointer-events-none z-0"></div>
                
                <CardContent className="p-8 relative z-10">
                  {bonus.image ? (
                    <div className="mb-6 rounded-xl overflow-hidden h-48 shadow-md">
                      <img 
                        src={bonus.image} 
                        alt={bonus.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        data-testid={`image-bonus-${index}`}
                      />
                    </div>
                  ) : (
                    <div className="mb-6 h-48 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(34, 197, 94, 0.1) 10px, rgba(34, 197, 94, 0.1) 20px)`,
                        }}></div>
                      </div>
                      
                      {bonus.icon === "whatsapp" && (
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-500/20 blur-3xl"></div>
                          <Users className="w-24 h-24 text-green-600 relative z-10 drop-shadow-lg" />
                        </div>
                      )}
                      {bonus.icon === "infinity" && (
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl"></div>
                          <Infinity className="w-24 h-24 text-emerald-600 relative z-10 drop-shadow-lg" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-1.5 shadow-md text-sm font-medium" data-testid={`badge-bonus-${index}`}>
                      {bonus.title}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-700 transition-colors" data-testid={`text-bonus-name-${index}`}>
                    {bonus.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6" data-testid={`text-bonus-description-${index}`}>
                    {bonus.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-sm">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-green-700 font-semibold text-sm">
                        Incluído gratuitamente
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-gray-700 mb-6 text-lg">
              Total de bônus: <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 text-xl">3 recursos exclusivos</span> para acelerar seu aprendizado
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-7 text-lg rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:shadow-[0_15px_40px_rgba(34,197,94,0.4)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 font-bold"
              onClick={() => scrollToSection("pricing")}
              data-testid="button-bonus-cta"
            >
              QUERO TODOS OS BÔNUS
            </Button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-green-50 rounded-full w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 flex items-center justify-center">
            <Shield className="w-16 h-16 md:w-20 md:h-20 text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900" data-testid="text-guarantee-title">
            7 DIAS DE GARANTIA
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed" data-testid="text-guarantee-content">
            Você tem 7 dias para testar o curso. Se por qualquer motivo você não ficar satisfeita, 
            basta solicitar o reembolso e devolveremos 100% do seu investimento. Sem perguntas, 
            sem burocracia. Essa é nossa garantia de qualidade!
          </p>
          <div className="mt-8 p-4 bg-green-100 rounded-lg inline-block">
            <p className="text-green-800 font-semibold">
              ✓ Garantia total de satisfação ou seu dinheiro de volta
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 px-4 bg-gradient-to-b from-white via-gray-50/20 to-white">
        <div className="max-w-2xl mx-auto">
          <Card className="relative bg-white border-2 border-green-400 shadow-[0_20px_50px_rgba(34,197,94,0.15)] hover:shadow-[0_30px_60px_rgba(34,197,94,0.25)] transition-all duration-300" data-testid="card-pricing">
            {/* Premium badge */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full shadow-lg">
                <p className="text-sm font-bold uppercase tracking-wide">Oferta Especial</p>
              </div>
            </div>
            
            <CardContent className="p-10">
              <h3 className="text-3xl font-bold text-center mb-8 text-gray-900" data-testid="text-pricing-title">
                Coleção Crochês que Mais Vendem
              </h3>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
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
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <p className="text-gray-500 line-through text-xl mb-3" data-testid="text-pricing-original">
                  De R$ 250
                </p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 shadow-inner">
                    <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600" data-testid="text-pricing-installments">
                      11x de R$ 5,14
                    </p>
                  </div>
                  <p className="text-xl text-gray-600 font-medium" data-testid="text-pricing-cash">
                    ou <span className="font-bold text-green-600">R$ 47</span> à vista
                  </p>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white py-7 text-xl rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_15px_40px_rgba(34,197,94,0.5)] transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 font-bold relative overflow-hidden group"
                data-testid="button-pricing-cta"
              >
                <span className="relative z-10">QUERO ME INSCREVER AGORA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>

              <div className="mt-6 flex items-center justify-center gap-2">
                <div className="animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p className="text-red-600 font-bold text-sm uppercase tracking-wide" data-testid="text-pricing-urgency">
                    Vagas Limitadas
                  </p>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust badges */}
          <div className="mt-8 flex justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Compra Segura</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Satisfação Garantida</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Instructor Section */}
      <section className="py-12 md:py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-white" data-testid="text-about-title">
            Conheça sua professora
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img 
                src={instructorAboutImg} 
                alt="Professora Claudete Oliveira"
                className="w-full h-full object-cover"
                data-testid="image-instructor-about"
              />
            </div>

            <div className="text-white">
              <h3 className="text-2xl font-bold mb-4" data-testid="text-instructor-name">
                Claudete Oliveira
              </h3>
              <p className="leading-relaxed mb-6" data-testid="text-instructor-bio">
                Com mais de 30 anos de experiência no mundo do crochê, já ensinei mais de 2000 alunas 
                a transformarem essa arte em uma fonte de renda. Meu ateliê é referência na região e 
                minhas peças são conhecidas pela qualidade e acabamento impecável. Agora, quero compartilhar 
                com você os segredos das minhas 5 peças mais vendidas, aquelas que sempre têm fila de espera!
              </p>
              <p className="text-amber-400 font-semibold" data-testid="text-instructor-achievement">
                🏆 Mais de 10.000 peças vendidas
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full shadow-xl"
              onClick={() => scrollToSection("pricing")}
              data-testid="button-about-cta"
            >
              COMEÇAR AGORA
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}