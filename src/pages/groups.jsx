import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import '../style/groups.css'
import emptyState from '../assets/empty_state.png'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { StarBorderOutlined } from "@mui/icons-material";
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';



function Groups() {
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
              <button>
                  <AddRoundedIcon />
                  Create
                </button>
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
                <div className="groupRow">
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
                <div className="groupRow">
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
