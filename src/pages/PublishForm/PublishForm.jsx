import React, { useState } from "react";
import styles from "./PublishForm.module.css";

const PublishForm = () => {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello" }]);
  const [input, setInput] = useState("");

  const botResponses = [
    "You're most welcome!",
    "How can I assist you?",
    "Can you elaborate on that?",
    "Sure, I can help you with that!",
    "Let me know if you need anything else.",
  ];

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const userMessage = input.trim().toLowerCase();

      setMessages((prev) => [...prev, { sender: "user", text: input }]);
      setInput("");

      setTimeout(() => {
        let botMessage;
        if (userMessage === "hi") {
          botMessage = "How can I assist you?";
        } else if (userMessage === "what is your name") {
          botMessage = "I'm SOUVIK HAZRA";
        } else if (userMessage === "i need help") {
          botMessage = "Sure, I can help you with that!";
        } else if (userMessage === "Thank you" || userMessage === "Thanks") {
          botMessage = "You're most welcome!";
        } else {
          botMessage = botResponses[messages.length % botResponses.length];
        }

        setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
      }, 1000);
    }
  };

  return (
    <div className={styles.centerScreen}>
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                msg.sender === "bot" ? styles.botMessage : styles.userMessage
              }`}
            >
              {msg.text && <span>{msg.text}</span>}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Chat visual"
                  className={styles.imageMessage}
                />
              )}
            </div>
          ))}
        </div>
        <div className={styles.inputArea}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Write your message here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={styles.sendButton} onClick={handleSendMessage}>
            <img src="./send.png" alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishForm;