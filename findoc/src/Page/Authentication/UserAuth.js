import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css";

const UserAuth = ({ setIsAuthenticated }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setForm({ name: "", email: "", password: "" });
    setErrors({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let valid = true;
    let errors = {};
    if (isRegister && !form.name) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!form.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email address is invalid";
      valid = false;
    }
    if (!form.password) {
      errors.password = "Password is required";
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (isRegister) {
        // Handle registration logic
        console.log("Registration successful", form);
        setIsRegister(false); // Switch to login after successful registration
        setForm({ name: "", email: "", password: "" });
        setErrors({ name: "", email: "", password: "" });
      } else {
        // Handle login logic
        console.log("Login successful", form);
        localStorage.setItem("isAuthenticated", "true"); // Save authentication state
        setIsAuthenticated(true);
        navigate("/home"); // Navigate to the home page upon successful login
      }
    }
  };
  return (
    <div className="container">
      <div className="image-section"></div>
      <div className="form-section">
        <form onSubmit={handleSubmit} className="form-container">
          <h1 style={{ textAlign: "center" }}>
            {isRegister ? "User Register" : "User Login"}
          </h1>
          {isRegister && (
            <div>
              <label className="form-label">
                Name:
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </label>
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>
          )}
          <div>
            <label className="form-label">
              Email:
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </label>
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>
          <div>
            <label className="form-label">
              Password:
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </label>
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>
          <button type="submit" className="form-button">
            {isRegister ? "Register" : "Login"}
          </button>
          <button type="button" onClick={toggleMode} className="toggle-button">
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
