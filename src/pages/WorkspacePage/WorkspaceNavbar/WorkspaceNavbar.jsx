import React from "react";
import styles from "./WorkspaceNavbar.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const WorkspaceNavbar = ({ selectedFolder, setSelectedFolder, isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = window.innerWidth < 768;

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    console.log(isDarkMode);
  };

  const handleFolderNameChange = (e) => {
    setSelectedFolder(e.target.value);
  };

  const handleShareClick = () => {
    const url = window.location.href.includes("/workspace") ? window.location.href.replace("/workspace", "/publishForm") : window.location.href.replace("/response", "/publishForm");

    navigator.clipboard.writeText(url)
    .then(() => alert("Link copied to clipboard!"))
      .catch((error) => console.error("Failed to copy text:", error));
  };

  console.log("Workspace Navbar: "+isDarkMode)

  const isResponsePath = location.pathname === "/response";

  return (
    <div className={styles.workspaceNavbar}>
      <div className={styles.leftContainer} style={{ opacity: !isResponsePath ? 1 : 0, display: !isResponsePath ? "block" : isSmallScreen ? "none" : "block"}}>
        <input
          type="text"
          value={selectedFolder}
          onChange={handleFolderNameChange}
          placeholder="Enter Form Name"
          style={{background: isDarkMode ? "rgba(55, 55, 62, 1)" : ""}}
        />
      </div>

      <div className={styles.midContainer}>
        <div onClick={() => navigate("/workspace")} style={{ color: isResponsePath ? (isDarkMode ? "white" : "black") : "", border: isResponsePath ? "none" : ""}} className={styles.flow}>Flow</div>
        <div onClick={() => navigate("/response")} style={{ color: isResponsePath ? "" : (isDarkMode ? "white" : "black"), border: isResponsePath ? "" : "none"}} className={styles.response}>Response</div>
      </div>

      <div className={styles.lastContainer}>
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

        <div className={styles.btnSection}>
          <div className={styles.shareBtn} onClick={handleShareClick}>
            Share
          </div>
          <div className={styles.saveBtn}>
            Save
          </div>
        </div>
        <div
          style={{ fontWeight: "600", color: "red", cursor: "pointer" }}
          onClick={() => navigate("/postlogin/:id")}
        >
          x
        </div>
      </div>
    </div>
  );
};

export default WorkspaceNavbar;
