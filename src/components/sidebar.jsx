import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import logo from "../assets/Frame 13.png";

// Material Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FirstPageOutlinedIcon from "@mui/icons-material/FirstPageOutlined";
import "../style/sidebar.css";

export default function Sidebar() {
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");
  const location = useLocation();

  // Set active item based on the current route
  useEffect(() => {
    setActiveItem(location.pathname);

    // Open the "My Hub" dropdown if a child route is active
    if (
      location.pathname.includes("/groups") ||
      location.pathname.includes("/files")
    ) {
      setIsHubOpen(true);
    }
  }, [location]);

  const toggleHub = () => {
    setIsHubOpen(!isHubOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <img src={logo} alt="" />
          <h3>The Hub</h3>
        </div>
        <div className="sidebar-nav">
          {/* Dashboard */}
          <div>
            <Link
              to="/"
              className={`sidebar-item ${activeItem === "/" ? "active" : ""}`}
              onClick={() => setActiveItem("/")}
            >
              <HomeOutlinedIcon className="sidebar-icon" />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* My Hub with dropdown */}
          <div>
            <button
              onClick={toggleHub}
              className={`sidebar-item sidebar-dropdown-toggle ${
                activeItem.includes("/groups") || activeItem.includes("/files")
                  ? "active"
                  : ""
              }`}
            >
              <div className="sidebar-item-content">
                <LocalLibraryOutlinedIcon className="sidebar-icon" />
                <span>My Hub</span>
              </div>
              {isHubOpen ? (
                <KeyboardArrowUpIcon sx={{ fontSize: "15px" }} />
              ) : (
                <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
              )}
            </button>

            {/* Dropdown content */}
            {isHubOpen && (
              <div className="sidebar-dropdown">
                <div>
                  <Link
                    to="/groups"
                    className={`sidebar-dropdown-item ${
                      activeItem === "/groups" ? "active" : ""
                    }`}
                    onClick={() => setActiveItem("/groups")}
                  >
                    <span>Groups</span>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/files"
                    className={`sidebar-dropdown-item ${
                      activeItem === "/files" ? "active" : ""
                    }`}
                    onClick={() => setActiveItem("/files")}
                  >
                    <span>Files</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Collaborators */}
          <div>
            <Link
              to="/collaborators"
              className={`sidebar-item ${
                activeItem === "/collaborators" ? "active" : ""
              }`}
              onClick={() => setActiveItem("/collaborators")}
            >
              <GroupsOutlinedIcon className="sidebar-icon" />
              <span>Collaborators</span>
            </Link>
          </div>

          {/* Starred */}
          <div>
            <Link
              to="/starred"
              className={`sidebar-item ${
                activeItem === "/starred" ? "active" : ""
              }`}
              onClick={() => setActiveItem("/starred")}
            >
              <StarBorderOutlinedIcon className="sidebar-icon" />
              <span>Starred</span>
            </Link>
          </div>
          <div className="sidebar-separator">
            {/* Notifications */}
            <div>
              <Link
                to="/notifications"
                className={`sidebar-item ${
                  activeItem === "/notifications" ? "active" : ""
                }`}
                onClick={() => setActiveItem("/notifications")}
              >
                <NotificationsNoneOutlinedIcon className="sidebar-icon" />
                <span>Notifications</span>
              </Link>
            </div>

            {/* Settings */}
            <div>
              <Link
                to="/settings"
                className={`sidebar-item ${
                  activeItem === "/settings" ? "active" : ""
                }`}
                onClick={() => setActiveItem("/settings")}
              >
                <SettingsOutlinedIcon className="sidebar-icon" />
                <span>Settings</span>
              </Link>
            </div>

            {/* Trash */}
            <div>
              <Link
                to="/trash"
                className={`sidebar-item ${
                  activeItem === "/trash" ? "active" : ""
                }`}
                onClick={() => setActiveItem("/trash")}
              >
                <DeleteOutlineOutlinedIcon className="sidebar-icon" />
                <span>Trash</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        <FirstPageOutlinedIcon className="backBtn" />
      </div>
    </div>
  );
}
