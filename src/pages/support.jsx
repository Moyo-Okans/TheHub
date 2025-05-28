import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Phone } from "@mui/icons-material";
import '../style/support.css'

function Support() {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer2">
              <div className="header">
                <div className="text">
                  <h3>Support</h3>
                  <p>Open your files or folders here!</p>
                </div>
                <button>
                    
                    <Phone/>
                    Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Support;
