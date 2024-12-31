import React, { useState, useEffect } from "react";
import styles from "./CreateFolder.module.css";
import { useNavigate } from "react-router-dom";

const CreateFolder = ({ isDarkMode, userId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(`User id from create folder : ${userId}`);
    const storedFolders = JSON.parse(localStorage.getItem("folders")) || [];
    setFolders(storedFolders);
  }, []);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const handleCreateFolderClick = () => {
    setModalOpen(true);
  };

  const handleDoneClick = () => {
    if (folderName.trim()) {
      if (folders.includes(folderName)) {
        setError("Folder name must be unique.");
      } else {
        setFolders([...folders, folderName]);
        setFolderName("");
        setError("");
        setModalOpen(false);
      }
    } else {
      setError("Folder name cannot be empty.");
    }
  };

  const handleDeleteClick = (index) => {
    setFolderToDelete(index);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedFolders = folders.filter((_, index) => index !== folderToDelete);
    setFolders(updatedFolders);
    setDeleteModalOpen(false);
    setFolderToDelete(null);
  };

  return (
    <div className={styles.createFolder}>
      <div className={styles.folders} onClick={handleCreateFolderClick}>
        <i class="fa-solid fa-folder-plus"></i>
        <span>Create Folder</span>
      </div>

      {modalOpen && (
        <div className={styles.modal}>
          <div
            className={styles.modalContent}
            style={{
              background: isDarkMode ? "#000" : "white",
              border: isDarkMode ? "1px solid rgba(71, 71, 74, 1)" : "none",
            }}
          >
            <h3 style={{ color: isDarkMode ? "white" : "black" }}>Create New Folder</h3>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              style={{
                background: isDarkMode ? "rgba(31, 31, 35, 1)" : "",
                color: isDarkMode ? "white" : "black",
                border: isDarkMode ? "none" : "",
              }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className={styles.modalActions}>
              <div onClick={handleDoneClick}>Done</div>
              <hr />
              <div onClick={() => setModalOpen(false)} style={{ color: isDarkMode ? "white" : "black" }}>
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <div className={styles.deletemodal}>
          <div
            className={styles.deleteModalContent}
            style={{
              background: isDarkMode ? "#000" : "white",
              color: isDarkMode ? "white" : "black",
              border: isDarkMode ? "1px solid rgba(71, 71, 74, 1)" : "none",
            }}
          >
            <h3 style={{ color: isDarkMode ? "white" : "black" }}>
              Are you sure you want to delete this folder?
            </h3>
            <div className={styles.deleteActions}>
              <div onClick={confirmDelete} className={styles.confirmButton}>
                Confirm
              </div>
              <hr />
              <div
                onClick={() => setDeleteModalOpen(false)}
                className={styles.cancelButton}
                style={{ color: isDarkMode ? "white" : "black" }}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.folderList} onClick={() => navigate("/workspace")}>
        {folders.map((name, index) => (
          <div key={index} className={styles.folderItem}>
            {name}
            <p className={styles.trash}>
              <i className="fa-regular fa-trash-can" onClick={(e) => {e.stopPropagation();handleDeleteClick(index)}}></i>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateFolder;