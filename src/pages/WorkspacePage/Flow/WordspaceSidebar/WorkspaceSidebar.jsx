import React from 'react'
import styles from './WorkspaceSidebar.module.css'

const WorkspaceSidebar = ({ onBubbleSelect, onInputSelected, isDarkMode }) => {
  console.log("Sidebar Darkmode: " + isDarkMode)
    const bubbles = [
        { label: "Text", type: "text", imasrc: "./SVG (1).png" },
        { label: "Image", type: "image", imasrc: "./SVG (2).png" },
        { label: "Video", type: "video", imasrc: "./SVG (3).png" },
        { label: "GIF", type: "gif", imasrc: "gif.png" },
      ];
    
      const inputs = [
        { label: "Text", type: "text2", imgsrc: "./SVG (4).png" },
        { label: "Number", type: "number", imgsrc: "./SVG (5).png" },
        { label: "Email", type: "email", imgsrc: "./SVG (6).png" },
        { label: "Phone", type: "phone", imgsrc: "./SVG (7).png" },
        { label: "Date", type: "date", imgsrc: "./SVG (8).png" },
        { label: "Rating", type: "rating", imgsrc: "./SVG (9).png" },
        { label: "Buttons", type: "buttons", imgsrc: "./SVG (10).png" },
      ];
    
      return (
        <div className={styles.sidebar}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle} style={{color: isDarkMode ? "white" : ""}}>Bubbles</h3>
            <div className={styles.buttonGrid}>
              {bubbles.map((button, index) => (
                <button key={index} className={styles.button} onClick={() => onBubbleSelect(button)}>
                  <img src={button.imasrc} alt="" /><span>{button.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle} style={{color: isDarkMode ? "white" : ""}}>Inputs</h3>
            <div className={styles.buttonGrid}>
              {inputs.map((button, index) => (
                <button key={index} className={styles.button} onClick={() => onInputSelected(button)}>
                  <img src={button.imgsrc} alt="" /><span>{button.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    };

export default WorkspaceSidebar