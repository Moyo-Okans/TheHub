import React, { useState, useEffect, useRef } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FolderIcon from "@mui/icons-material/Folder";
import { MoreVert } from "@mui/icons-material";
import { ScheduleRounded } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { StarBorderOutlined } from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import api from "../api";

function SignedIn() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fullName, setFullName] = useState("")
  const dropdownRef = useRef(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Debug line
        if (!token) return;
  
        const { data } = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("User Profile:", data);
       setFullName(data.fullname); 
  
      } catch (error) {
        console.error("Failed to load Profile:", error.message);
      }
    };
  
    fetchProfile();
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileChange = () => {
    console.log();
  }

  return (
    <>
      <div className="welcomeHeader">
        <div className="welcomeText">
          <h3>Welcome, {fullName}</h3>
          <p>Open your files or folders here!</p>
        </div>
        <div className="dropdown" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="create-button">
            <AddRoundedIcon />
            Create
            <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <button onClick={() => console.log("Create Group")}>
                  Create Group
                </button>
              </li>
              <li>
                <label htmlFor="input-file">
                  <input
                    type="file"
                    accept="image/*"
                    id="input-file"
                    multiple
                    hidden
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <div className="uploadButton">
                    <h4>Upload File</h4>
                  </div>
                </label>

              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="actionBox">
        <h3>Groups</h3>
        <div className="groupRow">
          <button onClick={() => window.open(`http://localhost:5000/group/${id}`, '_blank')} className="groupFolder">
            <div className="groupFolderHeader">
              <p>CSC Final Exam Group</p>
              <MoreVert />
            </div>
            <FolderIcon
              style={{
                fontSize: 125,
                margin: 0,
                padding: 0,
                color: "gray",
              }}
            />
          </button>
          </div>
      </div>
      <div className="actionBox">
        <h3>Files</h3>
        <div className="files">
          <div className="tags">
            <button>
              <ScheduleRounded
                style={{
                  fontSize: 20,
                  color: "white",
                  marginRight: 7,
                }}
              />
              Recent
            </button>
            <button>
              <StarBorderOutlined
                style={{
                  fontSize: 23,
                  color: "white",
                  marginRight: 7,
                }}
              />
              Starred
            </button>
          </div>
        </div>
        <div className="fileTable">
          <div className="fileHeader">
            <p>Name</p>
            <p>Location</p>
            <p>Owner</p>
            <p>Date</p>
          </div>
          <div className="fileLines">
            <div className="fileName">
              <InsertDriveFileIcon
                style={{
                  color: "#425EEA",
                  fontSize: 22,
                }}
              />
              <p>CSC 104</p>
            </div>
            <p className="location">CSC Final Exam Preparations</p>
            <p className="owner">Me</p>
            <p className="date">March 12,2025</p>
          </div>
          <div className="fileLines">
            <div className="fileName">
              <InsertDriveFileIcon
                style={{
                  color: "#425EEA",
                  fontSize: 22,
                }}
              />
              <p>CSC 104</p>
            </div>
            <p className="location">CSC Final Exam Preparations</p>
            <p className="owner">Me</p>
            <p className="date">March 12,2025</p>
          </div>
          <div className="fileLines">
            <div className="fileName">
              <InsertDriveFileIcon
                style={{
                  color: "#425EEA",
                  fontSize: 22,
                }}
              />
              <p>CSC 104</p>
            </div>
            <p className="location">CSC Final Exam Preparations</p>
            <p className="owner">Me</p>
            <p className="date">March 12,2025</p>
          </div>
          <div className="fileLines">
            <div className="fileName">
              <InsertDriveFileIcon
                style={{
                  color: "#425EEA",
                  fontSize: 22,
                }}
              />
              <p>CSC 104</p>
            </div>
            <p className="location">CSC Final Exam Preparations</p>
            <p className="owner">Me</p>
            <p className="date">March 12,2025</p>
          </div>
          <div className="fileLines">
            <div className="fileName">
              <InsertDriveFileIcon
                style={{
                  color: "#425EEA",
                  fontSize: 22,
                }}
              />
              <p>CSC 104</p>
            </div>
            <p className="location">CSC Final Exam Preparations</p>
            <p className="owner">Me</p>
            <p className="date">March 12,2025</p>
          </div>
          <div className="fileLines">
            <div className="fileName">
              <InsertDriveFileIcon
                style={{
                  color: "#425EEA",
                  fontSize: 22,
                }}
              />
              <p>CSC 104</p>
            </div>
            <p className="location">CSC Final Exam Preparations</p>
            <p className="owner">Me</p>
            <p className="date">March 12,2025</p>
          </div>
          <div className="fileLines">
            <div className="fileName">
              <InsertDriveFileIcon
                style={{
                  color: "#425EEA",
                  fontSize: 22,
                }}
              />
              <p>CSC 104</p>
            </div>
            <p className="location">CSC Final Exam Preparations</p>
            <p className="owner">Me</p>
            <p className="date">March 12,2025</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignedIn;