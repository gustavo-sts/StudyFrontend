import { useState, useEffect } from "react";
import { FaPlus, FaRobot, FaEdit, FaTrash, FaClock } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

interface StudyPlan {
  id: string;
  name: string;
  type: "ENEM" | "Concurso" | "Vestibular" | "Outro";
  hoursPerDay: number;
  subjects: {
    name: string;
    hoursPerWeek: number;
  }[];
}

interface StudyPlanData {
  name: string;
  objective: string;
  startDate: Date;
  endDate: Date;
  description: string;
  subjects: [];
  schedule: [];
}

export function StudyPlan() {
  const { user, token } = useAuth();
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [manualPlanData, setManualPlanData] = useState<{
    name: string;
    type: "ENEM" | "Concurso" | "Vestibular" | "Outro";
    hoursPerDay: number;
    subjects: [];
  }>({
    name: "",
    type: "ENEM",
    hoursPerDay: 4,
    subjects: [],
  });

  useEffect(() => {

    const fetchStudyPlans = async () => {
      try {
        const response = await axios.get("/api/study-plans", {
          baseURL: "http://localhost:5000",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPlans(response.data.studyPlans);
      } catch (error) {
        console.error("Erro ao buscar planos de estudo:", error);
      }
    };

    fetchStudyPlans();
  }, [showModal]);

  const handleCreatePlan = async (planData: StudyPlanData) => {
    try {
      await axios.post("/api/study-plans", planData, {
        baseURL: "http://localhost:5000",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Após criar o plano, buscar a lista atualizada
      const response = await axios.get("/api/study-plans", {
        baseURL: "http://localhost:5000",
        withCredentials: true,
      });
      setPlans(response.data.studyPlans);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao criar plano de estudo:", error);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <h1>Planos de Estudo</h1>
      <p>Crie e gerencie seus planos de estudo personalizados.</p>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Meus Planos
        </button>
        <button
          style={{
            padding: "10px 20px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Criar Plano
        </button>
        <button
          style={{
            padding: "10px 20px",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Gerador IA {user?.plan ? "" : "(Premium)"}
        </button>
      </div>

      {/* Lista de Planos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>{plan.name}</h3>
            <p>
              <FaClock /> {plan.hoursPerDay} horas por dia
            </p>
            <p>
              <strong>Matérias:</strong>
            </p>
            <ul>
              {plan.subjects.map((subject) => (
                <li key={subject.name}>
                  {subject.name} - {subject.hoursPerWeek}h/semana
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setSelectedPlan(plan);
                alert("Plano escolhido: " + selectedPlan);
              }}
              style={{ marginRight: "10px" }}
            >
              <FaEdit /> Editar
            </button>
            <button style={{ color: "red" }}>
              <FaTrash /> Excluir
            </button>
          </div>
        ))}
        <div
          onClick={() => setShowModal(true)}
          style={{
            border: "2px dashed #ddd",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <FaPlus size={24} />
          <p>Criar Novo Plano</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h2>Criar Novo Plano</h2>
            <label>Nome do Plano</label>
            <input
              type="text"
              placeholder="Ex: ENEM 2025"
              style={{ width: "100%", padding: "8px" }}
              id="planName"
            />
            <label>Tipo</label>
            <select style={{ width: "100%", padding: "8px" }} id="planType">
              <option value="ENEM">ENEM</option>
              <option value="Concurso">Concurso</option>
              <option value="Vestibular">Vestibular</option>
              <option value="Outro">Outro</option>
            </select>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button
                onClick={() => {
                  const planName = (document.getElementById("planName") as HTMLInputElement).value;
                  handleCreatePlan({
                    name: planName,
                    objective: "Aprovação",
                    startDate: new Date(),
                    endDate: new Date(),
                    description: "Plano de estudo criado manualmente",
                    subjects: [],
                    schedule: [],
                  });
                }}
                style={{
                  background: "blue",
                  color: "white",
                  padding: "8px 16px",
                }}
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Seção de Criar Plano Manualmente */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <h3>Criar Plano Manualmente</h3>
        <label>Nome do Plano</label>
        <input
          type="text"
          placeholder="Ex: ENEM 2025"
          style={{ width: "100%", padding: "8px" }}
          value={manualPlanData.name}
          onChange={(e) => setManualPlanData({ ...manualPlanData, name: e.target.value })}
        />
        <label>Tipo</label>
        <select
          style={{ width: "100%", padding: "8px" }}
          value={manualPlanData.type}
          onChange={(e) => setManualPlanData({ ...manualPlanData, type: e.target.value as "ENEM" | "Concurso" | "Vestibular" | "Outro" })}
        >
          <option value="ENEM">ENEM</option>
          <option value="Concurso">Concurso</option>
          <option value="Vestibular">Vestibular</option>
          <option value="Outro">Outro</option>
        </select>
        <label>Horas por dia</label>
        <input
          type="number"
          placeholder="Ex: 4"
          style={{ width: "100%", padding: "8px" }}
          value={manualPlanData.hoursPerDay}
          onChange={(e) => setManualPlanData({ ...manualPlanData, hoursPerDay: parseInt(e.target.value) })}
        />
        <button
          style={{
            background: "blue",
            color: "white",
            padding: "10px 20px",
            marginTop: "10px",
          }}
          onClick={() => {
            handleCreatePlan({
              name: manualPlanData.name,
              objective: "Aprovação",
              startDate: new Date(),
              endDate: new Date(),
              description: "Plano de estudo criado manualmente",
              subjects: [],
              schedule: [],
            });
          }}
        >
          Criar Plano
        </button>
      </div>

      {/* Seção de Gerador IA */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <h3>Gerador de Plano com IA</h3>
        {user?.plan === "free" ? (
          <div>
            <FaRobot size={50} />
            <p>Disponível apenas para usuários Premium.</p>
            <Link to="/upgrade">
              <button
                style={{
                  background: "blue",
                  color: "white",
                  padding: "10px 20px",
                }}
              >
                Fazer Upgrade
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <label>Objetivo</label>
            <select style={{ width: "100%", padding: "8px" }}>
              <option value="ENEM">ENEM</option>
              <option value="Concurso">Concurso</option>
              <option value="Vestibular">Vestibular</option>
            </select>
            <button
              style={{
                background: "blue",
                color: "white",
                padding: "10px 20px",
                marginTop: "10px",
              }}
            >
              <FaRobot /> Gerar Plano com IA
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
