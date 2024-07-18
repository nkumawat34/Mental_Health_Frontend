import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes,Router } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Registeration from './components/Registeration';
import StoriesPage from './components/StoriesPage';
import Footer from './components/footer';
import About from './components/About'
import Contact from './components/Contact';
import Profile from './components/Profile'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/registeration' element={<Registeration/>}/>
      <Route exact path='/stories' element={<StoriesPage/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/contact" element={<Contact/>}/>
      <Route exact path="/profile" element={<Profile/>}/>
     
    </Routes>
    <Footer/>
  </BrowserRouter>
  );
}

export default App;
