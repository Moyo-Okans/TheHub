import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import api from "../api";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import '../style/groups.css';
import { Link } from "react-router-dom";
import emptyState from '../assets/empty_state.png'
import FileNew from "../components/fileNew";
import { Dialog, TextField } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // Import icon for file display
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function GroupDetails() {
  const { id: groupId } = useParams();
  const [openPopup, setOpenPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [groupName, setGroupName] = useState("");
  const [files, setFiles] = useState([]); // State for files

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fetch group details
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
          "Failed to fetch folder details:",
          error.response?.data || error.message
        );
      }
    };

    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId]);

  // Fetch files related to the group
  const fetchFiles = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No auth token");
        return;
      }
      try {
        const response = await api.get(`/groups/${groupId}/files`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(response.data); // Assuming response.data is an array of files
      } catch (err) {
        console.error("Failed to fetch files:", err);
      }
    };

    if (groupId) {
      fetchFiles();
    }
  useEffect(() => {
    fetchFiles();
  });

  const handleCreate = () => {
    console.log(title);
    setOpenPopup(false);
    setTitle('');
  };

  const handleFileChange = async (event) => {
    const filesSelected = event.target.files;
    if (!filesSelected || filesSelected.length === 0) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to upload files.");
      return;
    }

    const file = filesSelected[0];
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
      // Refresh the file list after upload
      // Fetch updated files
      const updatedFilesResponse = await api.get(`/groups/${groupId}/files`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(updatedFilesResponse.data);
    } catch (error) {
      console.error("File upload failed:", error.response?.data || error.message);
      alert("File upload failed");
    }
  };

    const handleFileDelete = async (fileId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete files.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this file?")) return;
  
    try {
      await api.delete(`/files/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the file list after deletion
      fetchFiles();
    } catch (error) {
      console.error("Failed to delete file:", error.response?.data || error.message);
      alert("Failed to delete file");
    }
  };
  
  const handleFileDownload = async (fileId, fileName) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to download files.");
      return;
    }
  
    try {
      const response = await api.get(`/files/${fileId}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });
  
      // Try to get filename from Content-Disposition header
      let downloadFileName = fileName || "file";
      const disposition = response.headers['content-disposition'];
      if (disposition && disposition.indexOf('filename=') !== -1) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          downloadFileName = match[1];
        }
      }
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", downloadFileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download file:", error.response?.data || error.message);
      alert("Failed to download file");
    }
  };

  return (
    <>
      {/* Upload Folder Popup */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <div className="modalContent">
          <h2>Create folder</h2>
          <div className="modalInputContainer">
            <TextField
              label="Unnamed folder"
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

      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer">
              <div className="groupHeader">
                <div style={{ gap: 10, alignItems: 'center' }} className="groupHeader">
                  <Link to='/folders' style={{ color: 'rgba(83, 90, 190, 0.5)', textDecoration: 'none' }}>
                    <h1>Folders</h1>
                  </Link>
                  <KeyboardArrowRightOutlinedIcon sx={{ color: '#fff' }} />
                  <h1 style={{ textTransform: 'capitalize' }}>{groupName || 'Loading...'}</h1>
                  <button onClick={openModal}><ShareOutlinedIcon /></button>
                  {isModalOpen && (
                    <div className="modalBackdrop">
                      <div className="modalContent">
                        <div className="modalContentTop">
                          <h2 className="modalContentH2">
                            Share Your Folder Link
                          </h2>
                          <CloseIcon onClick={closeModal} />
                        </div>
                        <div className="modalContentMiddle">
                          <p className="modalContentP">Event Folder URL</p>
                          <div className="urlContainer">
                            <p className="url">
                              localhost:5173/folder/
                              <span className="urlSpan">{groupId}</span>
                            </p>
                            <button
                              className="CopyButtons"
                              onClick={() => {
                                navigator.clipboard.writeText(`http://localhost:4861/folder/${groupId}`);
                                alert("Link Copied");
                              }}
                            >
                              <ContentCopyIcon alt="copy" />
                              Copy
                            </button>
                          </div>
                          <p className="shareP">
                            Share this URL with your friends/classmates so they can view materials in this private folder.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
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
                      onChange={handleFileChange}
                    />
                    <div className="create-button">
                      <AddRoundedIcon style={{ paddingRight: 5 }} />
                      <p>Upload</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional rendering based on files */}
              {files.length > 0 ? (
                <div className="fileTable">
              <div className="fileHeader" style={{ display: 'flex', fontWeight: 'bold', padding: '0.5rem', borderBottom: '1px solid #fff' }}>
                <p style={{ flex: 6 }}>Name</p>
                <p style={{ flex: 1 }}>Owner</p>
                <p style={{ flex: 3 }}>Date</p>
                <p>Actions</p>
              </div>
              {files.length > 0 ? (
                // Render files if array is not empty
                files.map((file) => (
                  <div className="fileLines" key={file._id} style={{ display: 'flex', padding: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', alignItems: 'center' }}>
                    <div className="fileName" style={{ display: 'flex', alignItems: 'center', flex: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <InsertDriveFileIcon />
                      <p style={{ margin: 0, marginLeft: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.title}</p>
                    </div>
                    <p className="owner" style={{ flex: 1, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.owner || 'Me'}</p>
                    <p className="date" style={{ flex: 3, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {new Date(file.createdAt).toLocaleDateString() || 'N/A'}
                    </p>
                    <div className="fileActionsContainer">
                      <FileDownloadOutlinedIcon sx={{color: "#425EEA"}} onClick={() => handleFileDownload(file._id, file.name)} />
                      <DeleteOutlinedIcon sx={{color: "rgba(169, 15, 15, 0.8)"}} onClick={() => handleFileDelete(file._id)} />
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <h2>No Files</h2>
                </div>
              )}
            </div>
              ) : (
                // Show FileNew component if no files
                <FileNew />
              )}

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