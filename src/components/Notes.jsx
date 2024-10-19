import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Adjust the path as necessary
import '../styles/Notes.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notes = ({ userName }) => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [noteContent, setNoteContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [reminderMessage, setReminderMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const addOrUpdateNote = () => {
    if (noteContent) {
      if (editIndex !== null) {
        // Update note
        const updatedNotes = notes.map((note, i) =>
          i === editIndex ? { ...note, content: noteContent, tags, priority, dueDate } : note
        );
        setNotes(updatedNotes);
        setEditIndex(null);
        toast.success('Note updated successfully!');
      } else {
        // Add new note
        const newNote = {
          content: noteContent,
          completed: false,
          tags,
          priority,
          dueDate,
        };
        setNotes([...notes, newNote]);
        toast.success('Note added successfully!');
      }
      resetInputFields();
    }
  };

  const resetInputFields = () => {
    setNoteContent('');
    setTags('');
    setPriority('Medium');
    setDueDate('');
  };

  const completeNote = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, completed: true } : note
    );
    setNotes(updatedNotes);
    toast.success('Note marked as completed!');
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    toast.success('Note deleted successfully!');
  };

  const editNote = (index) => {
    setNoteContent(notes[index].content);
    setTags(notes[index].tags);
    setPriority(notes[index].priority);
    setDueDate(notes[index].dueDate);
    setEditIndex(index);
  };

  const filteredNotes = notes.filter(note => 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    const timer = setInterval(() => {
      notes.forEach((note) => {
        if (!note.completed) {
          setReminderMessage(`Reminder: Review your note "${note.content}"!`);
        }
      });
    }, 60000);
    return () => clearInterval(timer);
  }, [notes]);

  return (
    <div className="notes-page">
      <ToastContainer />
      <Sidebar />
      <div className="notes-container">
        <h1 className="notes-title">Notes</h1>
        <div className="header-line"></div>
        <h3 className="welcome-message">Welcome, {userName}!</h3>

        <input 
          type="text" 
          placeholder="Search notes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input" 
        />

        <p>Take effective notes with these tips:</p>
        <ul>
          <li>Summarize key points for better understanding.</li>
          <li>Use bullet points for clarity.</li>
          <li>Review and revise your notes regularly.</li>
        </ul>

        <h3>Note Management</h3>
        <div className="note-input">
          <textarea
            placeholder="Write your note here..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Tags (comma-separated)" 
            value={tags}
            onChange={(e) => setTags(e.target.value)} 
          />
          <input 
            type="datetime-local" 
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)} 
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={addOrUpdateNote}>
            {editIndex !== null ? 'Update Note' : 'Add Note'}
          </button>
        </div>

        {reminderMessage && <p className="reminder">{reminderMessage}</p>}

        <div className="notes-list">
          <h4>Your Notes</h4>
          <ul>
            {filteredNotes.map((note, index) => (
              <li key={index} className={note.completed ? 'completed' : ''}>
                <span className="note-content">{note.content}</span>
                <span className="note-tags">{note.tags}</span>
                <span className="note-priority">{note.priority}</span>
                <span className="note-dueDate">{note.dueDate}</span>
                <button onClick={() => editNote(index)}>Edit</button>
                <button onClick={() => deleteNote(index)}>Delete</button>
                <button onClick={() => completeNote(index)}>
                  {note.completed ? 'Completed' : 'Mark as Completed'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notes;
