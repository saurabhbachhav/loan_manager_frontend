import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./VerifierDashboard.css";

function VerifierDashboard() {
  const token = localStorage.getItem("token");
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = () => {
    axios
      .get("https://loan-manager-backed-2.onrender.com/api/loans", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setLoans(response.data))
      .catch((error) => console.error("Error fetching loans:", error));
  };

  const updateLoanStatus = (loanId, status) => {
    axios
      .put(
        `https://loan-manager-backed-2.onrender.com/api/loans/${loanId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => fetchLoans())
      .catch((err) => console.error("Error updating loan status:", err));
  };

  const totalLoans = loans.length;
  const verifiedLoans = loans.filter((l) => l.status === "verified").length;
  const rejectedLoans = loans.filter((l) => l.status === "REJECTED").length;

  return (
    <div className="verifier-dashboard-container">
      <div className="dashboard-content">
        <h2 className="dashboard-title">Verifier Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <p className="stat-label">Total Loans</p>
            <p className="stat-value">{totalLoans}</p>
          </div>
          <div className="stat-box verified">
            <p className="stat-label">Verified Loans</p>
            <p className="stat-value">{verifiedLoans}</p>
          </div>
          <div className="stat-box rejected">
            <p className="stat-label">Rejected Loans</p>
            <p className="stat-value">{rejectedLoans}</p>
          </div>
        </div>

        <div className="loan-table-section">
          <h3 className="section-title">Applied Loans</h3>
          <table className="loan-table">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Applicant</th>
                <th>Status</th>
                <th>Action</th>
                <th>Loan Details</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td>{loan._id.slice(0, 8)}...</td>
                  <td>{loan.user?.name || "N/A"}</td>
                  <td>
                    <span
                      className={`status-pill ${
                        loan.status === "verified"
                          ? "status-green"
                          : loan.status === "REJECTED"
                          ? "status-red"
                          : "status-yellow"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-btn verify"
                      onClick={() => updateLoanStatus(loan._id, "verified")}
                      disabled={loan.status === "verified"}
                    >
                      Verify
                    </button>
                    <button
                      className="action-btn reject"
                      onClick={() => updateLoanStatus(loan._id, "REJECTED")}
                      disabled={loan.status === "REJECTED"}
                    >
                      Reject
                    </button>
                  </td>
                  <td>
                    <a className="view-link" href={`/loans/${loan._id}`}>
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VerifierDashboard;
