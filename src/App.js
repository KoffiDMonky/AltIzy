
import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './components/Navbar/Navbar';
import SignUpModal from './components/Modals/SignUpModal';
import SignInModal from './components/Modals/SignInModal';
import Private from './pages/Private/Private';
import PrivateHome from './pages/Private/PrivateHome/PrivateHome';
import Myaccount from './pages/Private/PrivateMyAccount/MyAccount';
import Footer from './components/Footer/Footer';
import MyApplication from './pages/Private/PrivateMyAccount/MyApplication';


function App() {
  return (
    <>
      <SignUpModal/>
      <SignInModal/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />}/>
          <Route path="/private/private-myapplication" element={<MyApplication />}/>
          <Route path="/private/private-myaccount" element={<Myaccount />}/>
        </Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
