import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import '../style/groups.css'
import emptyState from '../assets/empty_state.png'
import GroupSigned from "../components/groupSigned";
import { Dialog, TextField } from "@mui/material";
// Make sure to import your API instance
import api from '../api';

function Groups() {
  const [openPopup, setOpenPopup] = useState(false);
  const [groupName, setGroupName] = useState(''); // Added state for groupName
  const [courseCode, setCourseCode] = useState(''); // Added state for courseCode

  // Handle create group function
  const handleCreate = async () => {
    if (!groupName.trim()) {
      alert("Please enter a folder name");
      return;
    }
    if (!courseCode.trim()) {
      alert("Please enter a course code");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a folder");
      return;
    }

    try {
      const response = await api.post(
        "/groups",
        {
          title: groupName,
          courseCode: courseCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("folder created:", response.data);
      setOpenPopup(false);
      setGroupName("");
      setCourseCode("");
    } catch (error) {
      console.error("Failed to create group:", error.response?.data || error.message);
      alert("Failed to create group");
    }
  };

  return (
    <>
      {/* Upload File Popup */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <div className="modalContentt">
          <h2>Create Folder</h2>
          <div className="modalInputContainerr">
            <TextField
              label="Folder Name"
              fullWidth
              margin="normal"
              value={groupName}
              sx={{
                input: { color: 'white', backgroundColor: 'transparent', width: '300px' },
                label: { color: 'white' },
                '.MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
              }}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <TextField
              label="Course Code"
              fullWidth
              margin="normal"
              value={courseCode}
              sx={{
                input: { color: 'white', backgroundColor: 'transparent', width: '300px' },
                label: { color: 'white' },
                '.MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
              }}
              onChange={(e) => setCourseCode(e.target.value)}
            />

            <div className="modalButtonsContainerr">
              <button onClick={() => setOpenPopup(false)}>Cancel</button>
              <button onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>
      </Dialog>

      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer">
              <div className="groupHeader" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Folders</h1>
                <div className="dropdown">
                  <button onClick={() => setOpenPopup(true)} className="create-button">
                    <AddRoundedIcon />
                    Create
                  </button>
                </div>
              </div>
              {/* Show groups */}
              <GroupSigned />
            </div>
            <div className="activityContainer">
              <h2>My Hub Activity</h2>
              <div style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 20
              }} />
              <img src={emptyState} className="emptyStateImg" />
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