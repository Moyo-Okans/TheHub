import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import FolderIcon from '@mui/icons-material/Folder';
import api from "../api";

function Trash() {
  const [trashedGroups, setTrashedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrashedGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/groups/trash", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTrashedGroups(response.data);
      } catch (err) {
        console.error("Failed to fetch trashed groups", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrashedGroups();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <div className="main-content">
          <div className="bodyContainer2">
            <h1>Trash</h1>
            {loading ? (
              <p>Loading trashed folders...</p>
            ) : trashedGroups.length === 0 ? (
              <p>No folders in trash.</p>
            ) : (
              <div className="trashed-groups"style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                {trashedGroups.map((group) => (
                  <div key={group._id} className="group-card">
                    <p style={{ margin: 0 }}>{group.title || "Untitled Group"}</p>
                     <FolderIcon style={{ fontSize: 100, marginTop: 10, color: 'gray' }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trash;
