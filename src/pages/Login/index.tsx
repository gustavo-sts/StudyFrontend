import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

export function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginErrors>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginErrors> = {};

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Erro ao fazer login");
        }

        const data = await response.json();

        login(data.token, data.user);
        navigate("/app/dashboard");
      } catch (error) {
        alert(
          "Erro ao fazer login. Verifique suas credenciais e tente novamente."
        );
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, login, navigate]
  );

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Bem-vindo de volta!</h2>
        <p className="login-subtitle">
          Entre com sua conta para continuar seus estudos
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          <div>
            <label className="login-label">
              E-mail
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`login-input ${errors.email ? "login-input-error" : ""}`}
            />
            {errors.email && (
              <p className="login-error">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="login-label">
              Senha
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`login-input ${errors.password ? "login-input-error" : ""}`}
            />
            {errors.password && (
              <p className="login-error">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="login-links">
          <p>
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="login-link"
            >
              Cadastre-se
            </Link>
          </p>
          <Link
            to="#"
            className="login-forgot-password"
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </div>
    </div>
  );
}
