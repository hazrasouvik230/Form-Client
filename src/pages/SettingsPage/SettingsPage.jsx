import React, { useEffect, useState } from "react";
import styles from "./SettingsPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SettingsPage = ({ isDarkMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailVisible, setEmailVisible] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [modifiedFields, setModifiedFields] = useState([]);
  const [message, setMessage] = useState("");

  console.log(isDarkMode);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        const { name } = response.data;
        setName(name || "");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toggleEmailVisibility = () => {
    console.log(isEmailVisible)
    setEmailVisible(!isEmailVisible);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleFieldChange = (field, value) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }

    if (!modifiedFields.includes(field)) {
      setModifiedFields((prev) => [...prev, field]);
    }
  };

  const handleUpdate = async () => {
    const updatePayload = {};
    if (modifiedFields.includes("name")) {
        updatePayload.name = name;
    }
    if (modifiedFields.includes("email")) {
        updatePayload.email = email;
    }
    if (modifiedFields.includes("password") && password && confirmPassword) {
        updatePayload.oldPassword = password;
        updatePayload.newPassword = confirmPassword;
    }

    if (Object.keys(updatePayload).length === 0) {
        setMessage("No changes to update");
        setTimeout(() => setMessage(""), 3000);
        return;
    }

    try {
        const response = await axios.put(
            `http://localhost:5000/api/user/profile`,
            updatePayload,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            }
        );
        setMessage(response.data.message || "Profile updated successfully");
    } catch (error) {
        if (error.response?.status ===  400 && error.response?.data.message === "Incorrect old password") {
          setMessage("Incorrect old password");
        } else {
          setMessage(error.response?.data?.message || "Failed to update profile");
        }
    }
    setTimeout(() => setMessage(""), 3000);
    setModifiedFields([]);
};


  return (
    <div className={styles.container}>
      <p
        className={styles.header}
        style={{ color: isDarkMode ? "white" : "black" }}
      >
        Settings
      </p>

      <div className={styles.formContainer}>
        {/* Username */}
        <div className={styles.inputGroup}>
          <div className={styles.innerInputGroup}>
            <i className="fa-regular fa-user"></i>
            <input
              className={styles.input}
              style={{ color: isDarkMode ? "white" : "black" }}
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
            />
          </div>
          <img src="./Eye.png" alt="" style={{ opacity: 0 }} />
        </div>

        {/* Email */}
        <div className={styles.inputGroup}>
          <div className={styles.innerInputGroup}>
            <i class="fa-solid fa-lock"></i>
            <input
              className={styles.input}
              style={{ color: isDarkMode ? "white" : "black" }}
              type={isEmailVisible ? "email" : "password"}
              name="email"
              placeholder="Update Email"
              value={email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
            />
          </div>
          <i
            className={`fa-solid ${isEmailVisible ? "fa-eye-slash" : "fa-eye"}`}
            style={{marginRight: 0, cursor: "pointer"}}
            onClick={() => setEmailVisible(!isEmailVisible)}
          ></i>
        </div>

        {/* Password */}
        <div className={styles.inputGroup}>
          <div className={styles.innerInputGroup}>
            <i class="fa-solid fa-lock"></i>
            <input
              className={styles.input}
              style={{ color: isDarkMode ? "white" : "black" }}
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Old Password"
              value={password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
            />
          </div>
          <i
            className={`fa-solid ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
            style={{marginRight: 0, cursor: "pointer"}}
            onClick={() => setPasswordVisible(!isPasswordVisible)}
          ></i>
        </div>

        {/* Confirm Password */}
        <div className={styles.inputGroup}>
          <div className={styles.innerInputGroup}>
            <i class="fa-solid fa-lock"></i>
            <input
              className={styles.input}
              style={{ color: isDarkMode ? "white" : "black" }}
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="New Password"
              value={confirmPassword}
              onChange={(e) =>
                handleFieldChange("confirmPassword", e.target.value)
              }
            />
          </div>
          <i
            className={`fa-solid ${isConfirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
            style={{marginRight: 0, cursor: "pointer"}}
            onClick={() => setConfirmPassword(!isConfirmPasswordVisible)}
          ></i>
        </div>

        <button
          className={styles.updateBtn}
          type="button"
          onClick={handleUpdate}
        >
          Update
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </div>

      <div
        className={styles.logoutBtn}
        onClick={() => {
          localStorage.removeItem("authToken");
          navigate("/");
        }}
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default SettingsPage;
