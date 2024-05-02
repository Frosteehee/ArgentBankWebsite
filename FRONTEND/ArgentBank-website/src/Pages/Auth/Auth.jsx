//Page de Login 

import { useEffect, useState } from "react";//  importation de useEffect et useState
import { useDispatch } from "react-redux";//importation de useDispatch
import { useNavigate } from "react-router-dom"; //importation de useNavigate
import { setToken, setUser } from "../../redux/Auth.slice"; //importation des fonctions setToken et setUser


const Auth = () => {
  const dispatch = useDispatch();
  const naviguate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberInput = document.getElementById("remember-me");

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));//On récupère les données de l'utilisateur enregistré dans le local storage
    if (localUser) {//Si l'utilisateur est enregistré dans le local storage, on récupère ses données
      setEmail(localUser.email);
      setPassword(localUser.password);
      setRememberMe(localUser.rememberMe);
    }
  }, []);

  const fetchToken = async () => {//Fonction pour récupérer le token
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({//On envoie les données de l'utilisateur
          email: usernameInput.value,
          password: passwordInput.value,
        }),
      });
      const data = await response.json();
      return data.body.token;//On récupère le token
    } catch (error) {
      setError("Password or Email is incorrect.");
    }
  };
  const fetchUserDatas = async (token) => {//Fonction pour récupérer les données de l'utilisateur
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
      return data.body;//On récupère les données de l'utilisateur
    } catch (error) {
      setError("An error occured, please try again later.");
    }
  };

  const rememberUser = () => {//Fonction pour se souvenir de l'utilisateur
    if (rememberMe) {//Si l'utilisateur a coché la case "Remember me", on enregistre ses données dans le local storage
      const localUser = {
        email: usernameInput.value,
        password: passwordInput.value,
        rememberMe: rememberInput.checked,
      };
      localStorage.setItem("user", JSON.stringify(localUser));//On enregistre les données de l'utilisateur dans le local storage
    } else {
      localStorage.removeItem("user");
    }
  };

  const handleSubmit = async (e) => {//Fonction pour soumettre le formulaire
    e.preventDefault();

    if (!email || !password) {//Si les champs Email et Password ne sont pas remplis, on affiche un message d'erreur
      setError("Please fill in Email and Password fields.");
    } else {
      setError("");
      // Fetch et dispatch pour le token
      const token = await fetchToken();
      dispatch(setToken(token));
      // Fecth et dispatch de la data USER
      const userDatas = await fetchUserDatas(token);
      dispatch(setUser(userDatas));
      // Gestion session / Se souvenir de l'utilisateur
      rememberUser();
      // Redirection vers la page profil
      naviguate("/profile");
    }
  };

  return (
   <div className="bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={email}//On affiche l'email de l'utilisateur
              onChange={(e) => {//On récupère l'email de l'utilisateur
                setError("");
                setEmail(e.target.value);//On récupère l'email de l'utilisateur
                setRememberMe(false);//On décoche la case "Remember me"
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
              <i
                className={
                  passwordVisibility//On affiche l'oeil barré si le mot de passe est caché et l'oeil ouvert si le mot de passe est visible (probleme d'importation de fontawesome, dont know why)
                    ? "fa-solid fa-eye"
                    : "fa-solid fa-eye-slash"
                }
                onClick={() => setPasswordVisibility(!passwordVisibility)}//On affiche ou on cache le mot de passe
              ></i>
            </div>
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}//On coche ou on décoche la case "Remember me"
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