import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../style/files.css";
import emptyState from "../assets/empty_state.png";
import {
  AddRounded,
  ScheduleRounded,
  StarBorderOutlined,
} from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

function Files() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title) return alert("Please select a file and enter a title");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("tags", "example, tag");

    try {
      const groupId = "your-group-id"; // Replace with actual groupId
      const res = await axios.post(
        `http://localhost:5000/api/files/upload/${groupId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${yourAuthToken}`, // Replace with your actual token
          },
        }
      );
      console.log("Upload success:", res.data);
      alert("File uploaded successfully!");
      setOpenPopup(false); // close popup
      setFile(null);       // reset form
      setTitle("");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("File upload failed.");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <div className="main-content">
          <div className="bodyContainer">
            <div className="filesHeader">
              <h1>Files</h1>
              <button onClick={() => setOpenPopup(true)}>
                <AddRounded />
                Upload
              </button>
            </div>

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
              {[1, 2, 3, 4].map((i) => (
                <div className="fileLines" key={i}>
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
              ))}
            </div>
          </div>

          <div className="activityContainer">
            <h2>My Hub Activity</h2>
            <div
              style={{ height: 1, backgroundColor: "gray", marginTop: 20 }}
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

      {/* Upload File Popup */}
      <Dialog 
        open={openPopup} 
        onClose={() => setOpenPopup(false)}
        >
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} style={{ marginTop: "15px" }} />
          <Button
            variant="contained"
            onClick={handleUpload}
            style={{ marginTop: "20px" }}
          >
            Upload
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Files;
