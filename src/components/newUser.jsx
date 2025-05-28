import React, { useState, useEffect, useRef } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PublicIcon from "@mui/icons-material/Public";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Link } from "react-router-dom";
import { Dialog, TextField } from "@mui/material";
import api from "../api";
function NewUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const dropdownRef = useRef(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState("");

  //Fetch user profile
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
  const handleCreate = () => {
    console.log(title);
    setOpenPopup(false);
    setTitle('');
  }

  return (
    <>
      {/* Upload File Popup */}
      <Dialog
        open={openPopup}
        onClose={() => setOpenPopup(false)}
      >
        <div className="modalContent">
          <h2>Create Group</h2>
          <div className="modalInputContainer">
            <TextField
              label="Unnamed Group"
              fullWidth
              margin="normal"
              value={title}
              sx={{
                input: { color: 'white', backgroundColor: 'transparent', width: '300px' },
                label: { color: 'white' },
                '.MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
              }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="modalButtonsContainer">
              <button
                onClick={() => setOpenPopup(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <div className="welcomeHeader">
        <div className="welcomeText">
          <h3>Welcome, {fullName || "User"}</h3>
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
                <button onClick={() => setOpenPopup(true)}>
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
                    <h4>Uploade File</h4>
                  </div>
                </label>
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
              <button onClick={() => setOpenPopup(true)}>
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
                <div className="uploadbtn">
                  <AddRoundedIcon
                    style={{
                      paddingRight: 5,
                    }}
                  />
                  <p>Upload</p>
                </div>
              </label>
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
              <Link className="uploadbtn" to='/community'>
                <SubdirectoryArrowRightIcon
                  style={{
                    paddingRight: 5,
                  }}
                />
                Visit
              </Link>
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