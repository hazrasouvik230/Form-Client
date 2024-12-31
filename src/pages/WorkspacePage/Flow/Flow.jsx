import React, { useState } from 'react';
import styles from './Flow.module.css';
import WorkspaceSidebar from './WordspaceSidebar/WorkspaceSidebar';
import WorkspaceInput from './WorkspaceInputs/WorkspaceInput';

const Flow = ({ isDarkMode }) => {
  const [selectedBubbles, setSelectedBubbles] = useState([]);
  const [selectedUserInput, setSelectedUserInput] = useState([]);

  const handleBubbleSelect = (bubble) => {
    setSelectedBubbles((prev) => [...prev, bubble]);
  };

  const handleUserInputSelect = (inputs) => {
    setSelectedUserInput((prev) => [...prev, inputs]);
  };

  const handleDeleteBubble = (index) => {
    setSelectedBubbles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteInput = (index) => {
    setSelectedUserInput((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.workspaceContent}>
      <WorkspaceSidebar
        onBubbleSelect={handleBubbleSelect}
        onInputSelected={handleUserInputSelect}
        isDarkMode={isDarkMode}
      />
      <WorkspaceInput
        selectedBubbles={selectedBubbles}
        selectedUserInput={selectedUserInput}
        isDarkMode={isDarkMode}
        onDeleteBubble={handleDeleteBubble}
        onDeleteInput={handleDeleteInput}
      />
    </div>
  );
};

export default Flow;
