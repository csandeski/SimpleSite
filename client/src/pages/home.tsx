import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Check, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Maria Silva",
      text: "Curso maravilhoso! As aulas são super detalhadas e a Claudete explica tudo com muita paciência. Já estou recebendo encomendas!",
      rating: 5
    },
    {
      name: "Ana Paula",
      text: "Aprendi técnicas que nunca tinha visto antes. As peças ficam lindas e profissionais. Vale muito a pena o investimento!",
      rating: 5
    },
    {
      name: "Fernanda Costa",
      text: "Melhor curso de crochê que já fiz! O grupo no WhatsApp é muito acolhedor e a Claudete sempre tira nossas dúvidas.",
      rating: 5
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
      <section className="py-8 md:py-16 px-4 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-6xl mx-auto">
          {/* Instructor Photo Placeholder */}
          <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-center text-xs md:text-sm" data-testid="placeholder-instructor-hero">
              Foto da Instrutora
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900" data-testid="text-hero-title">
            Coleção Crochês que Mais Vendem
          </h1>
          
          <h2 className="text-xl md:text-2xl text-center mb-6 text-gray-700" data-testid="text-hero-subtitle">
            Tenha acesso as 5 peças de crochê mais vendidas do meu ateliê
          </h2>

          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
            Aprenda a produzir as 5 peças mais em alta e receba encomendas toda a semana
          </p>

          <div className="text-center mb-6">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all"
              onClick={() => scrollToSection("pricing")}
              data-testid="button-hero-cta"
            >
              QUERO ME INSCREVER
            </Button>
          </div>

          <p className="text-center text-amber-600 font-semibold mb-8" data-testid="text-promo-notice">
            ⚡ CONDIÇÃO PROMOCIONAL POR TEMPO LIMITADO ⚡
          </p>

          {/* Student Count Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-pink-600" />
              <span className="font-bold text-gray-800" data-testid="text-student-count">+2000 alunas</span>
            </div>
            
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600" data-testid="text-rating">5.0</span>
            </div>

            {/* Student Avatars Placeholder */}
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center"
                  data-testid={`placeholder-student-avatar-${i}`}
                >
                  <span className="text-xs text-gray-600">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 md:py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-white" data-testid="text-products-title">
            Confira as 5 peças que você aprenderá a fazer:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Blusa Alessandra", color: "white", description: "Blusa branca elegante" },
              { name: "Camisa Amanda", color: "beige", description: "Cardigan bege versátil" },
              { name: "Blusa Pamela", color: "brown", description: "Blusa marrom aconchegante" },
              { name: "Regata Bianca", color: "beige", description: "Regata bege leve" },
              { name: "Blusa Violeta", color: "purple", description: "Blusa roxa moderna" }
            ].map((product, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:scale-105 transition-transform" data-testid={`card-product-${index}`}>
                <CardContent className="p-6">
                  <div className="aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-400 text-center text-sm" data-testid={`placeholder-product-${index}`}>
                      {product.description}
                    </span>
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
                value: "R$ 97"
              },
              {
                title: "Bônus 2",
                name: "Grupo Exclusivo de Alunas",
                description: "Acesso ao grupo no WhatsApp com suporte direto",
                value: "R$ 67"
              },
              {
                title: "Bônus 3",
                name: "Acesso Vitalício",
                description: "Acesso para sempre ao curso e todas as atualizações",
                value: "Inestimável"
              }
            ].map((bonus, index) => (
              <Card key={index} className="bg-gradient-to-br from-amber-500 to-amber-600 border-0" data-testid={`card-bonus-${index}`}>
                <CardContent className="p-6 text-white">
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
            <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-center" data-testid="placeholder-instructor-about">
                Foto da Professora Claudete
              </span>
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