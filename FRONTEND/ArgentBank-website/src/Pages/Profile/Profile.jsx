import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Account from "../../components/Account/Account";
import bankAccountData from "../../data/bankAccountData.json"; // Import du fichier JSON
import { editUsername } from "../../redux/Auth.slice";
import "./Profile.scss";

const Profile = () => {
    const user = useSelector((state) => state.user); //On récupère les données de l'utilisateur
    const dispatch = useDispatch();
    const [editUser, setEditUser] = useState(false); //On initialise la variable editUser à false parce que l'utilisateur ne modifie pas son nom
    const [username, setUsername] = useState(user.userName); //On initialise la variable username avec le nom de l'utilisateur connecté par défaut

    const handleUsernameSubmit = async () => { //Fonction pour modifier le nom de l'utilisateur
        dispatch(editUsername(username));
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    userName: username,
                }),
            });
            if (response.ok) {
                console.log("Username updated successfully!"); // Message de confirmation dans la console
            } else {
                console.error("Failed to update username");
            }
        } catch (error) {
            console.error("An error occurred while updating username:", error);
        }
    };

    // Filtrer les données bancaires pour ne montrer que celles de l'utilisateur connecté
    const userBankAccountData = bankAccountData.filter(data => data.email === user.email);

    return (
        <>
            {!user || !user.isConnected ? ( //Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion 
                <Navigate to="/" />
            ) : (
                <div className="profile">
                    <div className="headerAccount">
                        {!editUser ? (
                            <>
                                <h1>
                                    Welcome back
                                    <br />
                                    {user.firstName} {user.lastName}
                                </h1>
                                <button
                                    className="edit-button"
                                    onClick={() => {
                                        setEditUser(true);
                                        setUsername(user.userName);
                                    }}
                                >
                                    Edit Name
                                </button>
                            </>
                        ) : (
                            <>
                                <h1>Edit Username</h1>
                                <form onSubmit={(e) => {
                                    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
                                    handleUsernameSubmit(); // Appel de la fonction de soumission du formulaire
                                    setEditUser(false); // Mettre editUser à false après la soumission
                                }}>
                                    <section className="inputContainer">
                                        <div className="username">
                                            <label htmlFor="username">Username</label>
                                            <input
                                                id="username"
                                                type="text"
                                                value={username}
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="firstname">
                                            <label htmlFor="firstname">Firstname</label>
                                            <input
                                                id="firstname"
                                                type="text"
                                                value={user.firstName}
                                                disabled
                                            />
                                        </div>
                                        <div className="lastname">
                                            <label htmlFor="lastname">Lastname</label>
                                            <input
                                                id="lastname"
                                                type="text"
                                                value={user.lastName}
                                                disabled
                                            />
                                        </div>
                                    </section>
                                    <section className="buttonsContainer">
                                        <button
                                            type="submit"
                                            className="edit-button"
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="edit-button cancel"
                                            onClick={() => setEditUser(false)}
                                        >
                                            Cancel
                                        </button>
                                    </section>
                                </form>
                            </>
                        )}
                    </div>

                    <h2 className="sr-only">Accounts</h2> 
                    {userBankAccountData.map((userData, index) => (
                        <div key={index}>
                            <h2>{userData.email}</h2>
                            {userData.accounts.map((account, index) => (
                                <Account
                                    key={index}
                                    title={account.type}
                                    amount={account.balance}
                                    description={account.description}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Profile;
