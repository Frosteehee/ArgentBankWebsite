import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/Auth.slice.js';
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const responseData = await response.json();
      
      // Dispatch l'action signUpUser avec les données de la réponse
      dispatch(signUpUser(responseData));

      // Rediriger vers une autre page après une inscription réussie
      window.location.href = '/Auth'; // Redirection vers la page d'accueil
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
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
