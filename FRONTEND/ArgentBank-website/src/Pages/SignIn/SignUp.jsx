import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/Auth.slice.js'; // Assurez-vous d'importer l'action signUpUser appropriée depuis votre code Redux
import './SignUp.scss';

const SignUp = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userName: ''
  });
  //Ajouter un moyen de notification/gerer les formulaires invalides ?
// Fonction pour mettre à jour le state local avec les valeurs des champs de formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpUser(formData));
  };

  return (
    <div>
        
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
              <label htmlFor="email">Mail</label>
              <input type="email" id="email" onChange={handleChange} aria-required="true" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={handleChange} aria-required="true" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First name</label>
              <input type="text" id="firstName" onChange={handleChange} aria-required="true" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last name</label>
              <input type="text" id="lastName" onChange={handleChange} aria-required="true" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="userName">Username</label>
              <input type="text" id="userName" onChange={handleChange} aria-required="true" required />
            </div>
            <button type="submit" className="sign-in-button">
              Sign Up
            </button>
          </form>
    </div>
  );
};

export default SignUp;
