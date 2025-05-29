import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import '../style/groups.css'
import emptyState from '../assets/empty_state.png'
import GroupNew from "../components/groupNew";
import GroupSigned from "../components/groupSigned";
import { Dialog, TextField } from "@mui/material";

function Groups() {
  const [openPopup, setOpenPopup] = useState(false);
  const [title, setTitle] = useState("");

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
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer">
              <div className="groupHeader">
                <h1>Groups</h1>
                <div className="dropdown">
                  <button onClick={() => setOpenPopup(true)} className="create-button">
                    <AddRoundedIcon />
                    Create
                  </button>
                </div>
              </div>
              {/* CONDITIONAL RENDERING (IF statement to show either the new group screen or created group screen) */}
              <GroupSigned />
            {/* OR <GroupSigned /> */}
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
