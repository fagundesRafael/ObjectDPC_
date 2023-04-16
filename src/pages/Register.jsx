import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { db } from "../firebase/config";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    const user = {
      displayName,
      email,
      password,
    };

    const res = await createUser(user)

    console.log(res)
  };

  useEffect(() => {
    setError(authError)
    console.log(db)
  }, [authError])


  return (
    <div className="auth">
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="informe um usuário"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="informe um email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="crie uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="repita a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!loading ? (<button>Criar conta</button>) : (<button className="loadingBTN" disabled>Aguarde...</button>)}
        {error && <p>{error}</p>}
        <span>
          Já possui uma conta registrada?{" "}
          <Link to="/login">Entre com sua conta!</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
