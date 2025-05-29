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
  const navigate = useNavigate(); // Initialize navigation hook

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
        {groups.map((group) => (
          <div
            key={group._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              margin: '10px',
              width: '150px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              // Navigate to the group details page
              console.log('Navigating to:', `/group/${group._id}`);
              navigate(`/group/${group._id}`);
            }}
          >
            <div
              className="groupFolderHeader"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <p style={{ margin: 0 }}>{group.title || 'Untitled Group'}</p>
              <MoreVertIcon />
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
  );
};

export default GroupSigned;