import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PublicIcon from "@mui/icons-material/Public";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";

function NewUser() {
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
              Select and Upload your first note/material PDF, DOCX, DOC etc.
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
              Need inspiration or simply looking for materials? Visit TheHub
              Community
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
        <p>
          Your files and groups will be shown here ,you can create a group or
          upload a file now above
        </p>
      </div>
    </>
  );
}

export default NewUser;
