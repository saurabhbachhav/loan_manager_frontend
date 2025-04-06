// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const token = localStorage.getItem("token");
  const Email = localStorage.getItem("email");
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [loanRes, userRes] = await Promise.all([
        axios.get("https://loan-manager-backed-2.onrender.com/api/loans", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(
          "https://loan-manager-backed-2.onrender.com/api/users/count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
      ]);
      setLoans(loanRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handlePromote = async (userId) => {
    try {
      await axios.put(
        `https://loan-manager-backed-2.onrender.com/api/admin/promote/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.error("Error promoting user:", err);
    }
  };

  const handleDemote = async (userId) => {
    try {
      await axios.put(
        `https://loan-manager-backed-2.onrender.com/api/admin/demote/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.error("Error demoting user:", err);
    }
  };

  const updateStatus = async (loanId, status) => {
    try {
      await axios.put(
        `https://loan-manager-backed-2.onrender.com/api/loans/${loanId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://loan-manager-backed-2.onrender.com/api/admin/delete/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="admin-wrapper">

      <main className="admin-content">
        <div className="dashboard-cards">
          <div className="card">
            ACTIVE USERS <span>{users.length}</span>
          </div>
          <div className="card">
            LOANS <span>{loans.length}</span>
          </div>
          <div className="card">
            SAVINGS <span>450,000</span>
          </div>
          <div className="card">
            REPAID LOANS <span>30</span>
          </div>
        </div>

        <div className="table-section">
          <h2>Recent Loans</h2>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td>{loan.user?.email || "N/A"}</td>
                  <td>{loan.user?.name || "N/A"}</td>
                  <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                  <td className={loan.status.toLowerCase()}>
                    {loan.status.toUpperCase()}
                  </td>
                  <td>
                    <button
                      className="approve"
                      onClick={() => updateStatus(loan._id, "APPROVED")}
                    >
                      Approve
                    </button>
                    <button
                      className="pending"
                      onClick={() => updateStatus(loan._id, "REJECTED")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-section">
          <h2>Admin Controls</h2>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Make Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.email !== Email)
                .map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.role === "admin" ? (
                        <button
                          className="pending"
                          onClick={() => handleDemote(user._id)}
                        >
                          Demote
                        </button>
                      ) : (
                        <button
                          className="approve"
                          onClick={() => handlePromote(user._id)}
                        >
                          Promote
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="danger"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
