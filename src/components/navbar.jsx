import React, {useState, useRef, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import PublicIcon from "@mui/icons-material/Public";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("User logged out");
    setIsDropdownOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="navbar">
      <div className="searchbar">
        <SearchOutlinedIcon sx={{ fontSize: "24px", color: "#C4C7C5" }} />
        <input
          type="search"
          name=""
          id=""
          placeholder="Search for your files and folders"
        />
      </div>
<div className="profile" ref={dropdownRef} style={{ position: "relative" }}>
  <Link to="/community">
    <PublicIcon
      className="profileIcons"
      style={{ fontSize: 30, color: "#cac7c5" }}
    />
  </Link>

  <Link to="/support">
    <HelpOutlineOutlinedIcon
      className="profileIcons"
      style={{ fontSize: 30, color: "#cac7c5" }}
    />
  </Link>

  <Avatar
    alt="Profile"
    onClick={toggleDropdown}
    style={{
      cursor: "pointer",
      borderRadius: "50%",
      width: 35,
      height: 35,
    }}
  />

  {isDropdownOpen && (
    <div className="dropdown-menu" >
      <button onClick={handleLogout} className="Logout-button">
        Logout 
        <LogoutIcon className="Logout-icon" />
      </button>
    </div>
  )}
</div>
    </div>
  );
};

export default Navbar;
