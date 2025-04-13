import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FolderIcon from "@mui/icons-material/Folder";
import { MoreVert } from "@mui/icons-material";
import { ScheduleRounded } from "@mui/icons-material";
import { StarBorderOutlined } from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function SignedIn() {
  return (
    <>
      <div className="welcomeHeader">
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
        <h3>Groups</h3>
        <div className="groupRow">
          <div className="groupFolder">
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
          </div>
          <div className="groupFolder">
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
          </div>
          <div className="groupFolder">
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
          </div>
          <div className="groupFolder">
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
          </div>
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
