import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '../../Urls';

const Login = () => {
  const [state, setState] = useState("Signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (state === "Signup" && !name.trim()) {
      newErrors.name = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (state === "Signup") {
      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const endpoint = state === "Signup" ? "/user/signup" : "/user/signin";
    const payload = state === "Signup" 
      ? { name, email, password, confirmPassword } 
      : { email, password };
  
    try {
      const response = await axios.post(`${baseUrl}/api${endpoint}`, payload);
      const data = response.data;
  
      if (state === "Signup") {
        toast.success("User created successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setState("Signin");
      } else {
        toast.success("User logged in successfully!");
        console.log("User logged in successfully!");
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userName", data.name);
        navigate(`/postlogin/${data.id}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
      console.error(errorMessage);
    }
  };
  
  return (
    <div className={styles.login}>
      <img src="./Group 2.png" alt="" style={{position: 'fixed', top: '30%', left: '2rem'}} className={styles.leftImage} />
      <img src="./Ellipse 1.png" alt="" style={{position: 'fixed', bottom: '0', right: '15rem'}} className={styles.bottomImage} />
      <img src="./Ellipse 2.png" alt="" style={{position: 'fixed', top: '20%', right: '0'}} className={styles.rightImage} />
      <p className={styles.backBtn} onClick={() => navigate("/")}>&larr;</p>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* Username */}
        {state === "Signup" && (
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Username</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Enter a username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>
        )}

        {/* Email */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        {/* Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className={styles.errorText}>{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        {state === "Signup" && (
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
          </div>
        )}

        <button className={styles.primaryBtn} type="button" onClick={handleSubmit}>
          {state === "Signup" ? "Sign Up" : "Log In"}
        </button>

        <p className={styles.orText}>OR</p>

        <button className={styles.googleBtn} type="button">
          <img
            src="./Google Icon.png"
            alt="Google Logo"
            className={styles.googleIcon}
          />
          Sign Up with Google
        </button>

        <p className={styles.switchText}>
          {state === "Signup" ? "Already have an account? " : "Don't have an account? "}
          <span
            className={styles.linkText}
            onClick={() => {
              setErrors({});
              setState(state === "Signup" ? "Signin" : "Signup");
            }}
          >
            {state === "Signup" ? "Login" : "Register now"}
          </span>
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};


export default Login;