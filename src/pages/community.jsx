import React, { useEffect, useState } from "react";
import "../style/community.css";
import NavbarCommunity from "../components/navbarCommuntiy";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Footer from "../components/footer";
import api from '../api';

function Community() {
  const [groups, setUserGroups] = useState([]);
  const [userFiles, setUserFiles] = useState([]);
  const [error, setError] = useState(null); 
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // Dropdown index state
  const navigate = useNavigate();

  // Fetch user's groups
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
            <h3>Recommended Groups</h3>
            <div className="recommended">
              <p>Find study groups and materials for your study goals</p>
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

      {/* Groups Display */}
      <div className="groupRow" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {groups.map((group, index) => (
          <div
            key={group._id}
            style={{
              position: 'relative',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              margin: '10px',
              width: '150px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              className="groupFolderHeader"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onClick={() => {
                // Navigate to the group details page
                console.log('Navigating to:', `/group/${group._id}`);
                navigate(`/group/${group._id}`);
              }}
            >
              <p style={{ margin: 0 }}>{group.title || 'Untitled Group'}</p>
              <MoreVertIcon
                onClick={(e) => {
                  e.stopPropagation(); // Prevent nav
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
                <div className="fileHeader">
                  <p>Name</p>
                  <p>Location</p>
                  <p>Owner</p>
                  <p>Date</p>
                </div>
                <div className="fileLines">
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
                <div className="fileLines">
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
                <div className="fileLines">
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
                <div className="fileLines">
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
                <div className="fileLines">
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
                <div className="fileLines">
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
                <div className="fileLines">
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
      <Footer />
    </div>
  );
}

export default Community;
