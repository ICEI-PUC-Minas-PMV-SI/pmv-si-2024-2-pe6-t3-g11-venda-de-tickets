import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate("/register");

  const handleClickRegistrar = () => {
    navigate("/register");
  };

  const handleClick = () => {
    navigate("/criar-evento");
  };

  return (
    <header className="Home-header d-flex justify-content-between align-items-center p-3 border">
      <div>
        <Link to="/home">
          <img
            src={require("../../assets/logo-ticktag.svg").default}
            alt="Icon"
            width="100"
            height="50"
            title="home"
          />
        </Link>
      </div>
      <nav>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/catalogo" className="nav-link">
              Catálogo
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/politica" className="nav-link">
              Políticas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contato" className="nav-link">
              Contato
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/carrinho" className="nav-link">
              Carrinho
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tickets" className="nav-link">
              Tickets
            </Link>
          </li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="btn btn-outline-primary me-2" onClick={handleClick}>
          Criar Evento
        </button>
        <button className="btn btn-primary" onClick={handleClickRegistrar}>
          Registrar
        </button>
      </div>
    </header>
  );
}

export default Navbar;
