import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./UserDashboard.css";

function UserDashboard() {
  const token = localStorage.getItem("token");
  const [loanForm, setLoanForm] = useState({
    amount: "",
    interestRate: "",
    tenure: "",
  });
  const [userLoans, setUserLoans] = useState([]);

  // Fetch the logged-in user's loans (assuming the backend filters by user)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/loans", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response);
        const filtered = response.data.filter((loan) => {
          return loan.user && loan.user.email === localStorage.getItem("email");
        });
        setUserLoans(filtered);
      })
      .catch((error) => console.error("Error fetching user loans:", error));
  }, [token, userLoans]);


  const handleLoanApply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/loans",
        { ...loanForm },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Loan application submitted successfully!");
      setLoanForm({ amount: "", interestRate: "", tenure: "" });
      // Optionally refresh the user's loan list after submission
    } catch (error) {
      console.error("Error applying for loan:", error);
      alert("Failed to apply for loan.");
    }
  };

  return (
    <div>
      <div className="user-dashboard">
        <h2>User Dashboard</h2>
        <div className="loan-application">
          <h3>Apply for Loan</h3>
          <form onSubmit={handleLoanApply} className="loan-form">
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={loanForm.amount}
                onChange={(e) =>
                  setLoanForm({ ...loanForm, amount: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Interest Rate (%)</label>
              <input
                type="number"
                value={loanForm.interestRate}
                onChange={(e) =>
                  setLoanForm({ ...loanForm, interestRate: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Tenure (months)</label>
              <input
                type="number"
                value={loanForm.tenure}
                onChange={(e) =>
                  setLoanForm({ ...loanForm, tenure: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn">
              Apply
            </button>
          </form>
        </div>
        <div className="my-loans">
          <h3>My Loan Applications</h3>
          <table className="loans-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userLoans.map((loan) => (
                <tr key={loan._id}>
                  <td>{loan._id}</td>
                  <td>{loan.amount}</td>
                  <td>{loan.status}</td>
                  <td>
                    <a href={`/loans/${loan._id}`}>View Details</a>
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

export default UserDashboard;
