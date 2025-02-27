import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const performanceData = [
  { date: "01/02", score: 75 },
  { date: "02/02", score: 82 },
  { date: "03/02", score: 78 },
  { date: "04/02", score: 85 },
  { date: "05/02", score: 90 },
  { date: "06/02", score: 88 },
  { date: "07/02", score: 85 },
];

const subjectPerformance = [
  { subject: "Matemática", correct: 85, total: 100 },
  { subject: "Português", correct: 75, total: 90 },
  { subject: "História", correct: 65, total: 80 },
  { subject: "Geografia", correct: 70, total: 85 },
  { subject: "Física", correct: 60, total: 75 },
];

const studyTimeDistribution = [
  { name: "Matemática", value: 30 },
  { name: "Português", value: 25 },
  { name: "História", value: 15 },
  { name: "Geografia", value: 15 },
  { name: "Física", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function Performance() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Cabeçalho */}
          <div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              Desempenho
            </h2>
            <p style={{ color: "#666" }}>
              Acompanhe sua evolução e identifique áreas para melhorar
            </p>
          </div>

          {/* Estatísticas Gerais */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
              <h3>Taxa de Acerto Geral</h3>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>75%</p>
              <p style={{ fontSize: "0.875rem", color: "#999" }}>
                <span style={{ color: "red" }}>▼</span> 8.5% desde o último mês
              </p>
            </div>

            <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
              <h3>Questões Resolvidas</h3>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>248</p>
              <p style={{ fontSize: "0.875rem", color: "#999" }}>
                <span style={{ color: "red" }}>▼</span> 12 hoje
              </p>
            </div>

            <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
              <h3>Horas Estudadas</h3>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>42h</p>
              <p style={{ fontSize: "0.875rem", color: "#999" }}>
                <span style={{ color: "green" }}>▲</span> 3.5h hoje
              </p>
            </div>

            <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
              <h3>Dias Consecutivos</h3>
              <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>15</p>
              <p style={{ fontSize: "0.875rem", color: "#999" }}>Melhor sequência: 21 dias</p>
            </div>
          </div>

          {/* Gráficos */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* Evolução do Desempenho */}
            <div style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
              <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "1.25rem" }}>Evolução do Desempenho</h3>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
                  >
                    <option value="7d">7 dias</option>
                    <option value="30d">30 dias</option>
                    <option value="90d">90 dias</option>
                  </select>
                </div>
              </div>
              <div style={{ height: "300px", padding: "1rem" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#0EA5E9" strokeWidth={2} name="Pontuação" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribuição de Tempo */}
            <div style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
              <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
                <h3 style={{ fontSize: "1.25rem" }}>Distribuição de Tempo</h3>
              </div>
              <div style={{ height: "300px", padding: "1rem" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={studyTimeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        value,
                        index,
                      }) => {
                        const RADIAN = Math.PI / 180;
                        const radius =
                          25 + innerRadius + (outerRadius - innerRadius);
                        const x =
                          cx + radius * Math.cos(-midAngle * RADIAN);
                        const y =
                          cy + radius * Math.sin(-midAngle * RADIAN);

                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#666"
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                          >
                            {studyTimeDistribution[index].name} ({value}%)
                          </text>
                        );
                      }}
                    >
                      {studyTimeDistribution.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Desempenho por Matéria */}
          <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem" }}>
            <h3 style={{ fontSize: "1.25rem" }}>Desempenho por Matéria</h3>
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="correct" name="Acertos" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total" name="Total" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
  );
}
