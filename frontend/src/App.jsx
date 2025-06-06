import React, { useEffect, useState } from "react";
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

  useEffect(()=>{
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if(loggedIn){
      setIsLoggedIn(true);
    }
  },[]);

  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <div>
        <nav className='nav'>
          <div className="nav-logo">
          <Link to="/">DGK Dining</Link>
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

        <nav className="nav_footer">
          <div className="footer_address">
            <div className="address-box">
              <dl>
                <dt>충무로점</dt>
                <dd>04620 서울특별시 중구로 1길 30 동국대학교 옆</dd>
                <dd>TEL : 02-2260-3114</dd>
              </dl>
              <dl>
                <dt>남산타워점</dt>
                <dd>04340 서울 용산구 남산공원길 105</dd>
                <dd>TEL : 02-756-2486</dd>
              </dl>
            </div>
            <div className="nav-logo"><Link to="/">DGK Dining</Link></div>
          </div>
          <div className="footer_copy">
            <span className="copy">
            Copyright(c) DONGGUK UNIVERSITY. ALL RIGHTS RESERVED.
            </span>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;