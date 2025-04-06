import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./LoanDetails.css";

function LoanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const response = await axios.get(
          `https://loan-manager-backed-2.onrender.com/api/loans/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setLoan(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching loan details", error);
      }
    };

    fetchLoan();
  }, [id]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://loan-manager-backed-2.onrender.com/api/loans/${id}/status`,
        {
          status,
        }
      );
      alert("Status updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  if (!loan) {
    return (
      <div className="loan-details-container">
        <p>Loading loan details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="loan-details-container">
        <h2 className="loan-title">Loan Details</h2>
        <div className="loan-info-card">
          <p>
            <strong>ID:</strong> {loan._id}
          </p>
          <p>
            <strong>Applicant:</strong> {loan.user.name}
          </p>
          <p>
            <strong>Email:</strong> {loan.user.email}
          </p>
          <p>
            <strong>Amount:</strong> ₹{loan.amount}
          </p>
          <p>
            <strong>Interest Rate:</strong> {loan.interestRate}%
          </p>
          <p>
            <strong>Current Status:</strong>
            <span
              className={`status-pill ${
                status === "verified"
                  ? "status-green"
                  : status === "rejected"
                  ? "status-red"
                  : "status-yellow"
              }`}
            >
              {status}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoanDetails;
