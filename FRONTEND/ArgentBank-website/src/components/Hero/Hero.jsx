//Hero image centrale avec du texte


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
                </figcaption>
            </figure>
        );
    }
    

  export default Hero;

  //Ajout de Lazy pour amelioration des performances