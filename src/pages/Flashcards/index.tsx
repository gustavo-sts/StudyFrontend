import { useState } from "react";
import {
  FaPlus,
  FaRobot,
  FaBrain,
  FaChartLine,
  FaSync,
  FaLightbulb,
} from "react-icons/fa";
import "./Flashcards.css";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  lastReview?: string;
  nextReview?: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
  status: "Novo" | "Aprendendo" | "Revisão" | "Dominado";
}

const mockFlashcards: Flashcard[] = [
  {
    id: "1",
    front: "O que é fotossíntese?",
    back: "Processo pelo qual plantas convertem luz solar em energia química.",
    subject: "Biologia",
    lastReview: "2025-02-22",
    nextReview: "2025-02-24",
    difficulty: "Médio",
    status: "Aprendendo",
  },
];

export function Flashcards() {
  const [cards] = useState<Flashcard[]>(mockFlashcards);
  const [isStudying, setIsStudying] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const startStudySession = () => {
    if (cards.length > 0) {
      setCurrentCard(cards[0]);
      setIsStudying(true);
      setShowAnswer(false);
    }
  };

  return (
    <div className="container">
      <h1>Flashcards</h1>
      <p>Memorize e revise conceitos importantes com flashcards</p>

      {!isStudying ? (
        <>
          {/* Estatísticas */}
          <div className="stats">
            <div>
              <FaBrain /> <strong>Total:</strong> {cards.length}
            </div>
            <div>
              <FaLightbulb /> <strong>Aprendendo:</strong>{" "}
              {cards.filter((card) => card.status === "Aprendendo").length}
            </div>
            <div>
              <FaSync /> <strong>Revisão:</strong>{" "}
              {cards.filter((card) => card.status === "Revisão").length}
            </div>
            <div>
              <FaChartLine /> <strong>Dominados:</strong>{" "}
              {cards.filter((card) => card.status === "Dominado").length}
            </div>
          </div>

          {/* Ações */}
          <div className="button-group">
            <button className="button primary">
              <FaPlus /> Criar Manualmente
            </button>
            <button className="button secondary">
              <FaRobot /> Gerar com IA
            </button>
          </div>

          {/* Lista de Flashcards */}
          <div>
            <h2>Meus Flashcards</h2>
            {cards.map((card) => (
              <div
                key={card.id}
                className="card"
              >
                <div className="card-header">{card.front}</div>
                <div className="card-body">
                  <p>
                    <strong>Matéria:</strong> {card.subject}
                  </p>
                  <p>
                    <strong>Status:</strong> {card.status}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botão de Estudo */}
          <button
            className="button primary"
            onClick={startStudySession}
            disabled={cards.length === 0}
          >
            Começar a Estudar
          </button>
        </>
      ) : (
        /* Modo de Estudo */
        <div className="card">
          <div className="card-body">
            <h2>Estudo</h2>
            <div
              className="flashcard"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? currentCard?.back : currentCard?.front}
            </div>
            <p>Clique para {showAnswer ? "esconder" : "ver"} a resposta</p>

            {showAnswer && (
              <div className="button-group">
                <button className="button danger">Difícil</button>
                <button className="button secondary">Médio</button>
                <button className="button primary">Fácil</button>
              </div>
            )}

            <button
              className="button secondary"
              onClick={() => setIsStudying(false)}
            >
              Encerrar Sessão
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
