import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import banner from "../assets/creditsea.jpeg"
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "https://loan-manager-backed-2.onrender.com/api/auth/login",
        { email, password }
      );
      // Save token and role in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.email);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container left">
        <div className="login-card">
          <div className="login-left">
            <div className="login-card">
              <h2>Login</h2>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn">
                  Login
                </button>
              </form>
              <p className="link">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="login-container right">
        <img src={banner} alt="Login Visual" />
      </div>
    </div>
  );
}

export default Login;
