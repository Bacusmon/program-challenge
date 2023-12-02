import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreateTask from './pages/CreateTask';
import Login from './pages/Login';
import Task from './pages/Task';
import Registration from './pages/Registration';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import logo from './Logo.png';
import logo2 from './Logo2.png';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from "axios";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { TfiInstagram } from "react-icons/tfi";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
             ...authState, status: false
          });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.replace('/');
  }
  
  return (
    <div id="root">
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <div className='navbar'>
          <div className='navbar-content'>
          <div className="logo"
            onClick={() => (window.location.href = '/')}
            style={{ cursor: 'pointer' }}
                >
              <img src={logo} alt="Logo" className="logo-img" />
          </div>
          {authState.username && <h1>Hello, {authState.username}</h1>}
          <div className="dropdown">
            <button className="menu-btn">
              Menu
              <span className="down-arrow"></span>
            </button>
            <div className="dropdown-content">
                {!authState.status ? (
                  <>
                    <Link to="/login"> Login</Link>
                    <Link to="/registration"> Registration</Link>
                  </>
                ) : (
                    <>
                    <Link to="/">Home Page</Link>
                    <Link to="/createtask">Create Task</Link> 
                  </>
                )}
                {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          </div>
          </div>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createtask" element={<CreateTask />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
          </Routes>
          <div className="footer">
          <div className='footer-content'>
        <div className="footer-column">
          <img src={logo2} alt="Logo" className="footer-logo" />
        </div>

        <div className="footer-column">
          <h3>FOR PARENTS</h3>
          <ul>
            <li>Parent Resources</li>
            <li>How It Works</li>
            <li>Testimonials</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>FOR PROVIDERS</h3>
          <ul>
            <li>Provider Resources</li>
            <li>How It Works</li>
            <li>Testimonials</li>
            <li>Terms and Conditions</li>
            <li>List Your Program</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>MORE</h3>
          <ul>
            <li>About Us</li>
            <li>Press</li>
            <li>Jobs</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-column">
          <div className="social-media-icons">
            <FaFacebookF className='icon' />
            <FaTwitter className='icon' />
            <TfiInstagram className='icon' />
          </div>
          <button className="help-center-button">Help Center</button>
          </div>
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
      </div>
    </div>  
  );
}

export default App;
