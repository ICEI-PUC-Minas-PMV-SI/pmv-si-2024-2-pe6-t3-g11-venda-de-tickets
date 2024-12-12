import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

function Footer() {
  return (
    <footer className="d-flex justify-content-around footer p-0 m-0 pt-3">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div>
          <Link to="/">
            <img
              src={require("../../assets/logo-ticktag.svg").default}
              alt="Icon"
              width="100"
              height="50"
              title="home"
            />
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center social-icons">
          <div className="mx-2">X</div>
          <div className="mx-2">@</div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-3 social-icons">
        <ul className="nav">
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
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
