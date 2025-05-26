// import React, { useState } from "react";
// import axios from "axios";
// import Navbar from "../components/navbar";
// import Sidebar from "../components/sidebar";
// import "../style/files.css";
// import emptyState from "../assets/empty_state.png";
// import {
//   AddRounded,
//   ScheduleRounded,
//   StarBorderOutlined,
// } from "@mui/icons-material";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
// } from "@mui/material";

// function Files() {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [openPopup, setOpenPopup] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//   const formData = new FormData();
//   formData.append('title', title); // or whatever your title state is
//   // formData.append('tags', tags);   // optional
//   formData.append('file', file); // Corrected

//   // formData.append('file', selectedFile); // <-- This MUST be 'file'

//   try {
//     const response = await axios.post(`http://localhost:5175/api/files/${groupId}/upload`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${yourToken}` // if using JWT
//       },
//     });
//     console.log('Upload success:', response.data);
//   } catch (error) {
//     console.error('Upload failed:', error.response?.data || error.message);
//     alert("File upload failed");
//   }
// };

//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="dashboard-content">
//         <Navbar />
//         <div className="main-content">
//           <div className="bodyContainer">
//             <div className="filesHeader">
//               <h1>Files</h1>
//               <button onClick={() => setOpenPopup(true)}>
//                 <AddRounded />
//                 Upload
//               </button>
//             </div>

//             <div className="files">
//               <div className="tags">
//                 <button>
//                   <ScheduleRounded
//                     style={{
//                       fontSize: 20,
//                       color: "white",
//                       marginRight: 7,
//                     }}
//                   />
//                   Recent
//                 </button>
//                 <button>
//                   <StarBorderOutlined
//                     style={{
//                       fontSize: 23,
//                       color: "white",
//                       marginRight: 7,
//                     }}
//                   />
//                   Starred
//                 </button>
//               </div>
//             </div>

//             <div className="fileTable">
//               <div className="fileHeader">
//                 <p>Name</p>
//                 <p>Location</p>
//                 <p>Owner</p>
//                 <p>Date</p>
//               </div>
//               {[1, 2, 3, 4].map((i) => (
//                 <div className="fileLines" key={i}>
//                   <div className="fileName">
//                     <InsertDriveFileIcon
//                       style={{
//                         color: "#425EEA",
//                         fontSize: 22,
//                       }}
//                     />
//                     <p>CSC 104</p>
//                   </div>
//                   <p className="location">CSC Final Exam Preparations</p>
//                   <p className="owner">Me</p>
//                   <p className="date">March 12,2025</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="activityContainer">
//             <h2>My Hub Activity</h2>
//             <div
//               style={{ height: 1, backgroundColor: "gray", marginTop: 20 }}
//             />
//             <img src={emptyState} className="emptyStateImg" />
//             <p
//               style={{
//                 textAlign: "center",
//                 fontFamily: "'Roboto', sans-serif",
//                 fontSize: 15,
//               }}
//             >
//               Select an item to see its activities
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Upload File Popup */}
//       <Dialog 
//         open={openPopup} 
//         onClose={() => setOpenPopup(false)}
//         >
//         <DialogTitle>Upload File</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             fullWidth
//             margin="normal"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input type="file" onChange={handleFileChange} style={{ marginTop: "15px" }} />
//           <Button
//             variant="contained"
//             onClick={handleUpload}
//             style={{ marginTop: "20px" }}
//           >
//             Upload
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default Files;


import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../style/files.css";
import emptyState from "../assets/empty_state.png";
import {
  AddRounded,
} from "@mui/icons-material";
import FileNew from "../components/fileNew";
import FileSigned from "../components/fileSigned";
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
  const [tags, setTags] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  // Replace these with actual values
  const groupId = "your-group-id";
  const token = "your-jwt-token";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title) {
      alert("Please provide both a title and a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("file", file); // Correct reference

    try {
      const response = await axios.post(
        `http://localhost:5175/api/files/${groupId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Replace with actual token logic
          },
        }
      );
      console.log("Upload success:", response.data);
      alert("File uploaded successfully!");
      setOpenPopup(false);
      setTitle("");
      setTags("");
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("File upload failed");
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
                  <ScheduleRounded style={{ fontSize: 20, color: "white", marginRight: 7 }} />
                  Recent
                </button>
                <button>
                  <StarBorderOutlined style={{ fontSize: 23, color: "white", marginRight: 7 }} />
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
                    <InsertDriveFileIcon style={{ color: "#425EEA", fontSize: 22 }} />
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
            <div style={{ height: 1, backgroundColor: "gray", marginTop: 20 }} />
            <img src={emptyState} className="emptyStateImg" />
            <p style={{ textAlign: "center", fontFamily: "'Roboto', sans-serif", fontSize: 15 }}>
              Select an item to see its activities
            </p>
          </div>
        </div>
      </div>

      {/* Upload File Popup */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Tags (comma separated)"
            fullWidth
            margin="normal"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
