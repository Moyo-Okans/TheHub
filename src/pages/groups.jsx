import React, { useState, useEffect, useRef } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import '../style/groups.css'
import emptyState from '../assets/empty_state.png'
import { StarBorderOutlined } from "@mui/icons-material";
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';



function Groups() {
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
              <div className="groupHeader">
              <h1>Groups</h1>
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
              <div className="groups">
                <div className="tags">
                  <button>
                    <ScheduleRoundedIcon
                    style={{
                      fontSize: 20,
                      color: 'white',
                      marginRight: 7
                    }}
                    />
                    Recent
                  </button>
                  <button>
                  <StarBorderOutlined
                    style={{
                      fontSize: 23,
                      color: 'white',
                      marginRight: 7
                    }}
                    />
                    Starred
                  </button>
                </div>
                <div className="groupRow">
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
          
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 120,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
          
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 120,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
          
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 120,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
          
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 120,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                </div>
                <div className="groupRow">
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
          
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 120,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
          
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 120,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
          
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 120,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
                      
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 120,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                </div>
                <div className="groupRow">
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
          
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 120,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
          
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 125,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
          
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 125,
                      margin: 0,
                      padding: 0,
                      color: "gray"

                      }}/>
                  </div>
                  <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVertIcon/>
                      
                    </div>
                    <FolderIcon
                    style={{
                      fontSize: 125,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="activityContainer">
              <h2>My Hub Activity</h2>
              <div style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 20
              }}/>
              <img src={emptyState} className="emptyStateImg"/>
              <p style={{
                textAlign: "center",
                fontFamily: "'Roboto', sans-serif",
                fontSize: 15
              }}>Select an item to see its activities</p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Groups;
