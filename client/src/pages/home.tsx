import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Check, ChevronLeft, ChevronRight, Users } from "lucide-react";
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
        className="relative bg-amber-50"
        style={{
          backgroundImage: `url(${instructorHeroImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Light overlay for text readability - only on larger screens where image might cover */}
        <div className="absolute inset-0 bg-white bg-opacity-10 md:block hidden"></div>
        {/* Bottom gradient overlay for text readability - only on desktop */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/90 via-white/60 to-transparent md:block hidden" />
        
        {/* Mobile Layout - Only image */}
        <div className="md:hidden relative min-h-[500px]">
          {/* Empty - just show the image */}
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
      <section className="md:hidden py-8 px-4 bg-white">
        <h2 className="text-base text-center mb-3 text-gray-900 font-bold" data-testid="text-hero-subtitle">
          Tenha acesso as 5 peças de crochê mais vendidas do meu ateliê
        </h2>

        <p className="text-sm text-center text-gray-800 mb-6 max-w-2xl mx-auto font-medium" data-testid="text-hero-description">
          Aprenda a produzir as 5 peças mais em alta e receba encomendas toda a semana
        </p>

        <div className="text-center mb-6">
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-base rounded-full shadow-2xl transform hover:scale-105 transition-all font-bold"
            onClick={() => scrollToSection("pricing")}
            data-testid="button-hero-cta"
          >
            QUERO ME INSCREVER
          </Button>
        </div>

        <p className="text-center text-gray-900 font-bold flex items-center justify-center gap-1" data-testid="text-promo-notice">
          <span className="text-xl">⏰</span>
          <span className="text-sm">CONDIÇÃO PROMOCIONAL POR TEMPO LIMITADO</span>
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
      <section className="py-12 md:py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-white" data-testid="text-bonus-title">
            Entrando hoje, você ganhará 3 bônus exclusivos:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Bônus 1",
                name: "Curso de Crochê Fundamental",
                description: "Aprenda do zero todas as técnicas básicas do crochê",
                value: "R$ 97",
                image: crochetHandsImg
              },
              {
                title: "Bônus 2",
                name: "Grupo Exclusivo de Alunas",
                description: "Acesso ao grupo no WhatsApp com suporte direto",
                value: "R$ 67",
                image: null
              },
              {
                title: "Bônus 3",
                name: "Acesso Vitalício",
                description: "Acesso para sempre ao curso e todas as atualizações",
                value: "Inestimável",
                image: null
              }
            ].map((bonus, index) => (
              <Card key={index} className="bg-gradient-to-br from-amber-500 to-amber-600 border-0 overflow-hidden" data-testid={`card-bonus-${index}`}>
                <CardContent className="p-6 text-white">
                  {bonus.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={bonus.image} 
                        alt={bonus.name}
                        className="w-full h-32 object-cover"
                        data-testid={`image-bonus-${index}`}
                      />
                    </div>
                  )}
                  <Badge className="bg-red-600 text-white mb-3" data-testid={`badge-bonus-${index}`}>
                    {bonus.title}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2" data-testid={`text-bonus-name-${index}`}>
                    {bonus.name}
                  </h3>
                  <p className="text-amber-100 mb-4" data-testid={`text-bonus-description-${index}`}>
                    {bonus.description}
                  </p>
                  <p className="text-2xl font-bold" data-testid={`text-bonus-value-${index}`}>
                    Valor: {bonus.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-orange-100 to-orange-200">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 text-orange-600" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900" data-testid="text-guarantee-title">
            7 DIAS DE GARANTIA
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed" data-testid="text-guarantee-content">
            Você tem 7 dias para testar o curso. Se por qualquer motivo você não ficar satisfeita, 
            basta solicitar o reembolso e devolveremos 100% do seu investimento. Sem perguntas, 
            sem burocracia. Essa é nossa garantia de qualidade!
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <Card className="border-4 border-green-500 shadow-2xl" data-testid="card-pricing">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900" data-testid="text-pricing-title">
                Coleção Crochês que Mais Vendem
              </h3>

              <div className="space-y-3 mb-8">
                {[
                  "✅ 5 peças completas em vídeo aulas",
                  "✅ Passo a passo detalhado",
                  "✅ Suporte direto com a professora",
                  "✅ Certificado de conclusão",
                  "✅ Acesso vitalício",
                  "✅ Grupo exclusivo no WhatsApp",
                  "✅ Curso bônus de fundamentos"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2" data-testid={`text-pricing-item-${index}`}>
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item.substring(2)}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mb-6">
                <p className="text-gray-500 line-through text-xl mb-2" data-testid="text-pricing-original">
                  De R$ 250
                </p>
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-green-600" data-testid="text-pricing-installments">
                    11x de R$ 5,14
                  </p>
                  <p className="text-xl text-gray-600" data-testid="text-pricing-cash">
                    ou R$ 47 à vista
                  </p>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-xl rounded-full shadow-xl"
                data-testid="button-pricing-cta"
              >
                QUERO ME INSCREVER
              </Button>

              <p className="text-center text-red-600 font-semibold mt-4 animate-pulse" data-testid="text-pricing-urgency">
                ⚠️ VAGAS LIMITADAS ⚠️
              </p>
            </CardContent>
          </Card>
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