import logo from "../../assets/images/argentBankLogo.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./NavBar.scss";

const NavBar = () => {
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
        {localStorage.getItem("token") ? (
          <NavLink className="main-nav-item" to="/" onClick={() => localStorage.removeItem("token")}>
            Sign Out
          </NavLink>
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


// je voudrais que le nom de l'utilisateur soit affiché à la coté de Sign In quand il est connecté
// pour cela je vais utiliser le composant UserContext
// importer UserContext et useContext
// useContext pour récupérer les données de UserContext
// je vais utiliser le destructuring pour récupérer les données de UserContext
// pour afficher le nom de l'utilisateur à coté de Sign In
// + un lien vers la page de profil de l'utilisateur

// Path: FRONTEND/ArgentBank-website/src/components/NavBar/NavBar.jsx
// Compare this snippet from FRONTEND/ArgentBank-website/src/components/Account/Account.jsx:
// //Composant Account qui permet d'afficher les informations d'un compte bancaire