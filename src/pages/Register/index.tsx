import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import "./Register.css";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.name) newErrors.name = "Nome é obrigatório";

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar conta");
      }

      const data = await response.json();

      login(data.token, data.user);
      navigate("/app/dashboard");

      alert("Conta criada com sucesso! Bem-vindo à plataforma de estudos.");
    } catch (error: unknown) {
      alert("Erro ao criar conta. Tente novamente mais tarde.");
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">
          Crie sua conta
        </h2>
        <p className="register-subtitle">
          Comece sua jornada de estudos hoje mesmo
        </p>

        <form
          onSubmit={handleSubmit}
          className="register-form"
        >
          {/* Nome */}
          <div>
            <label className="register-label">
              Nome completo
            </label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`register-input ${errors.name ? "register-input-error" : ""}`}
            />
            {errors.name && (
              <p className="register-error">
                {errors.name}
              </p>
            )}
          </div>

          {/* E-mail */}
          <div>
            <label className="register-label">
              E-mail
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`register-input ${errors.email ? "register-input-error" : ""}`}
            />
            {errors.email && (
              <p className="register-error">
                {errors.email}
              </p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="register-label">
              Senha
            </label>
            <div className="register-password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`register-input ${errors.password ? "register-input-error" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="register-password-toggle"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="register-error">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="register-label">
              Confirmar senha
            </label>
            <div className="register-password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={`register-input ${errors.confirmPassword
                    ? "register-input-error"
                    : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="register-password-toggle"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="register-error">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Botão de Registro */}
          <button
            type="submit"
            disabled={isLoading}
            className="register-button"
          >
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <p className="register-login-link">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="register-link"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
