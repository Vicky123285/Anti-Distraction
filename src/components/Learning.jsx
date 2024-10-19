import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext"; // Assuming you have a context for user data
import "../styles/Learning.css"; // Link to the CSS file
import Calendar from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import time picker styles
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Learning = () => {
  const { user } = useContext(UserContext);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // For calendar management
  const [searchQuery, setSearchQuery] = useState(''); // State for search bar
  const [tasks, setTasks] = useState([]); // State to manage tasks
  const [newTask, setNewTask] = useState(""); // State for new task input
  const [editIndex, setEditIndex] = useState(null); // State to manage editing tasks

  const toggleDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

    const [successMessage, setSuccessMessage] = useState(""); // State for success message
  
  const handleAddTask = async(e) => {
    e.preventDefault()
    console.log(newTask)
    // if (newTask.trim() !== "") {
    //   return
    // }
    try {
      setDoc(doc(firestore, "tasks", newTask), newTask);
      toast("successfully done")
    } catch (error) {
      toast.error(error.message)
    }
    // if (newTask.trim() !== "") {
    //   if (editIndex !== null) {
    //     // Edit existing task
    //     const updatedTasks = tasks.map((task, index) =>
    //       index === editIndex ? { ...task, task: newTask, date: selectedDate } : task
    //     );
    //     setTasks(updatedTasks);
    //     setEditIndex(null); // Reset edit index
    //   } else {
    //     // Add new task
    //     setTasks([...tasks, { task: newTask, date: selectedDate, completed: false }]);
    //   }
    //   setNewTask(""); // Clear the input field after adding/updating the task
    //   setSelectedDate(new Date()); // Reset the selected date
   // }
   console.log(newTask)
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setNewTask(tasks[index].task); // Populate input with the task to edit
    setSelectedDate(tasks[index].date); // Set date to the task's date
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="learning-page">
      {/* Header Section */}
      <header className="learning-header">
        <div className="logo">
          {/* Wrap the logo in a Link component to redirect to the Dashboard */}
          <Link to="/dashboard">
            <img src="/images/logo.jpg" alt="App Logo" />
          </Link>
        </div>
        <h1 className="page-title">Learning Mode</h1>
        <div className="profile-section">
          <div className="profile-icon" onClick={toggleDropdown}>
            <img src="/images/default-profile.jpg" alt="Profile" />
          </div>
          {profileDropdown && (
            <ul className="profile-dropdown">
              <li>View Profile</li>
              <li>Logout</li>
            </ul>
          )}
        </div>
      </header>

      <div className="learning-container">
        {/* Sidebar Section */}
        <nav className="sidebar">
          <h2 className="sidebar-header">Focus Pro</h2>
          <ul>
            <li><Link to="/learning">Learning</Link></li>
            <li><Link to="/assignments">Assignments</Link></li>
            <li><Link to="/notes">Notes</Link></li>
            <li><Link to="/performance">Performance Analytics</Link></li>
          </ul>
          {/* FAQ Link with Icon */}
          <div className="faq-icon">
            <Link to="/Faqs">
              <i className="fas fa-question-circle"></i> FAQ
            </Link>
          </div>
        </nav>

        {/* Main Content Section */}
        <div className="main-content">
          <h2>Welcome, {user ? user.username : "User"}</h2>
          <p>Let's dive into your study tasks and stay focused.</p>

          {/* Search Bar */}
          <div className="custom-search-bar">
            <input
              type="text"
              placeholder="Search learning content..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Combined Task Calendar and Input */}
          <div className="task-calendar">
            <h3>Task Management</h3>
            <div className="calendar-input">
              <Calendar
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                dateFormat="Pp"
                inline
              />
              <form onSubmit={handleAddTask} className="task-input">
                <input
                  type="text"
                  placeholder="Add/edit task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button type="submit">
                  {editIndex !== null ? "Update Task" : "Add Task"}
                </button>
              </form>
            </div>

            {/* Task List */}
            <div className="task-list">
              <h4>Tasks</h4>
              <ul>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <li key={index} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(index)}
                      />
                      {task.task} - {task.date.toLocaleString()} {/* Display date with time */}
                      <button onClick={() => handleEditTask(index)}>Edit</button>
                      <button onClick={() => handleDeleteTask(index)}>Delete</button>
                    </li>
                  ))
                ) : (
                  <p>No tasks available</p>
                )}
              </ul>
            </div>
          </div>

          <div className="section">
            <h3>Upcoming Tasks</h3>
            <p>View your upcoming tasks and deadlines.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
