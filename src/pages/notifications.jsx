import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Delete } from "@mui/icons-material";
import { InsertDriveFile } from "@mui/icons-material";
import '../style/notifications.css';
import NoNotification from "../components/noNotification";


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
              <NoNotification />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;