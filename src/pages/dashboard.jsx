import React from "react";
import emptyState from "../assets/empty_state.png";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../style/groups.css";
import { MoreVert } from "@mui/icons-material";
import { AddRounded } from "@mui/icons-material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Folder } from "@mui/icons-material";
import { StarBorderOutlined } from "@mui/icons-material";
import { ScheduleRounded } from "@mui/icons-material";
import { InsertDriveFile } from "@mui/icons-material";
import SignedIn from "../components/signedin";
import NewUser from "../components/newUser";

function Dashboard() {
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
                <button>
                  <AddRounded />
                  Create
                  <KeyboardArrowDown
                    sx={{
                      fontSize: "16px",
                    }}
                  />
                </button>
              </div>
              <h3 className="header">Groups</h3>
              <div className="groupRow">
                <div className="groupFolder">
                    <div className="groupFolderHeader">
                      <p>CSC Final Exam Group</p>
                      <MoreVert/>
          
                    </div>
                    <Folder
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
                      <MoreVert/>
          
                    </div>
                    <Folder
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
                      <MoreVert/>
          
                    </div>
                    <Folder
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
                      <MoreVert/>
          
                    </div>
                    <Folder
                    style={{
                      fontSize: 125,
                      margin: 0,
                      padding: 0,
                      color: "gray"
                      }}/>
                </div>
              </div>
              <h3 className="header2">Files</h3>
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
                <div className="fileTags">
                  <button>
                    <InsertDriveFile
                      style={{
                        fontSize: 25,
                        color: "blue",
                        marginRight: 3,
                      }}
                    />
                    <p className="pTag">CSC104</p>
                    <MoreVert
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginRight: 3,
                      }}
                    />
                  </button>
                  <button>
                    <InsertDriveFile
                      style={{
                        fontSize: 25,
                        color: "blue",
                        marginRight: 3,
                      }}
                    />
                    <p className="pTag">CSC104</p>
                    <MoreVert
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginRight: 3,
                      }}
                    />
                  </button>
                  <button>
                    <InsertDriveFile
                      style={{
                        fontSize: 25,
                        color: "blue",
                        marginRight: 3,
                      }}
                    />
                    <p className="pTag">CSC104</p>
                    <MoreVert
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginRight: 3,
                      }}
                    />
                  </button>
                  <button>
                    <InsertDriveFile
                      style={{
                        fontSize: 25,
                        color: "blue",
                        marginRight: 3,
                      }}
                    />
                    <p className="pTag">CSC104</p>
                    <MoreVert
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginRight: 3,
                      }}
                    />
                  </button>
                  <button>
                    <InsertDriveFile
                      style={{
                        fontSize: 25,
                        color: "blue",
                        marginRight: 3,
                      }}
                    />
                    <p className="pTag">CSC104</p>
                    <MoreVert
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginRight: 3,
                      }}
                    />
                  </button>
                </div>
                <div className="fileTags">
                  <button>
                    <InsertDriveFile
                      style={{
                        fontSize: 25,
                        color: "blue",
                        marginRight: 3,
                      }}
                    />
                    <p className="pTag">CSC104</p>
                    <MoreVert
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginRight: 3,
                      }}
                    />
                  </button>
                  <button>
                    <InsertDriveFile
                      style={{
                        fontSize: 25,
                        color: "blue",
                        marginRight: 3,
                      }}
                    />
                    <p className="pTag">CSC104</p>
                    <MoreVert
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginRight: 3,
                      }}
                    />
                  </button>
                  <button>
                    <InsertDriveFile
                      style={{
                        fontSize: 25,
                        color: "blue",
                        marginRight: 3,
                      }}
                    />
                    <p className="pTag">CSC104</p>
                    <MoreVert
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginRight: 3,
                      }}
                    />
                  </button>
                  <button>
                    <InsertDriveFile
                      style={{
                        fontSize: 25,
                        color: "blue",
                        marginRight: 3,
                      }}
                    />
                    <p className="pTag">CSC104</p>
                    <MoreVert
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginRight: 3,
                      }}
                    />
                  </button>
                  <button>
                    <InsertDriveFile
                      style={{
                        fontSize: 25,
                        color: "blue",
                        marginRight: 3,
                      }}
                    />
                    <p className="pTag">CSC104</p>
                    <MoreVert
                      style={{
                        fontSize: 25,
                        color: "white",
                        marginRight: 3,
                      }}
                    />
                  </button>
                </div>
              {/* <div className="tags">
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
                </div> */}
              {/* <div className="welcomeHeader">
                <div className="welcomeText">
                  <h3>Welcome, Moyosore Okanlawon</h3>
                  <p>Open your files or folders here!</p>
                </div>
                <button>
                  <AddRoundedIcon />
                  Create
                  <KeyboardArrowDownIcon
                    sx={{
                      fontSize: "16px",
                    }}
                  />
                </button>
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
                      Create your first Group to start collaborations with your
                      study group members
                    </p>
                    <div className="fullWidth">
                      <button>
                        <AddRoundedIcon
                          style={{
                            paddingRight: 5,
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
                      Select and Upload your first note/material PDF, DOCX, DOC
                      etc.
                    </p>
                    <div className="fullWidth">
                      <button>
                        <AddRoundedIcon
                          style={{
                            paddingRight: 5,
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
                    <h3>Go to community</h3>
                    <p>
                      Need inspiration or simply looking for materials? Visit
                      TheHub Community
                    </p>
                    <div className="fullWidth">
                      <button>
                        <SubdirectoryArrowRightIcon
                          style={{
                            paddingRight: 5,
                          }}
                        />
                        Visit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="emptyFiles">
              <FolderIcon
                        style={{
                          fontSize: 60,
                          color: "#282a2c",
                        }}
                      />
              <h2>No files found</h2>
              <p>Your files and groups will be shown here
                ,you can create a group or upload a file now above
              </p>
            </div> */}
            </div>
            <div className="activityContainer">
              <h2>My Hub Activity</h2>
              <div
                style={{
                  height: 1,
                  backgroundColor: "gray",
                  marginTop: 20,
                }}
              />
              <img src={emptyState} className="emptyStateImg" />
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 15,
                }}
              >
                Select an item to see its activities
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
