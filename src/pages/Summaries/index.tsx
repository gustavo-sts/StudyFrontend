import { useState } from "react";
import { FaPlus, FaDownload, FaShare, FaSearch } from "react-icons/fa";
import "./Summaries.css";

interface Summary {
  id: string;
  title: string;
  subject: string;
  content: string;
  createdAt: Date;
  wordCount: number;
  status: "completed" | "generating";
}

const mockSummaries: Summary[] = [
  {
    id: "1",
    title: "Revolução Industrial",
    subject: "História",
    content:
      "A Revolução Industrial foi um período de grandes transformações tecnológicas e sociais...",
    createdAt: new Date("2025-02-23"),
    wordCount: 500,
    status: "completed",
  },
];

export function Summaries() {
  const [summaries] = useState<Summary[]>(mockSummaries);
  const [showNewSummaryModal, setShowNewSummaryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleGenerateSummary = () => {
    setShowNewSummaryModal(false);
    alert("Seu resumo foi gerado com sucesso!");
  };

  return (
    <div className="container">
      <h1>Meus Resumos</h1>
      <p>Gerencie seus resumos e crie novos com ajuda da IA</p>

      {/* Barra de busca e botão */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            placeholder="Buscar resumos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 35px 10px 10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <FaSearch
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "gray",
            }}
          />
        </div>
        <button
          className="button"
          onClick={() => setShowNewSummaryModal(true)}
        >
          <FaPlus /> Novo Resumo
        </button>
      </div>

      {/* Lista de Resumos */}
      <div style={{ marginTop: "20px" }}>
        {summaries.map((summary) => (
          <div
            key={summary.id}
            className="card"
          >
            <div className="card-header">
              <div>
                <h3>{summary.title}</h3>
                <span className="badge">{summary.subject}</span>
              </div>
              <p style={{ color: "gray", fontSize: "14px" }}>
                {summary.createdAt.toLocaleDateString()}
              </p>
            </div>
            <p>{summary.content.substring(0, 100)}...</p>
            <p style={{ color: "gray", fontSize: "12px" }}>
              {summary.wordCount} palavras
            </p>
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button className="button">
                <FaDownload /> Baixar
              </button>
              <button className="button">
                <FaShare /> Compartilhar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Novo Resumo */}
      {showNewSummaryModal && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setShowNewSummaryModal(false)}
          ></div>
          <div className="modal">
            <h2>Gerar Novo Resumo</h2>
            <div style={{ marginBottom: "10px" }}>
              <label>Título</label>
              <input
                type="text"
                placeholder="Ex: Revolução Industrial"
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Matéria</label>
              <select
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              >
                <option value="historia">História</option>
                <option value="geografia">Geografia</option>
                <option value="biologia">Biologia</option>
                <option value="fisica">Física</option>
                <option value="quimica">Química</option>
                <option value="literatura">Literatura</option>
              </select>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Conteúdo para Resumir</label>
              <textarea
                placeholder="Cole aqui o texto que você deseja resumir..."
                rows={5}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label>Nível de Detalhamento</label>
              <select
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              >
                <option value="short">Resumido (30%)</option>
                <option value="medium">Moderado (50%)</option>
                <option value="detailed">Detalhado (70%)</option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                className="button"
                style={{ background: "gray" }}
                onClick={() => setShowNewSummaryModal(false)}
              >
                Cancelar
              </button>
              <button
                className="button"
                onClick={handleGenerateSummary}
              >
                Gerar Resumo
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
