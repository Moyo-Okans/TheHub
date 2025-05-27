import React from 'react'
import { InsertDriveFile } from "@mui/icons-material";

function YesNotification() {
    return (
        <div className="fileGroup">
            <div className="notificationFiles">
                <div className="fileName">
                    <InsertDriveFile style={{
                        color: '#425EEA'
                    }} />
                    <p>Lolade Olukayode <span>uploaded </span>CSP 402.pdf <span>to</span> CSP Final Exam</p>
                </div>
                <div className="date">
                    <p>Mar 12, 2025</p>
                </div>
            </div>
            <div className="notificationFiles">
                <div className="fileName">
                    <InsertDriveFile style={{
                        color: '#425EEA'
                    }} />
                    <p>Moyosore Okanlawon <span>deleted </span>CSP 302.pdf <span>to</span> CSP Final Exam</p>
                </div>
                <div className="date">
                    <p>Mar 12, 2025</p>
                </div>
            </div>
            <div className="notificationFiles">
                <div className="fileName">
                    <InsertDriveFile style={{
                        color: '#425EEA'
                    }} />
                    <p>Victoria Chukwudike <span>uploaded </span>CSP 414.pdf <span>to</span> CSP Final Exam</p>
                </div>
                <div className="date">
                    <p>Mar 12, 2025</p>
                </div>
            </div>
        </div>
    )
}

export default YesNotification