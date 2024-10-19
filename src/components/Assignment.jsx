import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../styles/Assignment.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

// Mock data for tags, profiles, and calendar integration
const tags = ['Math', 'Science', 'Homework', 'Project'];
const userProfile = { name: 'User' }; // Example user profile

const Assignment = () => {
  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem('assignments');
    return savedAssignments ? JSON.parse(savedAssignments) : [];
  });
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [tagsSelected, setTagsSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [completedFilter, setCompletedFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
const [inputs , setInputs]=useState({
  name: '',
  date: '',
  priority: '',
  completed:false,
  tags: [],

})
  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
    // Send local notifications for upcoming assignments
    assignments.forEach((assignment) => {
      const timeToDue = new Date(assignment.dueDate) - new Date();
      if (timeToDue > 0 && timeToDue < 86400000) { // Less than 24 hours
        setTimeout(() => {
          toast(`Reminder: Complete the assignment "${assignment.name}"!`);
        }, timeToDue);
      }
    });
  }, [assignments]);
  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const addAssignment = (e) => {
    e.preventDefault()
    // if (assignmentName && dueDate) {
    //   const newAssignment = {
    //     name: assignmentName,
    //     dueDate,
    //     priority,
    //     completed: false,
    //     tags: tagsSelected,
    //   };
    //   setAssignments([...assignments, newAssignment]);
    //   resetInputFields();
    //   toast.success('Assignment added successfully!');
    // } else {
    //   toast.error("Please enter assignment name and due date.");
    // }
    console.log(inputs)
  };

  const resetInputFields = () => {
    setAssignmentName('');
    setDueDate('');
    setPriority('Medium');
    setTagsSelected([]);
  };

  const completeAssignment = (index) => {
    const updatedAssignments = assignments.map((assignment, i) =>
      i === index ? { ...assignment, completed: !assignment.completed } : assignment
    );
    setAssignments(updatedAssignments);
  };

  const deleteAssignment = (index) => {
    const filteredAssignments = assignments.filter((_, i) => i !== index);
    setAssignments(filteredAssignments);
    toast.success('Assignment deleted successfully!');
  };

  const deleteSelectedAssignments = () => {
    const filteredAssignments = assignments.filter(assignment => !assignment.completed);
    setAssignments(filteredAssignments);
    toast.success('Completed assignments deleted successfully!');
  };

  const calculateTimeLeft = (dueDate) => {
    const timeLeft = new Date(dueDate) - new Date();
    if (timeLeft < 0) return 'Overdue';
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m left`;
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompletion = completedFilter === 'All' ||
      (completedFilter === 'Completed' && assignment.completed) ||
      (completedFilter === 'Incomplete' && !assignment.completed);
    return matchesSearch && matchesCompletion;
  });

  const sortAssignments = (criteria) => {
    const sortedAssignments = [...assignments].sort((a, b) => {
      if (criteria === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (criteria === 'priority') {
        const priorityOrder = { Low: 1, Medium: 2, High: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });
    setAssignments(sortedAssignments);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedAssignments = Array.from(assignments);
    const [removed] = reorderedAssignments.splice(result.source.index, 1);
    reorderedAssignments.splice(result.destination.index, 0, removed);
    setAssignments(reorderedAssignments);
    toast.success('Assignments reordered successfully!');
  };

  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAssignment(null);
  };

  const data = [
    { name: 'Completed', value: assignments.filter(a => a.completed).length },
    { name: 'Incomplete', value: assignments.filter(a => !a.completed).length },
  ];

  return (
    <div className="assignment-page">
      <ToastContainer />
      <Sidebar />
      <div className="assignment-container">
        <h1 className="assignment-title">Assignments</h1>
        <hr />

        <div className="info-section">
          <h3>Welcome, {userProfile.name}!</h3>
          <p className="tagline">Stay on top of your assignments!</p>
        </div>


        <input
          type="text"
          placeholder="Search Assignments"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setCompletedFilter(e.target.value)} value={completedFilter}>
          <option value="All">All Assignments</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>

        <h3>Assignment Management</h3>
        <form onSubmit={addAssignment} className="assignment-input">
          <input
            type="text"
            placeholder="Assignment Name"
            // value={inputs.name}
            onChange={handleInputChange}
          />
          <input
            type="text" placeholder='enter date'
            // value={inputs.date}
            onChange={handleInputChange}
          />
          <select  onChange={handleInputChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {/* <select multiple value={tagsSelected} onChange={(e) => setTagsSelected(Array.from(e.target.selectedOptions, option => option.value))}>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select> */}
          <button type='submit' >Add Assignment</button>
        </form>

        <button onClick={deleteSelectedAssignments}>Delete Completed Assignments</button>

        <h3>Assignments Overview</h3>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx={100}
            cy={100}
            innerRadius={40}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            <Cell fill="#82ca9d" />
            <Cell fill="#ffcc00" />
          </Pie>
        </PieChart>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="assignments">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {filteredAssignments.map((assignment, index) => (
                  <Draggable key={index} draggableId={assignment.name} index={index}>
                    {(provided) => (
                      <motion.li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`assignment-item ${assignment.completed ? 'completed' : ''}`}
                      >
                        <h4 onClick={() => openModal(assignment)}>{assignment.name}</h4>
                        <p>Due: {calculateTimeLeft(assignment.dueDate)}</p>
                        <p>Priority: {assignment.priority}</p>
                        <p>Tags: {assignment.tags.join(', ')}</p>
                        <button onClick={() => completeAssignment(index)}>Toggle Complete</button>
                        <button onClick={() => deleteAssignment(index)}>Delete</button>
                      </motion.li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        <Modal isOpen={showModal} onRequestClose={closeModal}>
          <h2>{selectedAssignment?.name}</h2>
          <p>Due Date: {selectedAssignment?.dueDate}</p>
          <p>Priority: {selectedAssignment?.priority}</p>
          <p>Tags: {selectedAssignment?.tags.join(', ')}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default Assignment;
