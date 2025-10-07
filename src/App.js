import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaKey } from "react-icons/fa";  //  Correct icon import

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <FaKey className="me-2" /> {/* Self-closing tag */}
            Password Reset Demo
          </Link>
          <div>
            <Link className="btn btn-light btn-sm fw-semibold" to="/forgot-password">
              Forgot Password
            </Link>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center mt-5">
                <h2 className="fw-bold text-primary mb-3">Welcome 👋</h2>
                <p className="text-muted fs-5">
                  Forgot your password? No worries — click below to reset it securely.
                </p>
                <Link to="/forgot-password" className="btn btn-primary mt-3 px-4 py-2">
                  Go to Reset Page
                </Link>
              </div>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>

      <footer className="bg-light text-center py-3 mt-auto border-top">
        <small className="text-muted">
          © {new Date().getFullYear()} Password Reset System · Built with React & Node.js
        </small>
      </footer>
    </Router>
  );
}
