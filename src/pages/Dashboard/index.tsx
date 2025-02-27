import { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaBook,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../hooks/useAuth";
import "./Dashboard.css";

const mockPerformanceData = [
  { day: "Seg", score: 75 },
  { day: "Ter", score: 82 },
  { day: "Qua", score: 78 },
  { day: "Qui", score: 85 },
  { day: "Sex", score: 90 },
  { day: "Sáb", score: 88 },
  { day: "Dom", score: 85 },
];

const mockTodayTasks = [
  {
    id: 1,
    subject: "Matemática",
    topic: "Funções Quadráticas",
    duration: "45min",
    completed: true,
  },
  {
    id: 2,
    subject: "Português",
    topic: "Análise Sintática",
    duration: "30min",
    completed: false,
  },
  {
    id: 3,
    subject: "História",
    topic: "Era Vargas",
    duration: "60min",
    completed: false,
  },
];

export function Dashboard() {
  const { user } = useAuth();
  const [tasks] = useState(mockTodayTasks);

  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="header">
        <h1>Olá, {user?.name}!</h1>
        <p>Continue de onde parou e mantenha o foco nos seus objetivos</p>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-3">
        {/* Progresso Diário */}
        <div className="card">
          <h2>Seu Progresso</h2>
          <div style={{ height: "250px" }}>
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resumo do Dia */}
        <div className="card">
          <h2>Hoje</h2>
          <div>
            <p>Progresso Diário</p>
            <div className="progress-bar">
              <div></div>
            </div>
          </div>

          <div>
            <p>Tarefas de Hoje</p>
            <ul className="task-list">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`task-item ${task.completed ? "completed" : ""}`}
                >
                  <div>
                    <strong>{task.subject}</strong>
                    <p style={{ fontSize: "12px", color: "#666" }}>
                      {task.topic}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FaClock
                      color="gray"
                      size={12}
                    />
                    <span style={{ fontSize: "12px", color: "#666" }}>
                      {task.duration}
                    </span>
                    {task.completed && (
                      <FaCheckCircle
                        color="green"
                        size={16}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-4 quick-actions">
        <button style={{ background: "#e3f2fd" }}>
          <FaBook size={20} /> <br /> Estudar Agora
        </button>
        <button style={{ background: "#f1f8e9" }}>
          <FaChartLine size={20} /> <br /> Ver Desempenho
        </button>
        <button style={{ background: "#fff3e0" }}>
          <FaCalendarAlt size={20} /> <br /> Planejar Semana
        </button>
        <button style={{ background: "#e1bee7" }}>
          <FaBook size={20} /> <br /> Fazer Questões
        </button>
      </div>
    </div>
  );
}
