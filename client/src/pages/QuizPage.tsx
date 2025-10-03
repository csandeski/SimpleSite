import { useState } from "react";
import { useLocation } from "wouter";
import type { QuizQuestion } from "@shared/schema";

export function QuizPage() {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; answerId: number; isDNA: boolean }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "O que mais te impediu de conquistar o corpo irresistível até hoje?",
      answers: [
        { text: "Falta de disciplina", isDNA: false },
        { text: "Métodos longos e ineficazes", isDNA: true },
        { text: "Não sei por onde começar", isDNA: false }
      ]
    },
    {
      id: 2,
      question: "Quanto tempo você teria para treinar diariamente?",
      answers: [
        { text: "Nenhum tempo (zero prioridade)", isDNA: false },
        { text: "20 minutos por dia", isDNA: true },
        { text: "Apenas se for menos de 10 min", isDNA: false }
      ]
    },
    {
      id: 3,
      question: "Você está disposta a se comprometer por 18 dias seguidos com algo que exige foco?",
      answers: [
        { text: "Sim, estou pronta", isDNA: true },
        { text: "Não sei...", isDNA: false },
        { text: "Prefiro deixar para depois", isDNA: false }
      ]
    },
    {
      id: 4,
      question: "Qual dessas frustrações mais te incomoda?",
      answers: [
        { text: "Treinar e não ver resultados visíveis", isDNA: false },
        { text: "Ficar com corpo 'reto' ou sem curvas", isDNA: true },
        { text: "Falta de confiança ao se olhar no espelho", isDNA: false }
      ]
    },
    {
      id: 5,
      question: "Qual é o verdadeiro motivo da sua busca?",
      answers: [
        { text: "Só emagrecer", isDNA: false },
        { text: "Ser irresistível, desejada e confiante", isDNA: true },
        { text: "Usar qualquer roupa sem medo", isDNA: false }
      ]
    },
    {
      id: 6,
      question: "Qual método você acredita mais?",
      answers: [
        { text: "Treinos longos e cansativos", isDNA: false },
        { text: "Método inteligente que ativa músculos profundos", isDNA: true },
        { text: "Apenas dieta", isDNA: false }
      ]
    },
    {
      id: 7,
      question: "Qual transformação seria mais eletrizante para você?",
      answers: [
        { text: "Se sentir bem", isDNA: false },
        { text: "Ver cintura afinar e glúteos empinar em 18 dias", isDNA: true },
        { text: "Receber elogios sobre sua nova energia", isDNA: false }
      ]
    },
    {
      id: 8,
      question: "Para você, investir R$49 em um método que garante transformação...",
      answers: [
        { text: "É muito caro", isDNA: false },
        { text: "É um valor simbólico perto do resultado", isDNA: true },
        { text: "Só valeria se tivesse desconto", isDNA: false }
      ]
    },
    {
      id: 9,
      question: "Este programa é proibido para fracas. Você...",
      answers: [
        { text: "Prefere algo mais fácil", isDNA: false },
        { text: "Aceita o desafio e prova que nasceu para ser Deusa", isDNA: true },
        { text: "Ainda não sabe", isDNA: false }
      ]
    },
    {
      id: 10,
      question: "Quando você pensa em quem será após 18 dias, como se vê?",
      answers: [
        { text: "Uma versão melhor, mas comum", isDNA: false },
        { text: "Uma mulher irresistível, confiante e desejada", isDNA: true },
        { text: "Uma pessoa mais saudável apenas", isDNA: false }
      ]
    }
  ];

  const handleAnswer = (answerId: number, isDNA: boolean) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnswers([...answers, { 
      questionId: questions[currentQuestion].id, 
      answerId, 
      isDNA 
    }]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnimating(false);
      } else {
        // Calculate score and redirect to results
        const score = [...answers, { questionId: questions[currentQuestion].id, answerId, isDNA }]
          .filter(a => a.isDNA).length;
        
        // Store results in sessionStorage
        sessionStorage.setItem('quizScore', score.toString());
        sessionStorage.setItem('quizAnswers', JSON.stringify([...answers, { questionId: questions[currentQuestion].id, answerId, isDNA }]));
        
        setLocation('/resultado');
      }
    }, 300);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #131313 0%, #6e5046 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(20, 20, 20, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '20px',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          {/* Progress bar */}
          <div style={{
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            marginBottom: '15px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: `linear-gradient(90deg, #d4a490 0%, #d4a490 100%)`,
              borderRadius: '2px',
              width: `${progress}%`,
              transition: 'width 0.5s ease',
              boxShadow: '0 0 10px rgba(212, 164, 144, 0.5)'
            }} />
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <img 
              src="/logo-deusa.png" 
              alt="DEUSA18DAY" 
              style={{
                height: '30px',
                objectFit: 'contain'
              }}
            />
            <span style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div style={{
        padding: '40px 20px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'translateX(20px)' : 'translateX(0)',
          transition: 'all 0.3s ease'
        }}>
          {/* Question with Icon */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
            marginBottom: '40px',
            padding: '25px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212, 164, 144, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            {/* Icon */}
            <div style={{
              minWidth: '45px',
              height: '45px',
              background: 'linear-gradient(135deg, #d4a490 0%, #6e5046 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 4px 15px rgba(212, 164, 144, 0.3)'
            }}>
              ✨
            </div>
            
            {/* Question Text */}
            <h2 style={{
              fontSize: '22px',
              fontWeight: '600',
              color: '#FFFFFF',
              lineHeight: '1.5',
              margin: 0,
              flex: 1
            }}>
              {questions[currentQuestion].question}
            </h2>
          </div>

          {/* Answers */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index, answer.isDNA)}
                style={{
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  transition: 'all 0.2s ease',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d4a490';
                  e.currentTarget.style.background = 'rgba(212, 164, 144, 0.1)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 164, 144, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                data-testid={`answer-${index}`}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom hint */}
        <p style={{
          marginTop: '40px',
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center'
        }}>
          💡 Responda com sinceridade para um resultado preciso
        </p>
      </div>
    </div>
  );
}