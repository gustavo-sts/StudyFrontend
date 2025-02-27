import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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
          Bem-vindo de volta!
        </h2>
        <p style={{ textAlign: "center", color: "#666" }}>
          Entre com sua conta para continuar seus estudos
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

          <div>
            <label style={{ fontWeight: "bold", display: "block" }}>
              Senha
            </label>
            <input
              type="password"
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
            {errors.password && (
              <p style={{ color: "red", fontSize: "0.875rem" }}>
                {errors.password}
              </p>
            )}
          </div>

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
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <p>
            Não tem uma conta?{" "}
            <Link
              to="/register"
              style={{ color: "#007bff" }}
            >
              Cadastre-se
            </Link>
          </p>
          <Link
            to="#"
            style={{ color: "#007bff", display: "block", marginTop: "0.5rem" }}
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </div>
    </div>
  );
}
