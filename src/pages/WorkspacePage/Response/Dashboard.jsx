import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import styles from "./Dashboard.module.css";
import WorkspaceNavbar from "../WorkspaceNavbar/WorkspaceNavbar";

const Dashboard = ({isDarkMode, setIsDarkMode}) => {
  const submissions = [
    {
      id: 1,
      date: "Jul 17, 03:23 PM",
      button1: "Hi!",
      email: "abc@cg.com",
      text1: "alpha",
      button2: "Studio App to Manage Clients, Tracking App for Clients",
      rating: 5,
    },
    {
      id: 2,
      date: "Jul 17, 02:48 PM",
      button1: "Hi!",
      email: "",
      text1: "fsdfasd",
      button2: "",
      rating: 3,
    },
    {
      id: 3,
      date: "Jul 14, 04:25 PM",
      button1: "Hi!",
      email: "",
      text1: "",
      button2: "",
      rating: 4,
    },
  ];

  const totalStarts = 100;
  const completed = 33;
  const completionRate = (completed / totalStarts) * 100;

  console.log("Dashboard: " + isDarkMode)

  return (
    <>
      <WorkspaceNavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className={styles.dashboardContainer}>
        <div className={styles.summaryStats}>
          <div className={styles.counters}>
            <div className={styles.statItem}>
              <h3>Views</h3>
              <p>6</p>
            </div>

            <div className={styles.statItem}>
              <h3>Starts</h3>
              <p>{totalStarts}</p>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.submissionTable}>
              <thead>
                <tr>
                  <th>Submitted at</th>
                  <th>Button 1</th>
                  <th>Email</th>
                  <th>Text 1</th>
                  <th>Button 2</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>{submission.date}</td>
                    <td>{submission.button1}</td>
                    <td>{submission.email}</td>
                    <td>{submission.text1}</td>
                    <td>{submission.button2}</td>
                    <td>{submission.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pie}>
            <div className={styles.completionRate}>
              <PieChart
                data={[
                  {
                    title: "Completed",
                    value: completed,
                    color: "rgba(59, 130, 246, 1)",
                    border: "2px solid white",
                  },
                  {
                    title: "Remaining",
                    value: totalStarts - completed,
                    color: "rgba(144, 144, 144, 1)",
                    border: "2px solid white",
                  },
                ]}
                lineWidth={20}
                animate
              />
              <div className={styles.completionText}>
                <p style={{color: isDarkMode ? "lightgreen" : ""}}>Completed</p>
                <h4 style={{color: isDarkMode ? "lightgreen" : ""}}>{completionRate.toFixed(0)}%</h4>
              </div>
            </div>

            <div className={styles.completionTextBox}>
              <p>Completed</p>
              <h4>{completionRate.toFixed(0)}%</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;