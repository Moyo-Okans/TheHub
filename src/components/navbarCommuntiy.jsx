import React from "react";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import profileImg from "../assets/profileImage.jpg";
import { Link } from "react-router-dom";
import logo from "../assets/Frame 13.png";

const NavbarCommunity = () => {
  return (
    <div className="navbar">
       <div className="logo">
                  <img src={logo} alt="" />
                   <h3>The Hub</h3>
                </div>
      <div className="profile">
        <Link to="/dashboard">
          <HomeOutlinedIcon
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

export default NavbarCommunity;
