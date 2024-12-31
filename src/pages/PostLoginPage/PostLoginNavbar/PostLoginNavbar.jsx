import React, { useEffect, useState } from "react";
import styles from "./PostLoginNavbar.module.css";
import { useNavigate, useParams } from "react-router-dom";

const PostLoginNavbar = ({ isDarkMode, setIsDarkMode }) => {
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Edit");

  const [userName, setUserName] = useState();

  const { userId } = useParams();
  console.log(`User id from postlogin: ${userId}`);

  useEffect(() => {
    const fullName = localStorage.getItem("userName");
    if (fullName) {
      setUserName(fullName.split(" ")[0]);
    }
  }, []);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    console.log(isDarkMode);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDropdownInsideModal = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setDropdownVisible(false);
  };

  const handleCopyLink = () => {
    const linkToCopy = window.location.href;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        alert("Link copied to the clipboard.");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to copy the link. Please try again.");
      });
  };

  const navigate = useNavigate();

  return (
    <div
      className={`${styles.postLoginNavbar} ${
        isDarkMode ? styles.darkMode : styles.lightMode
      }`}
    >
      {/* Navbar Left */}
      <div className={styles.leftContainer}>
        <div className={styles.toggleTheme}>
          <p>Light</p>
          <div
            className={`${styles.switch} ${isDarkMode ? styles.dark : ""}`}
            onClick={toggleTheme}
          >
            <div className={styles.circle}></div>
          </div>
          <p>Dark</p>
        </div>
        <div className={styles.shareBtn} onClick={toggleModal}>
          Share
        </div>
      </div>

      {/* User Details */}
      <div className={styles.userDetails} onClick={toggleDropdown}>
        <p>
          {userName ? `${userName}'s workspace` : "User's workspace"}{" "}
          <i
            className={`fa-solid ${
              visible ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </p>
        {visible && (
          <div
            className={`${styles.dropdown} ${
              isDarkMode ? styles.darkMode : styles.lightMode
            }`}
          >
            <p onClick={() => navigate(`/settings/${userId}`)}>Settings</p>
            <hr />
            <p onClick={() => navigate("/")}>Log Out</p>
          </div>
        )}
      </div>

      {/* Navbar Right */}
      <div className={styles.rightContainer}>
        <div className={styles.toggleTheme}>
          <p>Light</p>
          <div
            className={`${styles.switch} ${isDarkMode ? styles.dark : ""}`}
            onClick={toggleTheme}
          >
            <div className={styles.circle}></div>
          </div>
          <p>Dark</p>
        </div>
        <div className={styles.shareBtn} onClick={toggleModal}>
          Share
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className={styles.modalBackdrop}>
          <div
            className={styles.modal}
            style={{
              background: isDarkMode ? "black" : "white",
              border: isDarkMode ? "1px solid white" : "",
              color: isDarkMode ? "white" : "",
              boxShadow: isDarkMode
                ? "0px 1px 3.5px 0px rgba(255, 255, 255, 0.25)"
                : "",
            }}
          >
            <div className={styles.modalHeader}>
              <button className={styles.closeButton} onClick={toggleModal}>
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3>Invite by Email</h3>
                <div
                  className={styles.dropdownButton}
                  onClick={toggleDropdownInsideModal}
                  style={{ color: isDarkMode ? "white" : "" }}
                >
                  {selectedRole} <i className="fa-solid fa-chevron-down"></i>
                </div>
                {isDropdownVisible && (
                  <div
                    className={styles.roleDropdown}
                    style={{ background: isDarkMode ? "black" : "" }}
                  >
                    <p onClick={() => handleRoleSelect("Edit")}>Edit</p>
                    <hr />
                    <p onClick={() => handleRoleSelect("View")}>View</p>
                  </div>
                )}
              </div>
              <input
                type="email"
                placeholder="Enter email ID"
                className={styles.emailInput}
                style={{
                  background: isDarkMode ? "rgba(31, 31, 35, 1)" : "",
                  color: isDarkMode ? "white" : "",
                }}
              />
              <button className={styles.sendInviteButton}>Send Invite</button>

              <h3>Invite by Link</h3>
              <div className={styles.linkSection}>
                <button
                  className={styles.copyLinkButton}
                  onClick={handleCopyLink}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostLoginNavbar;
