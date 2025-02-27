import { useState } from "react";
import { Layout } from "../../components/Layout";
import { useAuth } from "../../hooks/useAuth";
import { FaRobot, FaPaperPlane, FaHistory, FaCrown } from "react-icons/fa";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const mockHistory: ChatHistory[] = [
  {
    id: "1",
    title: "Dúvida sobre Termodinâmica",
    lastMessage: "Entendi! Obrigado pela explicação detalhada...",
    timestamp: new Date("2025-02-23T14:30:00"),
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    content:
      "Olá! Sou sua assistente de estudos. Como posso ajudar você hoje?",
    sender: "ai",
    timestamp: new Date("2025-02-23T14:00:00"),
  },
];

export function AIChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history] = useState<ChatHistory[]>(mockHistory);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Entendi sua dúvida. Vou explicar de forma detalhada e com exemplos práticos para facilitar sua compreensão...",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (user?.plan === "free") {
    return (
      <Layout>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <FaCrown size={64} color="#f7b928" />
              <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>Chat com IA Tutor</h2>
              <p style={{ textAlign: "center", maxWidth: "600px", color: "#666" }}>
                Tire suas dúvidas em tempo real com nossa IA especializada em
                educação. Receba explicações personalizadas e exemplos práticos
                para melhor compreensão.
              </p>
              <button style={{ backgroundColor: "#f7b928", color: "white", padding: "0.75rem 1.5rem", borderRadius: "4px", border: "none", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <FaCrown />
                  <span>Fazer Upgrade para Premium</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.5rem" }}>
          {/* Histórico de Conversas */}
          <div>
            <div style={{ border: "1px solid #ccc", borderRadius: "8px" }}>
              <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "1.25rem" }}>Histórico</h3>
                  <FaHistory color="#666" />
                </div>
              </div>
              <div style={{ padding: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {history.map((chat) => (
                    <div
                      key={chat.id}
                      style={{ padding: "0.75rem", borderRadius: "4px", cursor: "pointer", backgroundColor: "#f7f7f7" }}
                    >
                      <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>{chat.title}</p>
                      <p style={{ fontSize: "0.875rem", color: "#666", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {chat.lastMessage}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "#999", marginTop: "0.25rem" }}>
                        {chat.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div>
            <div style={{ border: "1px solid #ccc", borderRadius: "8px", display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#f7b928", color: "white", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem" }}>
                    <FaRobot />
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    <h3 style={{ fontSize: "1.25rem" }}>IA Tutor</h3>
                    <p style={{ color: "#666", fontSize: "0.875rem" }}>Especialista em educação</p>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, padding: "1rem", overflowY: "auto", marginBottom: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      style={{ alignSelf: message.sender === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}
                    >
                      <div
                        style={{
                          backgroundColor: message.sender === "user" ? "#f7b928" : "#f7f7f7",
                          color: message.sender === "user" ? "white" : "#333",
                          padding: "1rem",
                          borderRadius: "8px",
                        }}
                      >
                        {message.content}
                      </div>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "#999",
                          marginTop: "0.25rem",
                          textAlign: message.sender === "user" ? "right" : "left",
                        }}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                  {isLoading && (
                    <div style={{ alignSelf: "flex-start", maxWidth: "80%" }}>
                      <div style={{ backgroundColor: "#f7f7f7", padding: "1rem", borderRadius: "8px" }}>
                        Digitando...
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ padding: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ flex: 1, padding: "0.75rem", border: "1px solid #ccc", borderRadius: "4px", marginRight: "0.5rem" }}
                    placeholder="Digite sua mensagem..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    style={{ backgroundColor: "#f7b928", color: "white", padding: "0.75rem 1.5rem", borderRadius: "4px", border: "none", cursor: "pointer" }}
                    onClick={handleSendMessage}
                    disabled={isLoading}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
