import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import BackImage from "../../assets/images/BLUBERRI.jpg";

function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",

  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message and individual error for this field
    setErrorMessage("");
    setValidationErrors({
      ...validationErrors,
      [`${name}Error`]: "",
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    // Clear the error message and individual error for confirm password
    setErrorMessage("");
    setValidationErrors({
      ...validationErrors,
      confirmPasswordError: "",
    });
  };

  const validateEmail = () => {
    const { email } = formData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const errors = [];

    if (!emailRegex.test(email)) {
      errors.push("Invalid email address");
    }

    return errors;
  };

  const validatePassword = () => {
    const { password } = formData;
    const errors = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password before submission
    const emailErrors = validateEmail();
    const passwordErrors = validatePassword();

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      const errors = [...emailErrors, ...passwordErrors];
      setErrorMessage("Please fix the errors before registering.");
      setValidationErrors({
        emailError: emailErrors.join(", "),
        passwordError: passwordErrors.join(", "),
        confirmPasswordError: "",
       
      });
      return;
    }

    if (formData.password !== confirmPassword) {
      setValidationErrors({
        ...validationErrors,
        confirmPasswordError: "Passwords do not match",
      });
      setErrorMessage("Please fix the errors before registering.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users",
        formData
      );

      console.log("Server response:", response);

      if (response.status === 201) {
        navigate("/login");
      } else {
        console.error("Registration failed:", response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    <div
      className="container mt-5 "
      style={{
        backgroundImage: `url(${BackImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Sign Up</div>
            <div className="card-body">
              <form>
                {errorMessage && (
                  <span
                    className="error-message"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {errorMessage}
                  </span>
                )}
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`form-control ${
                      validationErrors.usernameError ? "error" : ""
                    }`}
                    required
                  />
                  {validationErrors.usernameError && (
                    <span className="error-message">
                      {validationErrors.usernameError}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${
                      validationErrors.emailError ? "error" : ""
                    }`}
                    required
                  />
                  {validationErrors.emailError && (
                    <span className="error-message">
                      {validationErrors.emailError}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`form-control ${
                      validationErrors.passwordError ? "error" : ""
                    }`}
                  />
                  {validationErrors.passwordError && (
                    <span className="error-message">
                      {validationErrors.passwordError}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmpassword">Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    className={`form-control ${
                      validationErrors.confirmPasswordError ? "error" : ""
                    }`}
                  />
                  {validationErrors.confirmPasswordError && (
                    <span className="error-message">
                      {validationErrors.confirmPasswordError}
                    </span>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </form>
              <p className="mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;