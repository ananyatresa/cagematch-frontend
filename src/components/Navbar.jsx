import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // This line brings in your CSS styles

export default function Navbar({ setIsAuthenticated }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setIsAuthenticated(false); 
        navigate('/login'); 
      };

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="navbar">
            {/* Left Side */}
            <div className="navbar-left">
                <div className="funky-title">
                    {"CAGE MATCH".split("").map((char, index) => (
                        <span key={index} className="wave rainbow" style={{ animationDelay: `${index * 0.1}s` }}>
                            {char}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right Side */}
            <div className="navbar-right">
                <input className="search-bar" type="text" placeholder="Search a Cage classic..." />
                <button className="notification">🔔</button>
                <div className="profile-wrapper" ref={dropdownRef}>
                    <button className="profile" onClick={() => setDropdownOpen((prev) => !prev)}>
                        <img src="/images/cage.png" alt="Cage" className="profile" onError={() => console.log("Image failed to load!")} />
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown">
                            <div className="dropdown-item">View Profile</div>
                            <div className="dropdown-item">Account Settings</div>
                            <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
