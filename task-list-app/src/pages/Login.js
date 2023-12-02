import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import logo from '../Logo.png';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    const data = { username: username, password: password };
    axios.post("http://localhost:3001/users/login", data).then((response) => {
      if (!response.data.error) {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      } else {
        alert(response.data.error);
      }
    });
  };

  return (
    <div className="loginContainer">
      <img src={logo} alt="Logo" className="logo-img" />
      <label>Username</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;
