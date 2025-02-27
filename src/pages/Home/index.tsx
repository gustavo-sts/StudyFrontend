import { Link } from "react-router-dom";
import {
  FaRobot,
  FaBook,
  FaBrain,
  FaChartLine,
  FaCalendarAlt,
  FaCrown,
} from "react-icons/fa";
import { JSX } from "react";
import "./Home.css";

interface FeatureProps {
  title: string;
  text: string;
  icon: JSX.Element;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <div className="home-feature fade-in">
      <div className="home-feature-icon">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

interface PriceProps {
  title: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

const PriceCard = ({ title, price, features, recommended }: PriceProps) => {
  return (
    <div className={`price-card ${recommended ? "recommended" : ""} fade-in`}>
      {recommended && (
        <div className="price-card-recommended-label">
          Recomendado
        </div>
      )}
      <h3>{title}</h3>
      <p className="price">{price}</p>
      <p>por mês</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <Link to="/register">
        <button>
          Começar Agora
        </button>
      </Link>
    </div>
  );
};

export function Home() {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="home-hero">
        <h1>Sua Plataforma Completa de Estudos</h1>
        <p>
          Prepare-se para o ENEM, concursos e muito mais com nossa plataforma
          inteligente.
        </p>
        <div>
          <Link to="/register">
            <button className="primary">
              Começar Gratuitamente
            </button>
          </Link>
          <Link to="/login">
            <button className="secondary">
              Fazer Login
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="home-features fade-in">
        <h2>Recursos Exclusivos</h2>
        <div className="home-features-grid">
          <Feature
            icon={
              <FaRobot
                size={32}
                color="white"
              />
            }
            title="IA Avançada"
            text="Flashcards e resumos gerados por IA."
          />
          <Feature
            icon={
              <FaBook
                size={32}
                color="white"
              />
            }
            title="Planos de Estudo"
            text="Planos personalizados para você."
          />
          <Feature
            icon={
              <FaBrain
                size={32}
                color="white"
              />
            }
            title="Questões Comentadas"
            text="Banco de questões com explicações."
          />
          <Feature
            icon={
              <FaChartLine
                size={32}
                color="white"
              />
            }
            title="Monitor de Desempenho"
            text="Acompanhe seu progresso."
          />
          <Feature
            icon={
              <FaCalendarAlt
                size={32}
                color="white"
              />
            }
            title="Gestão do Tempo"
            text="Calendário e planner para organizar sua rotina."
          />
          <Feature
            icon={
              <FaCrown
                size={32}
                color="white"
              />
            }
            title="Recursos Premium"
            text="Acesso a funcionalidades exclusivas."
          />
        </div>
      </div>

      {/* Pricing Section */}
      <div className="home-pricing fade-in">
        <h2>Planos que Cabem no seu Bolso</h2>
        <p>Escolha o plano ideal para suas necessidades.</p>
        <div className="home-pricing-cards">
          <PriceCard
            title="Free"
            price="R$ 0"
            features={[
              "Plano de estudos básico",
              "Banco de questões limitado",
              "Calendário de estudos",
              "Planner básico",
            ]}
          />
          <PriceCard
            title="Premium"
            price="R$ 29,90"
            recommended
            features={[
              "Tudo do plano Free",
              "Flashcards com IA",
              "Chat IA para dúvidas",
              "Plano de estudos avançado",
              "Questões ilimitadas",
            ]}
          />
          <PriceCard
            title="Pro"
            price="R$ 49,90"
            features={[
              "Tudo do plano Premium",
              "Resumos ilimitados com IA",
              "Mentoria personalizada",
              "Recursos exclusivos",
              "Prioridade no suporte",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
