import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const res = await axios.post(
        (process.env.REACT_APP_API_URL || "http://localhost:5003") +
          "/api/forgot-password",
        { email }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="text-center mb-4">
          <FaEnvelope size={50} className="text-primary mb-3" />
          <h3 className="fw-bold">Forgot Password</h3>
          <p className="text-muted">Enter your email to receive a reset link</p>
        </div>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" type="submit">
            <FaPaperPlane /> Send Reset Link
          </button>

          {message && <div className="alert alert-success mt-3">{message}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      </div>
    </div>
  );
}
