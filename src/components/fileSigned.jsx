import React, { useState, useEffect } from 'react'
import {
    ScheduleRounded,
    StarBorderOutlined,
} from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import api from '../api';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function FileSigned() {
    const [files, setFiles] = useState([]);

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
    useEffect(() => {
       fetchFiles();
    }, []);
    const handleFileDelete = async (fileId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to delete files.");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this file?")) return;

        try {
            await api.delete(`/files/${fileId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Refresh the file list after deletion
            fetchFiles();
        } catch (error) {
            console.error("Failed to delete file:", error.response?.data || error.message);
            alert("Failed to delete file");
        }
    };

    const handleFileDownload = async (fileId, fileName) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to download files.");
            return;
        }

        try {
            const response = await api.get(`/files/${fileId}/download`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
            });

            // Try to get filename from Content-Disposition header
            let downloadFileName = fileName || "file";
            const disposition = response.headers['content-disposition'];
            if (disposition && disposition.indexOf('filename=') !== -1) {
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match && match[1]) {
                    downloadFileName = match[1];
                }
            }

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", downloadFileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download file:", error.response?.data || error.message);
            alert("Failed to download file");
        }
    };

    return (
        <div>
            <div className="files">
                <div className="tags">
                    <button>
                        <ScheduleRounded />
                        Recent
                    </button>
                    <button>
                        <StarBorderOutlined />
                        Starred
                    </button>
                </div>
            </div>

            <div className="fileTable">
                <div className="fileHeader" style={{ display: 'flex', fontWeight: 'bold', padding: '0.5rem', borderBottom: '1px solid #fff' }}>
                    <p style={{ flex: 6 }}>Name</p>
                    <p style={{ flex: 1 }}>Owner</p>
                    <p style={{ flex: 3 }}>Date</p>
                    <p>Actions</p>
                </div>
                {files.length > 0 ? (
                    // Render files if array is not empty
                    files.map((file) => (
                        <div className="fileLines" key={file._id} style={{ display: 'flex', padding: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', alignItems: 'center' }}>
                            <div className="fileName" style={{ display: 'flex', alignItems: 'center', flex: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <InsertDriveFileIcon />
                                <p style={{ margin: 0, marginLeft: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.title}</p>
                            </div>
                            <p className="owner" style={{ flex: 1, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.owner || 'Me'}</p>
                            <p className="date" style={{ flex: 3, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {new Date(file.createdAt).toLocaleDateString() || 'N/A'}
                            </p>
                            <div className="fileActionsContainer">
                                <FileDownloadOutlinedIcon sx={{ color: "#425EEA" }} onClick={() => handleFileDownload(file._id, file.name)} />
                                <DeleteOutlinedIcon sx={{ color: "rgba(169, 15, 15, 0.8)" }} onClick={() => handleFileDelete(file._id)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <h2>No Files</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileSigned;