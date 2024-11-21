import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [customer, setCustomer] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    profilePicture: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);

  // Load customer data from local storage or API
  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem('customerData'));
    if (storedCustomer) {
      setCustomer(storedCustomer);
      setEditedCustomer(storedCustomer);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({
      ...editedCustomer,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedCustomer({
          ...editedCustomer,
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setCustomer(editedCustomer);
    setIsEditing(false);
    localStorage.setItem('customerData', JSON.stringify(editedCustomer));
  };

  const handleCancel = () => {
    setEditedCustomer(customer);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>Account Details</h2>

      {isEditing ? (
        <div className="profile-form">
          <label>
            <strong>Profile Picture:</strong>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {editedCustomer.profilePicture && (
            <img
              src={editedCustomer.profilePicture}
              alt="Profile"
              className="profile-picture-preview"
            />
          )}
          <label>
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={editedCustomer.name}
              onChange={handleChange}
            />
          </label>
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={editedCustomer.email}
              onChange={handleChange}
            />
          </label>
          <label>
            <strong>Phone:</strong>
            <input
              type="tel"
              name="phone"
              value={editedCustomer.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            <strong>Address:</strong>
            <input
              type="text"
              name="address"
              value={editedCustomer.address}
              onChange={handleChange}
            />
          </label>
          <div className="button-group">
            <button className="profile-button save-button" onClick={handleSave}>
              Save
            </button>
            <button className="profile-button cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-info">
          {customer.profilePicture && (
            <img
              src={customer.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          )}
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <button className="profile-button edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
