import React, { useState, useEffect, useRef } from "react";
import "../style/newUser.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PublicIcon from "@mui/icons-material/Public";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import emptyState from "../assets/empty_state.png";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

function NewUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <>
      <div className="dashboard">
        <Sidebar/>
        <div className="dashboard-content">
          <Navbar/>
          <div className="main-content">
            <div className="bodyContainer">
              <div className="welcomeHeader">
                <div className="welcomeText">
                  <h3>Welcome, Moyosore Okanlawon</h3>
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
                        <button onClick={() => console.log("Upload File")}>
                          Upload File
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="actionBox">
                <h3>Actions</h3>
                <div className="boxes">
                  <div className="groupContainer">
                    <FolderIcon
                      style={{
                        fontSize: 60,
                        color: "#282a2c",
                      }}
                    />
                    <h3>Create a group</h3>
                    <p>
                      Create your first Group to start collaborations with your study
                      group members
                    </p>
                    <div className="fullWidth">
                      <button>
                        <AddRoundedIcon
                          style={{
                            fontSize: 20,
                            color: "#e9e7e7",
                          }}
                        />
                        Create
                      </button>
                    </div>
                  </div>
                  <div className="groupContainer">
                    <InsertDriveFileIcon
                      style={{
                        fontSize: 60,
                        color: "#282a2c",
                      }}
                    />
                    <h3>Upload a file</h3>
                    <p>
                      Select and upload your first note/material PDF, DOCX,
                      DOC, etc.
                    </p>
                    <div className="fullWidth">
                      <button>
                        <AddRoundedIcon
                          style={{
                            fontSize: 20,
                            color: "#e9e7e7",
                          }}
                        />
                        Upload
                      </button>
                    </div>
                  </div>
                  <div className="groupContainer">
                    <PublicIcon
                      style={{
                        fontSize: 60,
                        color: "#282a2c",
                      }}
                    />
                    <h3>Go to Community</h3>
                    <p>
                      Need inspiration or simply looking for materials? 
                      Visit The hub community
                    </p>
                    <div className="fullWidth">
                      <button>
                        <SubdirectoryArrowRightIcon
                          style={{
                            fontSize: 20,
                            color: "#e9e7e7",
                          }}
                        />
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="emptyFiles">
                    <FolderIcon
                      style={{
                        fontSize: 70,
                        color: "ffffff",
                      }}
                    />
                <h2>No files found</h2>
                <p>
                  Your files and groups will be shown here, you can create a group or
                  upload a file now above
                </p>
              </div>
            </div>
            <div className="activityContainer">
              <h2>My Hub Activity</h2>
              <div style={{ height: 1, backgroundColor: "gray", marginTop: 20 }} />
              <img src={emptyState} className="emptyStateImg" />
              <p style={{ textAlign: "center", fontFamily: "'Roboto', sans-serif", fontSize: 15 }}>
                Select an item to see its activities
              </p>
            </div>
          </div>
        </div>
      </div>  
      
    </>
  );
}

export default NewUser;