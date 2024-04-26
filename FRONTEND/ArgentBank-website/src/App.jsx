// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
// il faut importer le fournisseur Redux 

import { Provider } from 'react-redux';

import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Auth from './Pages/Auth/Auth';
import Profile from './Pages/Profile/Profile';
import Header from "./components/Header/Header";
import store from './redux/store'; 
const App = () => { //changement function App() par const App = () => { ?
  return (
   <Provider store={store}> {/* il faut envelopper l' application avec le fournisseur Redux à verifier*/}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
   </Provider>
  )
}

export default App;
