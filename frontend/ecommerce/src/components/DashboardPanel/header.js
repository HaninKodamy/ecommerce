import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import "./index.css";
import profilePic from "../../assets/images/logo.png";
import { AuthContext } from '../authContext';
import { useNavigate } from 'react-router-dom';

function HeaderHome({searchData}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

  const handleLogout = () => {
    authContext.logout(); 
    navigate('/'); 
  };


  return (
    <div className="header">
        <input type="text" placeholder="Search..." className="search-bar" onKeyDown={(e)=>searchData(e)} />
        <div className="profile-toggle" onClick={() => setShowDropdown(!showDropdown)}>
            <img src={profilePic} alt="Profile" className="profile-pic"/>
            {showDropdown && (
                <div className="profile-dropdown">
                    <Link to="/edit-profile">Edit Profile</Link>
                    <Link to="/" onClick={()=>handleLogout()}>Logout</Link>
                </div>
            )}
        </div>
    </div>
  )
}

export default HeaderHome