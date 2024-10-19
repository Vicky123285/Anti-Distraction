import React, { useState } from 'react';
import '../styles/ViewProfile.css'; // Link to the CSS file

const ViewProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    profilePicture: null,
    skills: [""],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    alert("Profile updated successfully!");
    setIsEditing(false);
    if (newProfilePicture) {
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: newProfilePicture,
      }));
      setNewProfilePicture(null);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>{isEditing ? "Edit Your Profile" : "Your Profile"}</h2>
          <button className="edit-button" onClick={handleEditToggle}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="profile-picture-container">
          <img
            src={newProfilePicture || user.profilePicture || "/images/guest-profile.jpg"}
            alt="Profile"
            className="profile-card-img"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="profile-file-input"
            />
          )}
        </div>

        <div className="profile-details">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="profile-input"
                required
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="profile-input"
                required
              />
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                className="profile-textarea"
              />
              <input
                type="text"
                value={user.skills.join(', ')}
                onChange={(e) => setUser({ ...user, skills: e.target.value.split(', ') })}
                placeholder="Add skills separated by commas"
                className="profile-input"
              />
            </>
          ) : (
            <>
              <h3 className="profile-card-name">{user.name || "Your Name"}</h3>
              <p className="profile-card-email">{user.email || "Your Email"}</p>
              <p className="profile-card-bio">{user.bio || "Your Bio"}</p>
              <h4>Skills:</h4>
              <ul className="profile-skills-list">
                {user.skills.map((skill, index) => (
                  skill && <li key={index} className="profile-skill">{skill}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {isEditing && (
          <button className="profile-card-button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
