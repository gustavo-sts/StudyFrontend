import { useState } from "react";
import { FaBell, /* FaUserCircle */ } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { ColorModeButton } from "../ui/color-mode";

export function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: "var(--background-color)",
        borderBottomStyle: "solid",
        borderBottomColor: "var(--border-color)",
        borderBottomWidth: "1px",
        padding: "16px 32px",
        position: "sticky",
        top: 0,
        zIndex: 0,
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
        <ColorModeButton />

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
                backgroundColor: "var(--background-color)",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                minWidth: "150px",
                padding: "8px 0",
                zIndex: 1
              }}
            >
              <p style={{...menuItemStyle, color: "var(--text-color)"}}>Minha Conta</p>
              <p style={{...menuItemStyle, color: "var(--text-color)"}}>Configurações</p>
              <p
                style={{...menuItemStyle, color: "var(--text-color)"}}
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
  transition: "background 0.2s",
};
