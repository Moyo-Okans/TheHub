import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PublicIcon from "@mui/icons-material/Public";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import profileImg from "../assets/profileImage.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="searchbar">
        <SearchOutlinedIcon sx={{ fontSize: "24px", color: "#C4C7C5" }} />
        <input
          type="search"
          name=""
          id=""
          placeholder="Search for your files and groups"
        />
      </div>
      <div className="profile">
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
        <img src={profileImg} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
