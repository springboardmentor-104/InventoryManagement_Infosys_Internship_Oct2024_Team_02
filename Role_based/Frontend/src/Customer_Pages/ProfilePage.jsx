import React from 'react'
import { useAuthStore } from '../store/AuthStore';
import { useState } from 'react';
import '../Css/LoginForm.css';
import '../Customer_Css/ProfilePage.css';
function ProfilePage() {
    const {user,error,editprofile}=useAuthStore();
    const [image, setImage] = useState(user.image);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [isEditing, setIsEditing] = useState(false);
    const onClose = () => {
      setIsEditing(false); // Close the modal
       // Optional debugging or additional behavior
    };
    const handleUpdate = async () => {
      try {
          await editprofile(user._id, name,phone,address,image);
          onClose();
          alert("User role updated successfully");
          navigate("home");
      } catch (error) {
          console.error("Failed to update user role", error);
      }
  };
    return (
      <div className="profile-container">
        <div className="profile-card">
        <div className='profile-txt'>Profile</div>
        {isEditing?(
        <form>
        
        <div className="details-container">
        
          <div className="login-right">
         
            <strong>Profile Picture:</strong>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          
         
            <img
              src={image ? URL.createObjectURL(image) : user.image}
              
              alt="Profile"
              className="profile-picture-preview"
            />
          
          
          </div>
          <div className="login-left">
          <div className='text-xl font bold'>Name :</div>
              <input
                type="text"
                placeholder="Name"
                className="input-field"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                
              />
              <div className='text-xl font bold'>Phone :</div>
              <input
                type="Number"
                placeholder="Phone Number"
                className="input-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} 
              />
              <div className='text-xl font bold'>Email :</div>
              <input
                type="email"
                className="input-field"
                value={user.email}  
                required
                readOnly
              />
              <div className='text-xl font bold'>Address :</div>
               <input
                type="String"
                placeholder="Address"
                className="input-field"
                value={address}
                onChange={(e) => setAddress(e.target.value)} 
              />
               <div className="button-group">
            <button className="profile-button save-button" onClick={handleUpdate}>
              Save
            </button>
            <button className="profile-button cancel-button" onClick={onClose} >
              Cancel
            </button>
          </div>
              
                
               
            
          </div>
        </div>
        </form>
        ):(
          <div>
        
        <div className="login-container">
        
          <div className="login-right">
         
          
            <img
              src={user.image}
              alt="Profile"
              className="profile-picture-preview"
            />
          
          
          </div>
          <div className="login-left">
              <div className='text-xl font bold'>Name :</div>
              <input
                type="text"
                placeholder="Name"
                className="input-field"
                value={user.name} 
           
              />
              <div className='text-xl font bold'>Phone :</div>
              <input
                type="Number"
                placeholder="Phone Number"
                className="input-field"
                value={user.phone}
              
              />
              <div className='text-xl font bold'>Email :</div>
              <input
                type="email"
                className="input-field"
                value={user.email}  
                required
               
              />
              <div className='text-xl font bold'>Address :</div>
               <input
                type="String"
                placeholder="Address"
                className="input-field"
                value={user.address}
                
              />
              
              <button className="login-btn" onClick={() => setIsEditing(true)}>Update</button>
                
               
            
          </div>
        </div>
        </div>
        )}
        </div>
        </div>
      );
}

export default ProfilePage
