import React, { useEffect, useState } from "react";
import "../style/community.css";
import logo from '../assets/logo.png';
import NavbarCommunity from "../components/navbarCommuntiy";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import { StarBorderOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import api from '../api';

function Community() {
  const [groups, setUserGroups] = useState([]);
  const [files, setUserFiles] = useState([]);
  const [error, setError] = useState(null); 
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // Dropdown index state
  const navigate = useNavigate();

  // Fetch user's groups
  const fetchUserGroups = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
       setError('No authentication token found.');
      return;
    }

    try {
      const response = await api.get('groups/my-groups', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserGroups(response.data);
    } catch (err) {
      console.error('Error fetching groups:', err);
    }
  };

  // Fetch user's files
  const fetchUserFiles = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      // handle missing token if necessary
      return;
    }

    try {
      const response = await api.get('/files/files', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserFiles(response.data);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  useEffect(() => {
    fetchUserGroups();
    fetchUserFiles();
  }, []);

    const handleToggleDropdown = (index) => {
      setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };
  
    const handleAction = async (action, groupId) => {
      setOpenDropdownIndex(null);
  
      if (action === 'delete') {
        try {
          const token = localStorage.getItem("token");
          await api.delete(`/groups/${groupId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          // Remove deleted group from UI
          setUserGroups((prev) => prev.filter((g) => g._id !== groupId));
        } catch (err) {
          console.error("Delete failed:", err.response?.data || err.message);
          alert("Failed to delete the group. Please try again.");
        }
      } else {
        console.log(`Action: ${action} on group ID: ${groupId}`);
      }
    };

    if (error) return <div>Error loading folders/files: {error}</div>;

  return (
    <div>
      <NavbarCommunity />
      <div className="community-container">
        <div className="community-header">
          <h1>
            Discover public community <span>study groups, materials</span> and a{" "}
            <span>forum to do more.</span>
          </h1>
          <div className="searchbar">
            <SearchOutlinedIcon sx={{ fontSize: "24px", color: "#C4C7C5" }} />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search for your files and groups"
            />
          </div>
        </div>
        <div className="community-content">
          <div className="communityContentHead">
            <h3>Recommended Folders</h3>
            <div className="recommended">
              <p>Find materials for your study goals</p>
              <Link>See More</Link>
            </div>
          </div>
           <div className="groups">
      {/* Tags Buttons */}
      <div className="tags" style={{ display: 'flex', marginBottom: '20px' }}>
        <button style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <ScheduleRoundedIcon
            style={{
              fontSize: 20,
              color: 'white',
              marginRight: 7,
            }}
          />
          Recent
        </button>
        <button style={{ display: 'flex', alignItems: 'center' }}>
          <StarBorderOutlined
            style={{
              fontSize: 23,
              color: 'white',
              marginRight: 7,
            }}
          />
          Starred
        </button>
      </div>

      {/* folders Display */}
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
                width: '200px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                color: 'white',
              }}
            >
            <div
              className="groupFolderHeader"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p style={{ margin: 0, textTransform: 'capitalize' }}>{group.title || 'Untitled Group'}</p>
                <MoreVertIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    handleToggleDropdown(index);
                  }}
                  style={{ cursor: 'pointer' }}
                />
            </div>

            {/* Dropdown */}
            {openDropdownIndex === index && (
              <div
                className="dropdownMenu"
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
                <button
                  onClick={() => handleAction('share', group._id)}
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
                  Share
                </button>
                <button
                  onClick={() => handleAction('star', group._id)}
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
                  Star
                </button>
                <button
                  onClick={() => handleAction('delete', group._id)}
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
                  Delete
                </button>
              </div>
            )}

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
        </div>
        <div className="community-content">
          <div className="communityContentHead">
            <h3>Public Files</h3>
            <div className="recommended">
              <p>Public files that could help your educational journey</p>
              <Link>See More</Link>
            </div>
          </div>
          <div className="fileTable paddingTop">
                <div className="fileHeader" style={{  display: 'flex', fontWeight: 'bold', padding: '0.5rem', borderBottom: '2px solid #000' }}>
                    <p style={{ flex: 2 }}>Name</p>
                    <p style={{ flex: 3 }}>Location</p>
                    <p style={{ flex: 2 }}>Owner</p>
                    <p style={{ flex: 2 }}>Date</p>
                </div>
                {files.length > 0 ? (
                    // Render files if array is not empty
                    files.map((file) => (
                        <div className="fileLines" key={file._id} style={{ display: 'flex', padding: '0.5rem', borderBottom: '1px solid #ddd', alignItems: 'center' }}>
                            <div className="fileName" style={{ display: 'flex', alignItems: 'center', flex: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <InsertDriveFileIcon />
                                <p style={{ margin: 0, marginLeft: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.title}</p>
                            </div>
                            <p className="location" style={{ flex: 3, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.location || 'N/A'}</p>
                            <p className="owner" style={{ flex: 2, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.owner || 'Me'}</p>
                            <p className="date" style={{ flex: 2, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {new Date(file.createdAt).toLocaleDateString() || 'N/A'}
                            </p>
                        </div>
                    ))
                ) : (
                    <div>
                      No files yet
                    </div>
                )}
              </div>
             <div className="communityContentHead3">
            <h3>Popular Courses</h3>
            <div className="popular">
              <p>Find study groups and materials for your study goals</p>
              <Link>See More</Link>
            </div>
          </div>
          <div className="groupRow1">
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Agricultural Science</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Business Administration</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Computer Science</p>
               
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Dentistry Science</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Economics</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Forestry Technology</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Geography and Planning</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Health Education</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
              <div className="first">
                <div className="logo-text">
                  <img src={logo} alt="" className="footerLogo" />
                  <h3>The Hub</h3>
                </div>
                <p className='copy'>&copy; {new Date().getFullYear()}</p>
              </div>
              <div className="first first1">
                <p>Community guidelines. Terms of service</p>
              </div>
              <div className="first">
                <p>Made with love by Moyosore</p>
              </div>
            </div>
    </div>
  );
}

export default Community;
