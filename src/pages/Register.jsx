import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import banner from "../assets/creditsea.jpeg"

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        "https://loan-manager-backed-2.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );
      navigate("/");
    } catch (err) {
      console.error("Registration failed", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container left">
        <div className="register-card">
          <h2>Register</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p style={{ color: "#f4c63d", fontWeight: "500" }}>
                To register as an Admin or Verifier, your email must end with{" "}
                <i>admin@gmail.com</i> or <i>verifier@gmail.com</i>.
              </p>
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
            <div className="form-group">
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="verifier">Verifier</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Register
            </button>
          </form>
          <p className="link">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
      <div className="register-container right">
        <img src={banner} alt="Register Visual" />
      </div>
    </div>
  );
}

export default Register;
