import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import DateselectPage from './pages/DateSelectPage';
import SeatSelectedPage from "./pages/SeatSelectPage";
import InformationInputPage from "./pages/InformationInputPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ReservationCancelPage from "./pages/ReservationCancelPage";
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logout() {
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <div>
        <nav className='nav'>
          <div className="nav-logo">
            <Link to="/">LOGO</Link>
          </div>
          <div className="nav-buttons">
            {!isLoggedIn ? (
              <div>
                <Link to="login">Login</Link>
                <Link to="signup">Sign Up</Link>
              </div>
            ) : (
              <div>
                <Link to="/" className="logout-button" onClick={logout}>
                  Log out
                </Link>
                <Link to="date_reservation">Reserve</Link>
                <Link to="cancel">Cancel</Link>
              </div>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="date_reservation" element={<DateselectPage />} />
          <Route path="seat_reservation" element={<SeatSelectedPage />} />
          <Route path="information_input" element={<InformationInputPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage onLoginStateChange={setIsLoggedIn} />} />
          <Route path="cancel" element={<ReservationCancelPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;