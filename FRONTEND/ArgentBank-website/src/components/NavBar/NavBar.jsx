import logo from "../../assets/images/argentBankLogo.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react"; // Import du useState pour gérer l'état local
import "./NavBar.scss";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Utilisation d'un état local pour suivre l'état de connexion

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Met à jour l'état local après la déconnexion
  };

  return (
    <nav className="main-nav">
      {/* Logo Argent Bank */}
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div className="login">
        {/* Icône utilisateur */}
        <FontAwesomeIcon icon={faUserCircle} />

        {/* Bouton Sign In / Sign Out */}
        {isLoggedIn ? (
          <button className="main-nav-item" onClick={handleLogout}>
            Sign Out
          </button>
        ) : (
          <NavLink className="main-nav-item" to="/Auth">
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
