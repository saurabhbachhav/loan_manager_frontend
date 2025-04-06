import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LoanDetails from "./pages/LoanDetails";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loans/:id" element={<LoanDetails />} />
        <Route path="/:role/dashboard" element={<HomePage />} />
        <Route path="/:role/profile" element={<ProfilePage />} />
        <Route path="/:role/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
