import { useState, useEffect } from "react";
import { FaBell, FaSun, FaMoon, /* FaUserCircle */ } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export function Header() {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Alternar modo escuro/claro
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid #E2E8F0",
        padding: "16px 32px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {/* Botão de alternância de tema */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
          aria-label="Alternar tema"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notificações */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <FaBell style={{ fontSize: "18px" }} />
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              fontSize: "10px",
              borderRadius: "50%",
              padding: "3px 6px",
            }}
          >
            3
          </span>
        </div>

        {/* Menu do usuário */}
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px" }}>
                {user?.name}
              </p>
              <span
                style={{
                  background: user?.plan === "pro" ? "#6B46C1" : "#A0AEC0",
                  color: "white",
                  fontSize: "12px",
                  padding: "3px 6px",
                  borderRadius: "4px",
                }}
              >
                {user?.plan === "pro" ? "Pro" : "Free"}
              </span>
            </div>
          </div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "40px",
                background: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                minWidth: "150px",
                padding: "8px 0",
              }}
            >
              <p style={menuItemStyle}>Minha Conta</p>
              <p style={menuItemStyle}>Configurações</p>
              <p
                style={menuItemStyle}
                onClick={logout}
              >
                Sair
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Estilo dos itens do menu dropdown
const menuItemStyle = {
  padding: "10px 16px",
  cursor: "pointer",
  fontSize: "14px",
  color: "#333",
  transition: "background 0.2s",
};
