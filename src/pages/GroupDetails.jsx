import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; // Import useParams to get route params
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import api from "../api";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import '../style/groups.css'
import emptyState from '../assets/empty_state.png'
import GroupNew from "../components/groupNew";
import FileNew from "../components/fileNew";
import { Dialog, TextField } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

function GroupDetails() {
  const { id: groupId } = useParams(); 
  const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [groupName, setGroupName] = useState("");

useEffect(() => {
  const fetchGroupDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No auth token found");
      return;
    }

    try {
      const response = await api.get(`/groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const groupData = response.data;
      setGroupName(groupData.title || groupData.name || "Untitled Group");
    } catch (error) {
      console.error(
        "Failed to fetch group details:",
        error.response?.data || error.message
      );
    }
  };

  if (groupId) {
    fetchGroupDetails();
  }
}, [groupId]);
  const handleCreate = () => {
    console.log(title);
    setOpenPopup(false);
    setTitle('');
  }

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to upload files.");
      return;
    }

    const file = files[0];
    const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, ""); // Remove extension

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", fileNameWithoutExt); 
    formData.append("tags", ''); 

    try {
      if (!groupId) {
        alert("Group ID is missing");
        return;
      }

      const response = await api.post(`/groups/${groupId}/upload`, formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});


      console.log("Upload success:", response.data);
      // TODO: optionally refresh file list or UI
    } catch (error) {
      console.error("File upload failed:", error.response?.data || error.message);
      alert("File upload failed");
    }
  };

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
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer">
              <div className="groupHeader">
                <div style={{gap: 10, alignItems: 'center'}} className="groupHeader">
                  <h1>Groups</h1>
                  <KeyboardArrowRightOutlinedIcon sx={{color: '#fff'}} />
                  <h1>{groupName || 'Loading...'}</h1>
                  <button><ShareOutlinedIcon /></button>
                </div>
                <div className="dropdown">
                  <label htmlFor="input-file">
                    <input
                      type="file"
                      accept="*/*"
                      id="input-file"
                      name="file"
                      multiple
                      hidden
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <div className="create-button">
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
              {/* CONDITIONAL RENDERING (IF statement to show either the new group screen or created group screen) */}
              <FileNew />
              {/* OR <GroupSigned /> */}
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

export default GroupDetails;