//Hero image centrale avec du texte
import { Link } from "react-router-dom";

import "./Hero.scss";


const Hero = () => {
        return (
            <figure id="hero" loading="lazy"> 
                <figcaption>
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                           {/* Ajout du lien vers la page SignUp */}
        <Link to="/signup" className="signup-link">Sign Up</Link>
                </figcaption>
            </figure>
        );
    }
    

  export default Hero;

  //Ajout de Lazy pour amelioration des performances