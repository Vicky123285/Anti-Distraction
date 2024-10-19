import React, { useState } from 'react';
import '../styles/Faqs.css'; // Add your CSS styles for better design

const FaqComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqData = [
    {
      question: "How to use Learning Mode?",
      answer: (
        <>
          In Learning Mode, you can manage tasks with deadlines, track your progress, and focus on completing assignments with the Pomodoro timer. 
          Start by adding your tasks below, set deadlines, and mark them as complete when finished. The Pomodoro timer helps you focus for 25-minute 
          intervals, followed by a short break. Stay on top of your work to avoid penalties for late submissions!
        </>
      ),
    },
    {
      question: "How to use Notes?",
      answer: (
        <>
          The Notes feature allows you to keep track of important information related to your tasks, lessons, or general ideas. You can create, edit, and delete notes
          as needed. Use this feature to stay organized and ensure you never lose track of critical information.
        </>
      ),
    },
    {
      question: "How to use Performance Analytics?",
      answer: (
        <>
          Performance Analytics helps you track your overall progress. It calculates your performance based on factors like task completion, learning progress,
          focus levels, and assignment submissions. The circular ring visualizes your overall performance, and you can dive deeper into individual sections for 
          more detailed insights.
        </>
      ),
    },
    {
      question: "How to use App Blocker?",
      answer: (
        <>
          The App Blocker helps you stay focused by blocking distracting applications while you're studying. You can set a time limit for blocking apps or 
          manually select apps to block during study sessions. This feature ensures you're only focusing on productive work without distractions.
        </>
      ),
    },
    {
      question: "How to manage Assignments?",
      answer: (
        <>
          In the Assignments section, you can add all your upcoming tasks with deadlines. Once completed, mark the assignment as done to track your progress. 
          Ensure you meet all deadlines to avoid penalties, and stay updated on your submissions through regular checks in this section.
        </>
      ),
    },
    {
      question: "How to reset/forget password?",
      answer: (
        <>
          If you've forgotten your password, you can reset it by clicking on the "Forgot Password" link on the login page. Follow the instructions sent to your 
          registered email to reset your password. If you don't receive the email, check your spam folder or contact support.
        </>
      ),
    },
    {
      question: "What is this application used for?",
      answer: (
        <>
          This application is designed to help students manage their tasks, assignments, and learning activities. It features tools like Learning Mode, 
          App Blocker, Performance Analytics, Notes, and Assignments to help you stay organized, focused, and productive. Whether you're preparing for exams or 
          managing daily study routines, this app provides all the necessary tools to ensure success.
        </>
      ),
    },
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions (FAQ)</h2>
      {faqData.map((faq, index) => (
        <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
          <div className="faq-question" onClick={() => toggleFaq(index)}>
            {faq.question}
          </div>
          {activeIndex === index && (
            <div className="faq-answer">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqComponent;
