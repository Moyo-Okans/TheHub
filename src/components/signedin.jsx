import React, { useState, useRef, useEffect } from "react";
import emptyState from "../assets/empty_state.png";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../style/groups.css";
import "../style/signedIn.css";
import {
  KeyboardArrowDown,
  AddRounded,
  MoreVert,
  ScheduleRounded,
  StarBorderOutlined,
  Folder,
  InsertDriveFile
} from "@mui/icons-material";



function SignedIn() {
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

  const handleFileChange = () => {
    console.log();
  }

  return (
    <>

      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">

            <div className="bodyContainer">
              <div className="welcomeHeader">
                <div className="welcomeText">
                  <h3>Welcome, Moyosore Okanlawon</h3>
                  <p>Open your files or folders here!</p>
                </div>
                <div className="dropdown" ref={dropdownRef}>
                  <button onClick={toggleDropdown} className="create-button">
                    <AddRounded />
                    Create
                    <KeyboardArrowDown sx={{ fontSize: "16px" }} />
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
                            <h4>Select Media</h4>
                          </div>
                        </label>

                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <h3 className="header">Groups</h3>
              <div className="groupRow">
                <div className="groupFolder">
                  <div className="groupFolderHeader">
                    <p>CSC Final Exam Group</p>
                    <MoreVert />
                  </div>
                  <Folder style={{ fontSize: 125, margin: 0, padding: 0, color: "gray" }} />
                </div>
                <div className="groupFolder">
                  <div className="groupFolderHeader">
                    <p>CSC Final Exam Group</p>
                    <MoreVert />
                  </div>
                  <Folder style={{ fontSize: 125, margin: 0, padding: 0, color: "gray" }} />
                </div>
                <div className="groupFolder">
                  <div className="groupFolderHeader">
                    <p>CSC Final Exam Group</p>
                    <MoreVert />
                  </div>
                  <Folder style={{ fontSize: 125, margin: 0, padding: 0, color: "gray" }} />
                </div>
                <div className="groupFolder">
                  <div className="groupFolderHeader">
                    <p>CSC Final Exam Group</p>
                    <MoreVert />
                  </div>
                  <Folder style={{ fontSize: 125, margin: 0, padding: 0, color: "gray" }} />
                </div>
              </div>
              <h3 className="header2">Files</h3>
              <div className="tags">
                <button>
                  <ScheduleRounded style={{ fontSize: 20, color: "white", marginRight: 7 }} />
                  Recent
                </button>
                <button>
                  <StarBorderOutlined style={{ fontSize: 23, color: "white", marginRight: 7 }} />
                  Starred
                </button>
              </div>
              <div className="fileTags">
                <button>
                  <InsertDriveFile style={{ fontSize: 25, color: "blue", marginRight: 3 }} />
                  <p className="pTag">CSC104</p>
                  <MoreVert style={{ fontSize: 25, color: "white", marginRight: 3 }} />
                </button>
                <button>
                  <InsertDriveFile style={{ fontSize: 25, color: "blue", marginRight: 3 }} />
                  <p className="pTag">CSC104</p>
                  <MoreVert style={{ fontSize: 25, color: "white", marginRight: 3 }} />
                </button>
                <button>
                  <InsertDriveFile style={{ fontSize: 25, color: "blue", marginRight: 3 }} />
                  <p className="pTag">CSC104</p>
                  <MoreVert style={{ fontSize: 25, color: "white", marginRight: 3 }} />
                </button>
                <button>
                  <InsertDriveFile style={{ fontSize: 25, color: "blue", marginRight: 3 }} />
                  <p className="pTag">CSC104</p>
                  <MoreVert style={{ fontSize: 25, color: "white", marginRight: 3 }} />
                </button>
                <button>
                  <InsertDriveFile style={{ fontSize: 25, color: "blue", marginRight: 3 }} />
                  <p className="pTag">CSC104</p>
                  <MoreVert style={{ fontSize: 25, color: "white", marginRight: 3 }} />
                </button>
              </div>
              <div className="fileTags">
                <button>
                  <InsertDriveFile style={{ fontSize: 25, color: "blue", marginRight: 3 }} />
                  <p className="pTag">CSC104</p>
                  <MoreVert style={{ fontSize: 25, color: "white", marginRight: 3 }} />
                </button>
                <button>
                  <InsertDriveFile style={{ fontSize: 25, color: "blue", marginRight: 3 }} />
                  <p className="pTag">CSC104</p>
                  <MoreVert style={{ fontSize: 25, color: "white", marginRight: 3 }} />
                </button>
                <button>
                  <InsertDriveFile style={{ fontSize: 25, color: "blue", marginRight: 3 }} />
                  <p className="pTag">CSC104</p>
                  <MoreVert style={{ fontSize: 25, color: "white", marginRight: 3 }} />
                </button>
                <button>
                  <InsertDriveFile style={{ fontSize: 25, color: "blue", marginRight: 3 }} />
                  <p className="pTag">CSC104</p>
                  <MoreVert style={{ fontSize: 25, color: "white", marginRight: 3 }} />
                </button>
                <button>
                  <InsertDriveFile style={{ fontSize: 25, color: "blue", marginRight: 3 }} />
                  <p className="pTag">CSC104</p>
                  <MoreVert style={{ fontSize: 25, color: "white", marginRight: 3 }} />
                </button>
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

export default SignedIn;


