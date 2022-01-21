
import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './composants/Navbar';
import SignUpModal from './composants/SignUpModal';
import SignInModal from './composants/SignInModal';
import Private from './pages/Private/Private';
import PrivateHome from './pages/Private/PrivateHome/PrivateHome';


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
        </Route>
      </Routes>
    </>
  );
}

export default App;
