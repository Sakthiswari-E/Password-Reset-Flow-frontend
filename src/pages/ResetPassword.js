import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { FaLock, FaKey } from "react-icons/fa";

export default function ResetPassword() {
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const qs = queryString.parse(window.location.search);
    const t = qs.token;
    const e = qs.email;
    setToken(t || "");
    setEmail(e || "");

    if (!t || !e) {
      setStatus("error");
      setMessage("Missing token or email in URL.");
      return;
    }

    (async () => {
      try {
        await axios.post(
          (process.env.REACT_APP_API_URL || "http://localhost:5003") +
            "/api/verify-token",
          { email: e, token: t }
        );
        setStatus("ready");
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Invalid or expired token");
      }
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        (process.env.REACT_APP_API_URL || "http://localhost:5003") +
          "/api/reset-password",
        { email, token, password }
      );
      setMessage(res.data.message);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Failed to reset");
    }
  };

  if (status === "verifying")
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <p>Verifying your reset link...</p>
        </div>
      </div>
    );

  if (status === "error")
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="alert alert-danger p-4 shadow-sm">{message}</div>
      </div>
    );

  if (status === "done")
    return (
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="alert alert-success p-4 shadow-sm text-center">
          <FaKey size={30} className="text-success mb-2" />
          <h5>{message}</h5>
          <p className="text-muted">You can now log in with your new password.</p>
        </div>
      </div>
    );

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="text-center mb-4">
          <FaLock size={50} className="text-success mb-3" />
          <h3 className="fw-bold">Reset Password</h3>
          <p className="text-muted">Choose a new secure password</p>
        </div>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <div className="form-text">Minimum 8 characters.</div>
          </div>

          <button className="btn btn-success w-100" type="submit">
            <FaKey className="me-2" /> Change Password
          </button>

          {message && <div className="alert alert-info mt-3">{message}</div>}
        </form>
      </div>
    </div>
  );
}

