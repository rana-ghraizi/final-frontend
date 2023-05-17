import React, { useState } from "react";
import "./Login.css";
import login from "../../Images/image_8-removebg-preview.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("Id", data.user);
      sessionStorage.setItem("role", data.role);
      // if (data.role === "User") {
      window.location.href = "/";
      // }
      console.log("Login successful");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-wrapper-container">
        <div className="login-content">
          <h1 className="login-content-h1">Welcome Back!</h1>
          <p className="login-content-p">
            Don't have an account, sign up <a href="/register" className="login-a">here!</a>
          </p>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="username">
              <label className="about-username">Username:</label>
              <input
                className="username-input"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="username">
              <label className="about-username">Password:</label>
              <input
                className="username-input"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              {error && <p className="error-message"> Invalid Credentials</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="login-image">
          <img src={login} alt="login-pic" />
        </div>
      </div>
    </div>
  );
};

export default Login;
