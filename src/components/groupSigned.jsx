import React, { useEffect, useState } from 'react'
import { StarBorderOutlined } from "@mui/icons-material";
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import api from '../api'; // Ensure your api instance is correctly configured

const GroupSigned = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingGroupId, setUploadingGroupId] = useState(null); // Track which group is uploading

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