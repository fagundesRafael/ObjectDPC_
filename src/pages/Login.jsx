import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    console.log(authError);
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="auth">
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="email"
          placeholder="email de usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!loading ? (<button>Acessar</button>) : (<button className="loadingBTN" disabled>Aguarde...</button>)}
        {error && <p>{error}</p>}
        <span>
          Não tem ainda uma conta registrada?{" "}
          <Link to="/register">Crie uma conta!</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
