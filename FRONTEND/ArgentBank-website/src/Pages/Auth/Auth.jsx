import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../../redux/Auth.slice";


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
          email: usernameInput.value,
          password: passwordInput.value,
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
      setError("An error occured, please try again later.");
    }
  };

  const rememberUser = () => {
    if (rememberMe) {
      const localUser = {
        email: usernameInput.value,
        password: passwordInput.value,
        rememberMe: rememberInput.checked,
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
   
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
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
              <i
                className={
                  passwordVisibility
                    ? "fa-solid fa-eye"
                    : "fa-solid fa-eye-slash"
                }
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              ></i>
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
   
  );
};

export default Auth;