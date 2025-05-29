import React, { useState, useEffect, useRef } from "react";
import { MoreVert } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { StarBorderOutlined } from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ScheduleRounded } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FolderIcon from "@mui/icons-material/Folder";
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
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingGroupId, setUploadingGroupId] = useState(null); // Track which group is uploading

  // State variables for creating a group
  const [groupName, setGroupName] = useState(""); // Corrected variable name
  const [courseCode, setCourseCode] = useState("");

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

  useEffect(() => {
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

    fetchUserGroups();
  }, []);

  // Handle file upload
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
  };

  const handleGroupClick = async (group) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You need to be logged in to perform this action.');
      return;
    }

    setUploadingGroupId(group._id); // Indicate this group is uploading

    try {
      await api.post('groups/upload', { groupId: group._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Group uploaded successfully!');
    } catch (err) {
      console.error('Error uploading group:', err);
      alert('Failed to upload the group.');
    } finally {
      setUploadingGroupId(null); // Reset uploading state
    }
  };

  // Handle create group
  const handleCreate = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }
    if (!courseCode.trim()) {
      alert("Please enter a course code");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a group");
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
      console.log("Group created:", response.data);
      setOpenPopup(false);
      setGroupName("");
      setCourseCode("");
    } catch (error) {
      console.error("Failed to create group:", error.response?.data || error.message);
      alert("Failed to create group");
    }
  };

  if (loading) {
    return <div>Loading groups...</div>;
  }

  if (error) {
    return <div>Error loading groups: {error}</div>;
  }


  return (
    <>
      {/* Create Group Popup */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <div className="modalContent">
          <h2>Create Group</h2>
          <div className="modalInputContainer">
            <TextField
              label="Group Name"
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

            <div className="modalButtonsContainer">
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
                <button onClick={() => setOpenPopup(true)}>Create Group</button>
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
      {groups.length === 0 ? (
        <div className="default">
          {/* Default screen (no groups yet) */}
          <div className="actionBox">
            <h3>Actions</h3>
            <div className="boxes">
              {/* Create Group Box */}
              <div className="groupContainer">
                <FolderIcon style={{ fontSize: 60, color: "#282a2c" }} />
                <h3>Create a group</h3>
                <p>Create your first Group to start collaborations with your study group members</p>
                <div className="fullWidth">
                  <button onClick={() => setOpenPopup(true)}>
                    <AddRoundedIcon style={{ paddingRight: 5 }} />
                    Create
                  </button>
                </div>
              </div>

              {/* Upload File Box */}
              <div className="groupContainer">
                <InsertDriveFileIcon style={{ fontSize: 60, color: "#282a2c" }} />
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
          </div>

          <div className="emptyFiles">
            <FolderIcon style={{ fontSize: 60, color: "#282a2c" }} />
            <h2>No files found</h2>
            <p>Your files and groups will be shown here, you can create a group or upload a file now above</p>
          </div>
        </div>
      ) : (
        <div>
          {/* Group View */}
          <div className="actionBox">
            <h3>Groups</h3>
            <div className="groupRow" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {groups.map((group) => (
                <div
                  className="groupFolder"
                  key={group._id}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    margin: '10px',
                    width: '150px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    opacity: uploadingGroupId === group._id ? 0.5 : 1,
                    pointerEvents: uploadingGroupId === group._id ? 'none' : 'auto',
                  }}
                  onClick={() => handleGroupClick(group)}
                >
                  <div
                    className="groupFolderHeader"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <p style={{ margin: 0 }}>{group.title || 'Untitled Group'}</p>
                    <MoreVert />
                  </div>
                  <FolderIcon
                    style={{
                      fontSize: 120,
                      marginTop: 10,
                      color: 'gray',
                    }}
                  />
                </div>
              ))}
            </div>
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
              <div className="fileHeader">
                <p>Name</p>
                <p>Location</p>
                <p>Owner</p>
                <p>Date</p>
              </div>
              <div className="fileLines">
                <div className="fileName">
                  <InsertDriveFileIcon style={{ color: "#425EEA", fontSize: 22 }} />
                  <p>CSC 104</p>
                </div>
                <p className="location">CSC Final Exam Preparations</p>
                <p className="owner">Me</p>
                <p className="date">March 12, 2025</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default NewUser;