import React, { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../style/files.css";
import emptyState from "../assets/empty_state.png";
import { AddRounded } from "@mui/icons-material";
import FileNew from "../components/fileNew";
import FileSigned from "../components/fileSigned";
import { Dialog, TextField } from "@mui/material";

function Files() {
  const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    console.log(title);
    setOpenPopup(false);
    setTitle('');
  };

  return (
    <>
      {/* Upload File Popup */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <div className="modalContent">
          <h2>Create Group</h2>
          <div className="modalInputContainer">
            <TextField
              label="Unnamed File"
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
              <button onClick={() => setOpenPopup(false)}>Cancel</button>
              <button onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Main layout with flexbox */}
      <div className="dashboardContainer">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="dashboardContent">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer">
              <div className="filesHeader">
                <h1>Files</h1>
                <div className="dropdown">
                  <button onClick={() => setOpenPopup(true)}>
                    <AddRounded />
                    Upload
                  </button>
                </div>
              </div>

              {/* Wrap FileSigned in a container with max width */}
              <div className="fileSignedContainer">
                <FileSigned />
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

export default Files;