import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Auth from './Pages/Auth/Auth';
import Profile from './Pages/Profile/Profile';
import Error from './Pages/Error/Error';
import Header from "./components/Header/Header";
import SignUp from "./Pages/SignIn/SignUp";
import store from './redux/store'; 
const App = () => { 
  return (
   <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/SignUp" element={<SignUp />} /> {/* Ajout de la route SignUp */}  
          <Route path="*" element={<Error />} /> {/* Ajout de la route Error */}
        </Routes>
        <Footer />
      </BrowserRouter>
   </Provider>
  )
}

export default App;
