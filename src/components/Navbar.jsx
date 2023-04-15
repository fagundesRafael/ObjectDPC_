import React from "react";
import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../contexts/AuthContext";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav>
      <div className="title">
        <NavLink to="/">ObjectDPC_</NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/">Início</NavLink>
        </li>
        <li>
          <NavLink to="/write">Inserir</NavLink>
        </li>
        <li>
          <NavLink to="/about">Sobre</NavLink>
        </li>
        <li>
          {user ? (
            <button onClick={logout}>Sair</button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
