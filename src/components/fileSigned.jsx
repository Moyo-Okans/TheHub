import React, { useState, useEffect } from 'react'
import {
    ScheduleRounded,
    StarBorderOutlined,
} from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import api from '../api';

function FileSigned() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Fetch user's files from API
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await api.get('/files/files', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Assuming response.data is an array of files
                setFiles(response.data);
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

            <div className="fileTable" style={{ width: '80%', maxWidth: '800px', margin: '0 auto' }}>
                <div className="fileHeader">
                    <p>Name</p>
                    <p>Location</p>
                    <p>Owner</p>
                    <p>Date</p>
                </div>
                {files.map((file) => (
                    <div
                        className="fileLines"
                        key={file._id} // Updated key to use _id
                        style={{
                            display: 'flex',
                            padding: '0.5rem',
                            borderBottom: '1px solid #ddd',
                            alignItems: 'center'
                        }}
                    >
                        <div
                            className="fileName"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flex: 2,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            <InsertDriveFileIcon />
                            <p
                                style={{
                                    margin: 0,
                                    marginLeft: '8px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {file.title}
                            </p>
                        </div>
                        <p
                            className="location"
                            style={{
                                flex: 3,
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {file.location || 'N/A'}
                        </p>
                        <p
                            className="owner"
                            style={{
                                flex: 2,
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {file.owner || 'Me'}
                        </p>
                        <p
                            className="date"
                            style={{
                                flex: 2,
                                margin: 0,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {new Date(file.createdAt).toLocaleDateString() || 'N/A'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileSigned;