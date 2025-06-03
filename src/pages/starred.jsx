import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

function Starred() {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer">
              <h1>Starred</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Starred;
