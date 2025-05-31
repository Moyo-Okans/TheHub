import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarBorderOutlined } from "@mui/icons-material";
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import api from '../api'; 
import GroupNew from './groupNew';

const GroupSigned = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroups(response.data);
      } catch (err) {
        console.error('Error fetching groups:', err);
        setError(err.response ? `Error: ${err.response.status} ${err.response.statusText}` : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGroups();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleAction = (action, groupId) => {
    console.log(`Action: ${action} on group ID: ${groupId}`);
    setOpenDropdownIndex(null);
  };

  if (loading) return <div>Loading groups...</div>;
  if (error) return <div>Error loading groups: {error}</div>;

  return (
    <div className="groups" style={{ padding: '20px' }}>
      {/* Top Buttons */}
      <div className="tags" style={{ display: 'flex', marginBottom: '20px' }}>
        <button style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <ScheduleRoundedIcon style={{ fontSize: 20, color: 'white', marginRight: 7 }} />
          Recent
        </button>
        <button style={{ display: 'flex', alignItems: 'center' }}>
          <StarBorderOutlined style={{ fontSize: 23, color: 'white', marginRight: 7 }} />
          Starred
        </button>
      </div>

      {/* Empty State */}
      {groups.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <h2>No groups yet</h2>
          <p>Create a group to get started</p>
          <GroupNew />
        </div>
      ) : (
        <div className="groupRow" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {groups.map((group, index) => (
            <div
              key={group._id}
              onClick={() => navigate(`/group/${group._id}`)}
              style={{
                position: 'relative',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px',
                width: '150px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#2a2a2a',
                color: 'white',
              }}
            >
              {/* Header */}
              <div
                className="groupFolderHeader"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <p style={{ margin: 0 }}>{group.title || 'Untitled Group'}</p>
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

              {/* Folder Icon */}
              <FolderIcon style={{ fontSize: 100, marginTop: 10, color: 'gray' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupSigned;
