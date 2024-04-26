import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Account from "../../components/Account/Account";
import bankAccountData from "../../data/bankAccountData.json"; // Import du fichier JSON
import { editUsername } from "../../redux/Auth.slice";
import "./Profile.scss";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState(false);
  const [username, setUsername] = useState(user.userName);

  const handleUsernameSubmit = async () => {
    dispatch(editUsername(username));
    await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        userName: username,
      }),
    });
  };

  return (
    <>
      {!user || !user.isConnected ? (
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
                <form>
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
                      className="edit-button"
                      onClick={() => {
                        setEditUser(false);
                        handleUsernameSubmit();
                      }}
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
          {bankAccountData.map((userData, index) => (
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
