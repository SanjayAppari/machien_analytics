import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Company from './components/Company/Company';
import Machine from './components/Machine/Machine';
import DashBoard from './components/DashBoard/DashBoard';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/machines" element={<Company />}/>
        <Route path="/machine/:id" element={<Machine />} />
        <Route path="/dashboard" element={<DashBoard />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </Router>
  );
}

export default App;
