import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Line } from 'react-chartjs-2'; 
import 'react-circular-progressbar/dist/styles.css';
import Sidebar from './Sidebar';
import '../styles/PerformanceAnalytics.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Tooltip, Legend);

const PerformanceAnalytics = () => {
  const [taskCompletion, setTaskCompletion] = useState(0.75);
  const [learningProgress, setLearningProgress] = useState(0.80);
  const [focusLevel, setFocusLevel] = useState(0.65);
  const [assignmentsSubmitted, setAssignmentsSubmitted] = useState(0.90);
  const [showDetails, setShowDetails] = useState(false);
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  // Weights for calculating overall performance
  const taskWeight = 0.3;
  const learningWeight = 0.3;
  const focusWeight = 0.2;
  const assignmentsWeight = 0.2;

  // Calculate overall performance
  const overallPerformance = (
    taskCompletion * taskWeight +
    learningProgress * learningWeight +
    focusLevel * focusWeight +
    assignmentsSubmitted * assignmentsWeight
  ) * 100;

  // Determine the badge based on performance
  const badge = overallPerformance >= 1000 ? 'Platinum' 
               : overallPerformance >= 500 ? 'Diamond' 
               : overallPerformance >= 250 ? 'Gold' 
               : overallPerformance >= 100 ? 'Silver' 
               : overallPerformance >= 50 ? 'Bronze' 
               : 'No Badge Yet';

  const handleMoreClick = () => {
    setShowDetails(!showDetails);
  };

  // Prepare CSV data for download
  const csvData = [
    ["Metric", "Value"],
    ["Overall Performance", `${Math.round(overallPerformance)}%`],
    ["Learning Performance", `${Math.round(learningProgress * 100)}%`],
    ["Assignment Submission", `${Math.round(assignmentsSubmitted * 100)}%`],
    ["Focus Level", `${Math.round(focusLevel * 100)}%`],
    ["Task Completion", `${Math.round(taskCompletion * 100)}%`],
  ];

  // Add performance history
  const addPerformanceHistory = () => {
    const newHistory = {
      date: new Date().toLocaleDateString(),
      performance: Math.round(overallPerformance),
    };

    setPerformanceHistory((prevHistory) => [newHistory, ...prevHistory]);
  };

  useEffect(() => {
    addPerformanceHistory(); // Call to add history immediately on component mount
    const interval = setInterval(() => {
      addPerformanceHistory();
    }, 60000); // Add new data every minute

    return () => clearInterval(interval);
  }, [overallPerformance]);

  // Filter performance history based on selected dates
  const filteredHistory = performanceHistory.filter(item => {
    const date = new Date(item.date);
    return date >= startDate && date <= endDate;
  });

  const chartData = {
    labels: filteredHistory.map(item => item.date),
    datasets: [
      {
        label: 'Overall Performance',
        data: filteredHistory.map(item => item.performance),
        fill: false,
        backgroundColor: '#00cc99',
        borderColor: '#00cc99',
      },
    ],
  };

  return (
    <div className="performance-page">
      <Sidebar />
      <div className="performance-analytics-container">
        <div className="header">
          <h2>Performance Analytics</h2>
          <p className="tagline">Track your progress and performance</p>
          <div className="date-picker">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </div>
        </div>

        <div className="points-badge-section">
          <div className="circular-progress-container">
            <CircularProgressbar
              value={overallPerformance}
              text={`${Math.round(overallPerformance)}%`}
              styles={buildStyles({
                pathColor: '#00cc99',
                textColor: '#ffffff',
                trailColor: '#333333',
                backgroundColor: '#000000',
              })}
            />
            <div className="badge-inside-ring">
              {badge}
            </div>
          </div>
        </div>

        <button className="more-button" onClick={handleMoreClick}>
          {showDetails ? 'Less' : 'More'}
        </button>

        {showDetails && (
          <div className="detailed-performance">
            <h3>Individual Performance</h3>
            <ul>
              <li>Learning Performance: {Math.round(learningProgress * 100)}%</li>
              <li>Assignment Submission: {Math.round(assignmentsSubmitted * 100)}%</li>
              <li>Focus Level: {Math.round(focusLevel * 100)}%</li>
              <li>Task Completion: {Math.round(taskCompletion * 100)}%</li>
            </ul>
          </div>
        )}

        <CSVLink 
          data={csvData}
          filename={"performance-report.csv"}
          className="download-button"
          target="_blank"
        >
          Download Performance Report
        </CSVLink>

        <div className="performance-chart">
          <h3>Historical Performance</h3>
          <Line data={chartData} />
        </div>

        <div className="tips-section">
          <h3>Tips for Improvement</h3>
          <ul>
            <li>Focus on completing your tasks to improve your overall performance.</li>
            <li>Try to allocate specific study hours to enhance your learning progress.</li>
            <li>Minimize distractions to improve your focus level.</li>
            <li>Stay on top of your assignment deadlines to achieve higher submission rates.</li>
          </ul>
        </div>

        <div className="summary-section">
          <h3>Performance Summary</h3>
          <div className="summary-card">
            <h4>Total Tasks Completed</h4>
            <p>{Math.round(taskCompletion * 100)}%</p>
          </div>
          <div className="summary-card">
            <h4>Average Focus Time</h4>
            <p>{Math.round(focusLevel * 100)}%</p>
          </div>
          <div className="summary-card">
            <h4>Assignments Submitted</h4>
            <p>{Math.round(assignmentsSubmitted * 100)}%</p>
          </div>
        </div>

        <div className="notification">
          <p>Don't forget to complete your tasks for this week!</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
