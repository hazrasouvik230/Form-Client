import React, { useState } from "react";
import styles from "./CreateFile.module.css";
import { useNavigate } from "react-router-dom";

const CreateFile = ({ isDarkMode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleCreateFileClick = () => {
    setModalOpen(true);
  };

  const handleDoneClick = () => {
    if (fileName.trim()) {
      if (files.includes(fileName)) {
        setError("File name must be unique.");
      } else {
        setFiles([...files, fileName]);
        setFileName("");
        setError("");
        setModalOpen(false);
      }
    } else {
      setError("File name cannot be empty.");
    }
  };

  const handleDeleteClick = (index) => {
    setFileToDelete(index);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedFiles = files.filter((_, index) => index !== fileToDelete);
    setFiles(updatedFiles);
    setDeleteModalOpen(false);
    setFileToDelete(null);
  };

  return (
    <div className={styles.createFile}>
      <div className={styles.files} onClick={handleCreateFileClick}>
        <p className={styles.plusBtn}>+</p>
        <p>Create a typebot</p>
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
            <h3 style={{ color: isDarkMode ? "white" : "black" }}>
              Create New Folder
            </h3>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter folder name"
              style={{
                background: isDarkMode ? "rgba(31, 31, 35, 1)" : "",
                color: isDarkMode ? "white" : "black",
                border: isDarkMode ? "none" : "",
              }}
            />
            {error && <p style={{color: "red"}}>{error}</p>}
            <div className={styles.modalActions}>
              <div onClick={handleDoneClick}>Done</div>
              <hr />
              <div
                onClick={() => setModalOpen(false)}
                style={{ color: isDarkMode ? "white" : "black" }}
              >
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
              Are you sure you want to delete this Form?
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

      <div className={styles.fileList}>
        {files.map((name, index) => (
          <>
            <div key={index} className={styles.fileItem} onClick={() => navigate("/workspace")}>
              {name}
            </div>
            <p
              className={styles.trash}
            >
              <i class="fa-regular fa-trash-can" onClick={() => handleDeleteClick(index)}></i>
            </p>
          </>
        ))}
      </div>
    </div>
  );
};

export default CreateFile;