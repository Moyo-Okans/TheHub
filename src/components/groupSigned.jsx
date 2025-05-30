import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { StarBorderOutlined } from "@mui/icons-material";
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import api from '../api'; // Make sure your API instance is correctly configured

const GroupSigned = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // Dropdown index state
  const navigate = useNavigate();

  // Fetch user groups
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

  // Fetch groups on component mount
  useEffect(() => {
    fetchUserGroups();
  }, []);

  const handleToggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleAction = (action, groupId) => {
    console.log(`Action: ${action} on group ID: ${groupId}`);
    setOpenDropdownIndex(null); // Close dropdown after action
  };

  if (loading) {
    return <div>Loading groups...</div>;
  }

  if (error) {
    return <div>Error loading groups: {error}</div>;
  }

  return (
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
  );
};

export default GroupSigned;
