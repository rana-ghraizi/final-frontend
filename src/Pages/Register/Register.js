import React, { useState } from "react";
import login from "../../Images/image_8-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Login = () => {
  let navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        "https://artistic-u8a3.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            address,
            phonenumber,
            role,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("Id", data.user);
      if (data.role === "User") {
        navigate("/");
      }
      console.log("Registration successful");
      sessionStorage.setItem("role", data.role);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-wrapper-container">
        <div className="login-content">
          <h1 className="login-content-h1">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Yellowtail"
            />
            Hello!
          </h1>
          <p className="login-content-p">
            Do have an account, login{" "}
            <Link to={"/login"} className="login-a">
              here!
            </Link>
          </p>
          <form className="login-form" onSubmit={handleRegister}>
            {step === 1 && (
              <div>
                <div className="username">
                  <label className="about-username">Username:</label>
                  <input
                    className="username-input"
                    type="text"
                    placeholder="Enter your username"
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
                    placeholder="Enter your password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="next-button"
                >
                  Next
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="username">
                  <label className="about-username">Address:</label>
                  <input
                    className="username-input"
                    type="text"
                    placeholder="Enter your address"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="username">
                  <label className="about-username">Phone Number:</label>
                  <input
                    className="username-input"
                    type="text"
                    placeholder="Enter your phone number"
                    id="phone-number"
                    name="phonenumber"
                    value={phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="username">
                  <label className="about-username">Role:</label>
                  <select
                    className="username-select"
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="user">Customer</option>
                    <option value="artist">Artist</option>
                  </select>
                </div>
                {error && <p className="error-message"> {error}</p>}
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="previous-button"
                >
                  Previous
                </button>

                <button className="register-button" type="submit">
                  Register
                </button>
              </div>
            )}
          </form>
        </div>
        <div className="login-image">
          <img src={login} alt="login-pic" className="login-image-img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
