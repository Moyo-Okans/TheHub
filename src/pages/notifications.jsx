import React, {useState} from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Delete } from "@mui/icons-material";
import { InsertDriveFile } from "@mui/icons-material";
import '../style/notifications.css';


function Notifications() {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer2">
              <div className="welcomeHeader">
                <div className="welcomeText">
                  <h1>Notifications</h1>
                </div>
                <button>
                  <Delete/>
                  Delete All
                </button>
              </div>
              <div className="notificationBtn">
                <button className="all">All</button>
                <button >Uploaded</button>
                <button >Deleted</button>
              </div>
              <div className="fileGroup">
                <div className="notificationFiles">
                  <div className="fileName">
                    <InsertDriveFile style={{
                      color: '#425EEA'
                    }}/>
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
                    }}/>
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
                    }}/>
                    <p>Victoria Chukwudike <span>uploaded </span>CSP 414.pdf <span>to</span> CSP Final Exam</p>
                  </div>
                  <div className="date">
                    <p>Mar 12, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;