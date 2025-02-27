import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f7f7",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Crie sua conta
        </h2>
        <p style={{ textAlign: "center", color: "#666" }}>
          Comece sua jornada de estudos hoje mesmo
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {/* Nome */}
          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>
              Nome completo
            </label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{
                width: "100%",
                padding: "0.5rem",
                border: errors.name ? "2px solid red" : "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {errors.name && (
              <p style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* E-mail */}
          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>
              E-mail
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={{
                width: "100%",
                padding: "0.5rem",
                border: errors.email ? "2px solid red" : "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>
              Senha
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: errors.password ? "2px solid red" : "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>
              Confirmar senha
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: errors.confirmPassword
                    ? "2px solid red"
                    : "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Botão de Registro */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Já tem uma conta?{" "}
          <Link
            to="/login"
            style={{ color: "#007bff" }}
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
