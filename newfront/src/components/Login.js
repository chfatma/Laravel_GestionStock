import React, { useState } from "react";
import api from "../api"; // Import your axios instance
import "../styles/Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null); // Reset error message when toggling forms
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message

    try {
      const response = await api.post("/login", { email, password });
      if (response.status === 200) {
        setIsAuthenticated(true); // Set authentication state
        // Optionally, store user info or token
        // localStorage.setItem('token', response.data.token);
      }
    } catch (err) {
      setError("Invalid email or password"); // Set error message
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Reset error message
  
    try {
      const response = await api.post("/users", {
        name: `${firstName} ${lastName}`,
        email,
        password, // Role is not sent, so Laravel will default to "admin"
      });
  
      if (response.status === 201) {
        setEmail(email);
        setPassword(password);
        handleLogin(e); // Auto login after signup
      }
    } catch (err) {
      console.error(err.response?.data); // Log error
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };
  

  return (
    <div className="body">
      <div className="login-card">
        <div className="form-container">
          {error && <p className="error">{error}</p>} {/* Display error messages */}
          <form
            className={`login-form ${isLogin ? "visible" : "hidden"}`}
            onSubmit={handleLogin}
          >
            <h2>Login</h2>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="button">
              <input type="submit" value="Login" />
            </div>
            <div className="toggle-text">
              <span onClick={toggleForm}>Don't have an account? Sign Up</span>
            </div>
          </form>
          <form
            className={`login-form ${isLogin ? "hidden" : "visible"}`}
            onSubmit={handleSignup}
          >
            <h2>Sign Up</h2>
            <div className="input-box">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="button">
              <input type="submit" value="Sign Up" />
            </div>
            <div className="toggle-text">
              <span onClick={toggleForm}>Already have an account? Login</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;