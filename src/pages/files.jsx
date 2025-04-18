import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import '../style/files.css';
import emptyState from '../assets/empty_state.png'
import { AddRounded } from "@mui/icons-material";
import { ScheduleRounded } from "@mui/icons-material";
import { StarBorderOutlined } from "@mui/icons-material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function Files() {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer">
              <div className="filesHeader">
                <h1>Files</h1>
                <button>
                  <AddRounded/>
                  Upload
                </button>
              </div>
              <div className="files">
                <div className="tags">
                  <button>
                    <ScheduleRounded
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
                      color: 'blue',
                      fontSize: 22
                    }}/>
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
                      color: 'blue',
                      fontSize: 22
                    }}/>
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
                      color: 'blue',
                      fontSize: 22
                    }}/>
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
                      color: 'blue',
                      fontSize: 22
                    }}/>
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
                      color: 'blue',
                      fontSize: 22
                    }}/>
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
                      color: 'blue',
                      fontSize: 22
                    }}/>
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
                      color: 'blue',
                      fontSize: 22
                    }}/>
                    <p>CSC 104</p>
                  </div>
                  <p className="location">CSC Final Exam Preparations</p>
                  <p className="owner">Me</p>
                  <p className="date">March 12,2025</p>
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

export default Files;
