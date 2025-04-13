import React from "react";
import emptyState from "../assets/empty_state.png"
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import '../style/groups.css';
import SignedIn from "../components/signedin";
import NewUser from "../components/newUser";

function Dashboard() {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer">
              <NewUser />
              {/* <SignedIn /> */}
              
            </div>
            <div className="activityContainer">
              <h2>My Hub Activity</h2>
              <div style={{
                height: 1,
                backgroundColor: "gray",
                marginTop: 20
              }}/>
              <img src={emptyState} className="emptyStateImg"/>
              <p style={{
                textAlign: "center",
                fontFamily: "'Roboto', sans-serif",
                fontSize: 15
              }}>Select an item to see its activities</p>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
