import React, { useState, useEffect, useRef } from "react";
import { MoreVert } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { StarBorderOutlined } from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import '../style/groups.css';
import { ScheduleRounded } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FolderIcon from "@mui/icons-material/Folder";
import PublicIcon from "@mui/icons-material/Public";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, TextField } from "@mui/material";
import api from "../api";
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function NewUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const dropdownRef = useRef(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State variables for creating a group
  const [groupName, setGroupName] = useState(""); // Corrected variable name
  const [courseCode, setCourseCode] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  var handleToggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };
  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  // Fetch user's files from API
  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.get('/files/my-files', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API RESPONSE:', response.data);

      // Assuming response.data is an array of files
      setFiles(response.data.files);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  const fetchUserGroups = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No authentication token found.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('groups/my-groups', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(response.data);
    } catch (err) {
      console.error('Error fetching groups:', err);
      if (err.response) {
        setError(`Error: ${err.response.status} ${err.response.statusText}`);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect only calls fetchUserGroups on mount
  useEffect(() => {
    fetchUserGroups();
    fetchFiles();
  }, []);

  // Handle file upload
  const handleFileChange = async (event) => {
    setLoading(true);
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
    formData.append("tags", ""); // Optional

    try {
      const response = await api.post('/files/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Upload success:", response.data);
      // You can refresh your file list here if needed
    } catch (error) {
      console.error("File upload failed:", error.response?.data || error.message);
      alert("File upload failed");
    }
    setLoading(false);
    fetchFiles();
  };


  // Handle create group
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
      fetchUserGroups();
      fetchFiles();
    } catch (error) {
      console.error("Failed to create folder:", error.response?.data || error.message);
      alert("Failed to create folder");
    }
  };

  const handleAction = async (action, groupId) => {
    setOpenDropdownIndex(null);

    if (action === 'share') {
      openModal();
    } else {
      console.log(`Action: ${action} on folder ID: ${groupId}`);
    };

    if (action === 'delete') {
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
      try {
        const token = localStorage.getItem("token");
        await api.delete(`/groups/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Remove deleted group from UI
        console.log('Deleted Successfully');

      } catch (err) {
        console.error("Delete failed:", err.response?.data || err.message);
        alert("Failed to delete the folder. Please try again.");
      }
    } else {
      console.log(`Action: ${action} on folder ID: ${groupId}`);
    };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error loading groups: {error}</div>;
  }


  return (
    <>

      {/* Create Group Popup */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <div className="modalContentt">
          <h2>Create folder</h2>
          <div className="modalInputContainerr">
            <TextField
              label="folder Name"
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

      {/* Header with create options */}
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
                <button onClick={() => setOpenPopup(true)}>Create folder</button>
              </li>
              <li>
                <label htmlFor="input-file">
                  <input
                    type="file"
                    accept="*/*"
                    id="input-file"
                    multiple
                    hidden
                    onChange={handleFileChange}
                  />
                  <div className="uploadButton">
                    <h4>Upload File</h4>
                  </div>
                </label>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Actions section */}
      {groups.length === 0 && files.length === 0 ? (
        <div className="default">
          {/* Default screen (no groups yet) */}
          <div className="actionBox">
            <h3>Actions</h3>
            <div className="boxes">
              {/* Create Group Box */}
              <div className="groupContainer">
                <CreateNewFolderOutlinedIcon style={{ fontSize: 60, color: "rgba(66, 94, 234, 0.3)" }} />
                <h3>Create a folder</h3>
                <p>Create your first folder to start collaborations with your study group members</p>
                <div className="fullWidth">
                  <button onClick={() => setOpenPopup(true)}>
                    <AddRoundedIcon style={{ paddingRight: 5 }} />
                    Create
                  </button>
                </div>
              </div>

              {/* Upload File Box */}
              <div className="groupContainer">
                <NoteAddOutlinedIcon style={{ fontSize: 60, color: "rgba(66, 94, 234, 0.3)" }} />
                <h3>Upload a file</h3>
                <p>Select and Upload your first note/material PDF, DOCX, DOC etc.</p>
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
                      <AddRoundedIcon style={{ paddingRight: 5 }} />
                      <p>Upload</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Community Box */}
              <div className="groupContainer">
                <PublicIcon style={{ fontSize: 60, color: "rgba(66, 94, 234, 0.3)" }} />
                <h3>Go to community</h3>
                <p>Need inspiration or simply looking for materials? Visit TheHub Community</p>
                <div className="fullWidth">
                  <Link className="uploadbtn" to='/community'>
                    <SubdirectoryArrowRightIcon style={{ paddingRight: 5 }} />
                    Visit
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="emptyFiles">
            <InsertDriveFileIcon style={{ fontSize: 60, color: "#282a2c" }} />
            <h2>No files found</h2>
            <p>Your files and folders will be shown here, you can create a folder or upload a file now above</p>
          </div>
        </div>
      ) : (
        <div>
          {/* folder View */}
          <div className="actionBox">
            <h3>Folders</h3>
            {groups.length === 0 ? (
              <div className="boxes">
                {/* Create folder Box */}
                <div className="groupContainer">
                  <FolderIcon style={{ fontSize: 60, color: "#282a2c" }} />
                  <h3>Create a Folder</h3>
                  <p>Create your first folder to collaborate with your study group members</p>
                  <div className="fullWidth">
                    <button onClick={() => setOpenPopup(true)}>
                      <AddRoundedIcon style={{ paddingRight: 5 }} />
                      Create
                    </button>
                  </div>
                </div>

                {/* Community Box */}
                <div className="groupContainer">
                  <PublicIcon style={{ fontSize: 60, color: "#282a2c" }} />
                  <h3>Go to community</h3>
                  <p>Need inspiration or simply looking for materials? Visit TheHub Community</p>
                  <div className="fullWidth">
                    <Link className="uploadbtn" to='/community'>
                      <SubdirectoryArrowRightIcon style={{ paddingRight: 5 }} />
                      Visit
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="groupRow" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {groups.map((group, index) => (
                  <div
                    key={group._id}
                    onClick={() => navigate(`/folder/${group._id}`)}
                    style={{
                      position: 'relative',
                      border: '1px solid rgb(53, 53, 53)',
                      borderRadius: '8px',
                      padding: '10px 5px 10px 15px',
                      marginTop: '10px',
                      width: '200px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      color: 'white',
                    }}
                  >
                    <div
                      className="groupFolderHeader"
                    >
                      <p style={{ margin: 0, textTransform: 'capitalize' }}>{group.title || 'Untitled folder'}</p>
                      <MoreVert
                        onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          handleToggleDropdown(index);
                        }}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    {isModalOpen && (
                      <div className="modalBackdrop">
                        <div className="modalContent">
                          <div className="modalContentTop">
                            <h2 className="modalContentH2">
                              Share Your folder Link
                            </h2>
                            <CloseIcon
                              onClick={closeModal}
                              alt="close"
                            />
                          </div>
                          <div className="modalContentMiddle">
                            <p className="modalContentP">Event folder URL</p>
                            <div className="urlContainer">
                              <p className="url">
                                localhost:5173/folder/
                                <span className="urlSpan">{group._id}</span>
                              </p>
                              <button
                                className="CopyButtons"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `http://localhost:5173/folder/${group._id}`
                                  )
                                  alert("Link Copied")
                                }

                                }
                              >
                                <ContentCopyIcon sx={{
                                  fontSize: '15px'
                                }} alt="copy" />
                                Copy
                              </button>
                            </div>
                            <p className="shareP">
                              Share this URL with your friends/classmates so
                              they can view materials in this private folder.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Dropdown */}
                    {openDropdownIndex === index && (
                      <div
                        ref={dropdownRef}
                        className="dropdownMenu"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          position: 'absolute',
                          top: 40,
                          right: 10,
                          backgroundColor: '#1e1e1e',
                          border: '1px solid #444',
                          borderRadius: '6px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                          zIndex: 1000,
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '4px 0',
                          minWidth: '110px',
                        }}
                      >
                        {['share', 'star', 'delete'].map((action) => (
                          <button
                            key={action}
                            onClick={() => handleAction(action, group._id)}
                            style={{
                              padding: '8px 12px',
                              background: 'none',
                              border: 'none',
                              color: 'white',
                              textAlign: 'left',
                              cursor: 'pointer',
                              width: '100%',
                              fontSize: '14px',
                            }}
                          >
                            {action.charAt(0).toUpperCase() + action.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                    <FolderIcon
                      style={{
                        fontSize: 150,
                        marginTop: 0,
                        color: 'gray',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Files Section */}
          <div className="actionBox">
            <h3>Files</h3>
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
              <div className="fileHeader" style={{ display: 'flex', fontWeight: 'bold', padding: '0.5rem', borderBottom: '1px solid #fff' }}>
                <p style={{ flex: 5 }}>Name</p>
                <p style={{ flex: 2 }}>Location</p>
                <p style={{ flex: 1 }}>Owner</p>
                <p style={{ flex: 3 }}>Date</p>
              </div>
              {files.length > 0 ? (
                // Render files if array is not empty
                files.map((file) => (
                  <div className="fileLines" key={file._id} style={{ display: 'flex', padding: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', alignItems: 'center' }}>
                    <div className="fileName" style={{ display: 'flex', alignItems: 'center', flex: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <InsertDriveFileIcon />
                      <p style={{ margin: 0, marginLeft: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.title}</p>
                    </div>
                    <p className="location" style={{ flex: 2.3, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.location || 'N/A'}</p>
                    <p className="owner" style={{ flex: 1, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.owner || 'Me'}</p>
                    <p className="date" style={{ flex: 2.8, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {new Date(file.createdAt).toLocaleDateString() || 'N/A'}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <h2>No Files</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default NewUser;