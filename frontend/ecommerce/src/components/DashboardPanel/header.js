import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "./index.css";
import profilePic from "../../assets/images/logo.png";

function HeaderHome() {
    const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="header">
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="profile-toggle" onClick={() => setShowDropdown(!showDropdown)}>
            <img src={profilePic} alt="Profile" className="profile-pic"/>
            {showDropdown && (
                <div className="profile-dropdown">
                    <Link to="/edit-profile">Edit Profile</Link>
                    <Link to="/logout">Logout</Link>
                </div>
            )}
        </div>
    </div>
  )
}

export default HeaderHome