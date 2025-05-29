import React, { useState } from 'react';
import { StarBorderOutlined } from "@mui/icons-material";
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';

function GroupSigned() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const handleToggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleAction = (action, index) => {
    console.log(`Action: ${action} on folder #${index}`);
    setOpenDropdownIndex(null);
  };

  const renderGroupFolder = (index) => (
    <div className="groupFolder" key={index}>
      <div className="groupFolderHeader">
        <p>CSC Final Exam Group {index + 1}</p>
        <div className="dropdownWrapper">
          <MoreVertIcon
            onClick={() => handleToggleDropdown(index)}
            style={{ cursor: 'pointer' }}
          />
          {openDropdownIndex === index && (
            <div className="dropdownMenu">
              <button onClick={() => handleAction('share', index)}>Share</button>
              <button onClick={() => handleAction('star', index)}>Star</button>
              <button onClick={() => handleAction('delete', index)}>Delete</button>
            </div>
          )}
        </div>
      </div>
      <FolderIcon
        style={{
          fontSize: 120,
          margin: 0,
          padding: 0,
          color: "gray"
        }}
      />
    </div>
  );

  const rows = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11]
  ];

  return (
    <div className="groups">
      <div className="tags">
        <button>
          <ScheduleRoundedIcon style={{ fontSize: 20, color: 'white', marginRight: 7 }} />
          Recent
        </button>
        <button>
          <StarBorderOutlined style={{ fontSize: 23, color: 'white', marginRight: 7 }} />
          Starred
        </button>
      </div>

      {rows.map((row, rowIndex) => (
        <div className="groupRow" key={rowIndex}>
          {row.map((index) => renderGroupFolder(index))}
        </div>
      ))}
    </div>
  );
}

export default GroupSigned;
