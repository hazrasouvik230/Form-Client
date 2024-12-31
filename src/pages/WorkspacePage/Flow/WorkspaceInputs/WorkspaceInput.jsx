import React from 'react';
import styles from './WorkspaceInput.module.css';

const WorkspaceInput = ({ selectedBubbles, selectedUserInput, isDarkMode, onDeleteBubble, onDeleteInput }) => {
  return (
    <div className={styles.workspaceInput}>
      <div className={styles.start}>
        <img src="./Flag.png" alt="" />
        <span>Start</span>
      </div>

      {selectedBubbles.map((bubble, index) => (
        <React.Fragment key={`bubble-${index}`}>
          <div className={styles.bubbleCard}>
            <div className={styles.bubbleHeader}>
              <span style={{ color: isDarkMode ? 'white' : '' }}>
                {bubble.label} {index + 1}
              </span>
            </div>
            <div className={styles.bubbleContent}>
              <input
                type="text"
                placeholder="Click to add link"
                className={styles.linkInput}
              />
            </div>
          </div>
          <p className={styles.trash}>
            <i
              className="fa-regular fa-trash-can"
              onClick={() => onDeleteBubble(index)}
            ></i>
          </p>
        </React.Fragment>
      ))}

      {selectedUserInput.map((input, index) => (
        <React.Fragment key={`input-${index}`}>
          <div className={styles.bubbleCard}>
            <div className={styles.bubbleHeader}>
              <span style={{ color: isDarkMode ? 'white' : '' }}>
                {input.label} {index + 1}
              </span>
            </div>
            <div className={styles.bubbleContent}>
              <input
                type="text"
                placeholder="Click to add link"
                className={styles.linkInput}
              />
            </div>
          </div>
          <p className={styles.trash}>
            <i
              className="fa-regular fa-trash-can"
              onClick={() => onDeleteInput(index)}
            ></i>
          </p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default WorkspaceInput;
