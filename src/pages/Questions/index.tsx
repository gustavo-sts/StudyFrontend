import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChartBar, FaCheck, FaClock, FaBookmark } from 'react-icons/fa';
import './Questions.css';

interface QuestionFilters {
  materias: string[];
  bancas: string[];
  dificuldade: string[];
}

type Question =
  | {
      category: string;
      type: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    }
  | string;

export function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<QuestionFilters>({
    materias: [],
    bancas: [],
    dificuldade: [],
  });

  async function fetchQuestions() {
    try {
      const response = await axios.get<Question[]>(
        "http://localhost:5000/api/questions",
        {
          params: filters,
        }
      );
      setQuestions(response.data);
      console.log("Questões carregadas:", response.data);
    } catch (error: unknown) {
      console.error("Erro ao buscar questões:", error);
      setError(
        "Erro ao carregar as questões. Por favor, tente novamente mais tarde."
      );
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    const { materias, bancas, dificuldade } = filters;

    if (event.target.name === "materias") {
      if (checked) {
        setFilters({ ...filters, materias: [...materias, value] });
      } else {
        setFilters({
          ...filters,
          materias: materias.filter((e) => e !== value),
        });
      }
    }

    if (event.target.name === "bancas") {
      if (checked) {
        setFilters({ ...filters, bancas: [...bancas, value] });
      } else {
        setFilters({
          ...filters,
          bancas: bancas.filter((e) => e !== value),
        });
      }
    }

    if (event.target.name === "dificuldade") {
      if (checked) {
        setFilters({ ...filters, dificuldade: [...dificuldade, value] });
      } else {
        setFilters({
          ...filters,
          dificuldade: dificuldade.filter((e) => e !== value),
        });
      }
    }
  };

  const handleAnswerSubmit = (): void => {
    if (selectedAnswer !== null) {
      setHasAnswered(true);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Você chegou ao fim das questões!');
    }
  };

 const currentQuestion = questions[currentQuestionIndex];

 const options = typeof currentQuestion === 'object' && currentQuestion
    ? [...(currentQuestion.incorrect_answers || []), currentQuestion.correct_answer]
    : [];

  const getDifficultyClass = (difficulty: string | undefined) => {
    if (!difficulty) {
      return '';
    }
    return `question-difficulty-${difficulty}`;
  };

  return (
    <div className="questions-container">
      <div className="questions-content">
        {/* Cabeçalho */}
        <div className="header">
          <h2 className="header-title">
            Banco de Questões
          </h2>
          <p className="header-description">
            Pratique com questões de diversas bancas e assuntos
          </p>
        </div>

        {/* Filtros */}
        <div className="filters-container">
          <div className="filters-header">
            <div className="filters-header-content">
              <h3 className="filters-title">Filtros</h3>
            </div>
          </div>
          <div className="filters-content">
            <div className="filters-grid">
              <div>
                <h4 className="filter-category-title">Matérias</h4>
                <div className="filter-options">
                  <label>
                    <input
                      type="checkbox"
                      name="materias"
                      value="matematica"
                      onChange={handleFilterChange}
                    />
                    Matemática
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materias"
                      value="portugues"
                      onChange={handleFilterChange}
                    />
                    Português
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materias"
                      value="fisica"
                      onChange={handleFilterChange}
                    />
                    Física
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="materias"
                      value="quimica"
                      onChange={handleFilterChange}
                    />
                    Química
                  </label>
                </div>
              </div>

              <div>
                <h4 className="filter-category-title">Bancas</h4>
                <div className="filter-options">
                  <label>
                    <input
                      type="checkbox"
                      name="bancas"
                      value="enem"
                      onChange={handleFilterChange}
                    />
                    ENEM
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="bancas"
                      value="vunesp"
                      onChange={handleFilterChange}
                    />
                    VUNESP
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="bancas"
                      value="fuvest"
                      onChange={handleFilterChange}
                    />
                    FUVEST
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="bancas"
                      value="unicamp"
                      onChange={handleFilterChange}
                    />
                    UNICAMP
                  </label>
                </div>
              </div>

              <div>
                <h4 className="filter-category-title">Dificuldade</h4>
                <div className="filter-options">
                  <label>
                    <input
                      type="checkbox"
                      name="dificuldade"
                      value="facil"
                      onChange={handleFilterChange}
                    />
                    Fácil
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="dificuldade"
                      value="medio"
                      onChange={handleFilterChange}
                    />
                    Médio
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="dificuldade"
                      value="dificil"
                      onChange={handleFilterChange}
                    />
                    Difícil
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="stats-grid">
          <div className="stats-card">
            <div className="stats-content">
              <FaCheck size={32} color="green" />
              <p className="stats-value">75%</p>
              <p>Taxa de Acerto</p>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-content">
              <FaChartBar size={32} color="blue" />
              <p className="stats-value">248</p>
              <p>Questões Resolvidas</p>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-content">
              <FaClock size={32} color="orange" />
              <p className="stats-value">3.5</p>
              <p>Tempo Médio (min)</p>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-content">
              <FaBookmark size={32} color="purple" />
              <p className="stats-value">15</p>
              <p>Questões Salvas</p>
            </div>
          </div>
        </div>

        {/* Questão Atual */}
        {error ? (
          <div className="question-card">
            <div className="question-error-content">
              <p>{error}</p>
            </div>
          </div>
        ) : currentQuestion ? (
          <div className="question-card">
            <div className="question-content">
              <div>
                <div className="question-tags">
                  <span className="question-category">{typeof currentQuestion === 'object' ? currentQuestion.category : ''}</span>
                  <span className="question-type">{typeof currentQuestion === 'object' ? currentQuestion.type : ''}</span>
                  <span className={`question-difficulty ${getDifficultyClass(typeof currentQuestion === 'object' ? currentQuestion.difficulty : undefined)}`}>
                    {typeof currentQuestion === 'object' ? currentQuestion.difficulty : ''}
                  </span>
                </div>
                <p className="question-text">{typeof currentQuestion === 'object' ? currentQuestion.question : ''}</p>
              </div>

              <div>
                <form>
                  <div className="answer-options">
                    {options.map((option: string, index: number) => (
                      <label
                        key={index}
                        className="answer-label"
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={option}
                          checked={selectedAnswer === option}
                          onChange={(e) => setSelectedAnswer(e.target.value)}
                          disabled={hasAnswered}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </form>
              </div>

              {!hasAnswered ? (
                <button
                  className="answer-submit-button"
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                >
                  Responder
                </button>
              ) : (
                <div className="answer-feedback">
                  <div>
                    <h4 className="feedback-title">Explicação</h4>
                    <p>
                      {typeof currentQuestion === 'object' ? currentQuestion.correct_answer : ''}
                    </p>
                  </div>
                  <button
                    className="next-question-button"
                    onClick={nextQuestion}
                  >
                    Próxima Questão
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="question-card">
            <div className="question-loading-content">
              <p>Carregando questões...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
