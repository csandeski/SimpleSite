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
        sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
        
        setLocation('/resultado');
      }
    }, 300);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #F0F0F0',
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
            background: '#F0F0F0',
            borderRadius: '2px',
            marginBottom: '15px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #FF006E 0%, #FF4458 100%)',
              borderRadius: '2px',
              width: `${progress}%`,
              transition: 'width 0.5s ease'
            }} />
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#FF006E',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              DEUSA18DAY
            </span>
            <span style={{
              fontSize: '14px',
              color: '#9A9A9A'
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
          {/* Question */}
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1A1A1A',
            marginBottom: '40px',
            lineHeight: '1.4'
          }}>
            {questions[currentQuestion].question}
          </h2>

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
                  background: '#FFFFFF',
                  border: '2px solid #F0F0F0',
                  borderRadius: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#4A4A4A',
                  transition: 'all 0.2s ease',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FF006E';
                  e.currentTarget.style.background = '#FFF5F8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#F0F0F0';
                  e.currentTarget.style.background = '#FFFFFF';
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
          color: '#9A9A9A',
          textAlign: 'center'
        }}>
          💡 Responda com sinceridade para um resultado preciso
        </p>
      </div>
    </div>
  );
}