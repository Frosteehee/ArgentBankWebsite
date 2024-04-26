import logo from "../../assets/images/argentBankLogo.png";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";
const NavBar = () => {
  
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        {/* Logo d'Argent Bank */}
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div className="login">
      <i className="fa fa-user-circle"></i>
        {/* Rendu conditionnel du bouton Sign In / Sign Out */}
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
