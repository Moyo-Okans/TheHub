import React, { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";



function Settings() {
  const [activeButton, setActiveButton] = useState("General Setting");
  const [activeTab, setActiveTab] = useState("General Settings");
  const handleTabChange = (tab) => {
    setActiveButton(tab);
    setActiveTab(tab);
  };
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <Navbar />
          <div className="main-content">
            <div className="bodyContainer2">
              <div className="settings-container">
                <h1>Settings</h1>
                <button className="save-settings-btn">Save Settings</button>
              </div>
              <p className="support-text">Get effective and quick support our team</p>
              <div className="settings-btn-container">
                <button onClick={() => handleTabChange('General Settings')} className={`settings-btn ${activeButton === 'General Settings' ? 'active' : ''}`}>
                  General Setting</button>

                <button onClick={() => handleTabChange('Account Settings')} className={`settings-btn ${activeButton === 'Account Settings' ? 'active' : ''}`}>Account Settings</button>
                <button onClick={() => handleTabChange('Community Settings')} className={`settings-btn ${activeButton === 'Community Settings' ? 'active' : ''}`}>Community Settings</button>
              </div>
              <div className="bodyContainer3">
                {activeTab === 'General Settings' && <div className="GeneralSettings">
                  <h1>General Settings</h1>
                </div>}
                {activeTab === 'Account Settings' && <div className="AccountSettings">
                  <h1>Account Settings</h1>
                </div>}
                {activeTab === 'Community Settings' && <div className="CommunitySettings">
                  <h1>Community Settings</h1>
                </div>}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Settings;
