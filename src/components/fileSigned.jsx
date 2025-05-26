import React from 'react'
import {
    ScheduleRounded,
    StarBorderOutlined,
} from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function FileSigned() {
    return (
        <div>
            <div className="files">
                <div className="tags">
                    <button>
                        <ScheduleRounded
                            style={{
                                fontSize: 20,
                                color: "white",
                                marginRight: 7,
                            }}
                        />
                        Recent
                    </button>
                    <button>
                        <StarBorderOutlined
                            style={{
                                fontSize: 23,
                                color: "white",
                                marginRight: 7,
                            }}
                        />
                        Starred
                    </button>
                </div>
            </div>

            <div className="fileTable">
                <div className="fileHeader">
                    <p>Name</p>
                    <p>Location</p>
                    <p>Owner</p>
                    <p>Date</p>
                </div>
                {[1, 2, 3, 4].map((i) => (
                    <div className="fileLines" key={i}>
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
                ))}
            </div>
        </div>
    )
}

export default FileSigned