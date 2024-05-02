import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../redux/Auth.slice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import des icônes nécessaires depuis Font Awesome
import "./Auth.scss";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Correction de la faute de frappe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setEmail(localUser.email);
      setPassword(localUser.password);
      setRememberMe(localUser.rememberMe);
    }
  }, []);

  const fetchToken = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      return data.body.token;
    } catch (error) {
      setError("Password or Email is incorrect.");
    }
  };

  const fetchUserDatas = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      return data.body;
    } catch (error) {
      setError("An error occurred, please try again later.");
    }
  };

  const rememberUser = () => {
    if (rememberMe) {
      const localUser = {
        email: email,
        password: password,
        rememberMe: rememberMe,
      };
      localStorage.setItem("user", JSON.stringify(localUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in Email and Password fields.");
    } else {
      setError("");
      const token = await fetchToken();
      dispatch(setToken(token));
      const userDatas = await fetchUserDatas(token);
      dispatch(setUser(userDatas));
      rememberUser();
      navigate("/profile"); // Correction de la faute de frappe
    }
  };

  return (
    <div className="bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" /> {/* Utilisation de l'icône faUserCircle */}
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
                setRememberMe(false);
                setPassword("");
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <div className="passwordWrapper">
              <input
                type={passwordVisibility ? "password" : "text"}
                id="password"
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
              />
              <FontAwesomeIcon
                icon={passwordVisibility ? faEye : faEyeSlash} // Utilisation des icônes faEye et faEyeSlash pour le bouton de visibilité du mot de passe
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              />
            </div>
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
          {error && <span className="errorDisplay">{error}</span>}
        </form>
      </section>
    </div>
  );
};

export default Auth;
