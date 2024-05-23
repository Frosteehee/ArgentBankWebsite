//Composant Account qui permet d'afficher les informations d'un compte bancaire

import { PropTypes } from "prop-types";


const Account = ({title,amount,description}) => {//On récupère les props title, amount et description du composant Account
  return (
    <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">{title}</h3>
          <p className="account-amount">{amount}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className={"transaction-button"} >View transactions</button>
        </div>
      </section>
  );// quand je click sur le bouton je veux que l'utilisateur sois redirigé vers la page/composants des transactions
};
Account.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default Account;