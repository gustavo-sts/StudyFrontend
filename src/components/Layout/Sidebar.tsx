import { useAuth } from "../../hooks/useAuth";
import {
  FaHome,
  FaBook,
  FaRegLightbulb,
  FaChartLine,
  FaCalendarAlt,
  FaTasks,
  FaRobot,
  FaFileAlt,
  FaQuestionCircle,
} from "react-icons/fa";

// Componente de Item de Navegação
interface NavItemProps {
  icon: any;
  children: React.ReactNode;
  to: string;
  isPremium?: boolean;
}

function NavItem({ icon: Icon, children, to, isPremium }: NavItemProps) {
  return (
    <a
      href={to}
      className="nav-item"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px",
        borderRadius: "8px",
        textDecoration: "none",
        color: "var(--text-color)",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--hover-color)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <Icon style={{ fontSize: "20px", marginRight: "10px" }} />
      <span style={{ flex: "1" }}>{children}</span>
      {isPremium && (
        <span
          style={{
            backgroundColor: "#805AD5",
            color: "white",
            padding: "3px 8px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          Premium
        </span>
      )}
    </a>
  );
}

// Componente da Barra Lateral
export function Sidebar() {
  const { user } = useAuth();
  const hasPremiumAccess = user?.plan === "premium" || user?.plan === "pro";

  return (
    <aside
      style={{
        width: "280px",
        height: "100vh",
        background: "var(--background-color)",
        borderRightWidth: "1px",
        borderRightStyle: "solid",
        borderRightColor: "var(--border-color)",
        padding: "32px 0px",
        position: "sticky",
        top: 0,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{padding: "0 20px"}}>
          <NavItem
            icon={FaHome}
            to="/app/dashboard"
          >
            Dashboard
          </NavItem>
          <NavItem
            icon={FaBook}
            to="/app/study-plan"
          >
            Plano de Estudos
          </NavItem>
          <NavItem
            icon={FaRegLightbulb}
            to="/app/flashcards"
            isPremium={!hasPremiumAccess}
          >
            Flashcards IA
          </NavItem>
          <NavItem
            icon={FaQuestionCircle}
            to="/app/questions"
          >
            Questões
          </NavItem>
          <NavItem
            icon={FaChartLine}
            to="/app/performance"
          >
            Desempenho
          </NavItem>
        </div>

        <hr
          style={{
            width: "100%",
            margin: "16px 0",
            borderColor: "var(--border-color)",
          }}
        />

        <div style={{padding: "0 20px"}}>
          <NavItem
            icon={FaCalendarAlt}
            to="/app/calendar"
          >
            Calendário
          </NavItem>
          <NavItem
            icon={FaTasks}
            to="/app/planner"
          >
            Planner
          </NavItem>
        </div>

        <hr style={{ margin: "16px 0", borderColor: "var(--border-color)" }} />
        
        <div style={{padding: "0 20px"}}>
          <NavItem
            icon={FaRobot}
            to="/app/ai-chat"
            isPremium={!hasPremiumAccess}
          >
            Chat IA
          </NavItem>
          <NavItem
            icon={FaFileAlt}
            to="/app/summaries"
            isPremium={!hasPremiumAccess}
          >
            Resumos IA
          </NavItem>
        </div>
      </div>
    </aside>
  );
}
