import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "./hooks/useAuthentication";

import { useState, useEffect } from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Object from "./pages/Object";
import Write from "./pages/Write";
import Edit from "./pages/Edit";
import About from "./pages/About.jsx";

import "./style.scss";
import Search from "./pages/search/Search";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="app">
      <AuthProvider value={{ user }}>
        <div className="container">
          <Router>
            {user && <Navbar />}
            <Routes>
              <Route path="/login" element={user ? <Home /> : <Login />} />
              <Route path="/register" element={!user ? <Register /> : <Home />}/>
              <Route path="/" element={user ? <Home /> : <Login/>} />
              <Route path="/object/:id" element={user ? <Object /> : <Login/>} />
              <Route path="/write" element={user ? <Write /> : <Login />} />
              <Route path="/edit/:id" element={user ? <Edit /> : <Login />} />
              <Route path="/about" element={user ? <About /> : <Login/>} />
              <Route path="/search" element={user ? <Search /> : <Login/>} />
            </Routes>
          </Router>
          {user && <Footer />}
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
