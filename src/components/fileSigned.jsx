import React, { useState, useEffect } from 'react'
import {
    ScheduleRounded,
    StarBorderOutlined,
} from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import api from '../api';
import FileNew from './fileNew';

function FileSigned() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
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

        fetchFiles();
    }, []);

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
                <div className="fileHeader" style={{ display: 'flex', fontWeight: 'bold', padding: '0.5rem', borderBottom: '2px solid #000' }}>
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
                    <FileNew />
                )}
            </div>
        </div>
    );
}

export default FileSigned;