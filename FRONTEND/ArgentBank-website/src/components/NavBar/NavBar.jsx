import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Auth.slice";
import logo from "../../assets/images/argentBankLogo.png";
import "./NavBar.scss";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté lors du chargement du composant
    if (token) {
      setIsLoggedIn(true);
      setUserName(user?.userName || 'Your Account'); // Utilise le PSEUDO de l'utilisateur ou "Your Account" si non défini
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [token, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      {/* Logo Argent Bank */}
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div className="login">
        {/* Icône utilisateur et nom */}
        {isLoggedIn && (
          <div className="user-info">
            {/* Lien vers la page Profile */}
            <NavLink to="/Profile" className="userName">
              <FontAwesomeIcon className="user-icon" icon={faUserCircle} />
              <p>{userName}</p>
            </NavLink>
          </div>
        )}

        {/* Bouton Sign In / Sign Out */}
        {isLoggedIn ? (
          <NavLink className="main-nav-item" onClick={handleLogout}>
            <FontAwesomeIcon className="sign-out-icon" icon={faSignOutAlt} />
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
