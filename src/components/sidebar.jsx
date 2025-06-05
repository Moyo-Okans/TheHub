import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import logo from "../assets/logo.png";

// Material Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FirstPageOutlinedIcon from "@mui/icons-material/FirstPageOutlined";
import LastPageOutlinedIcon from "@mui/icons-material/LastPageOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "../style/sidebar.css";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("/dashboard");
  // Get minimized state from localStorage or default to false
  const [minimized, setMinimized] = useState(() => {
    const savedState = localStorage.getItem("sidebarMinimized");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Set active item based on the current route
  useEffect(() => {
    setActiveItem(location.pathname);

    // Open the "My Hub" dropdown if a child route is active
  }, [location]);

  // Save minimized state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarMinimized", JSON.stringify(minimized));
  }, [minimized]);


  // Detect mobile screen size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setMinimized(true); // Auto-minimize on mobile
      }
    };
    
    // Check initially
    checkIfMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleMinimize = () => {
    setMinimized(!minimized);
    // Close the dropdown when minimizing
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close mobile menu when a nav item is clicked
  const handleNavItemClick = (path) => {
    setActiveItem(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      {isMobile && (
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      )}

      <div className={`sidebar ${minimized ? "minimized" : ""} ${isMobile ? "mobile" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <img src={logo} alt="" />
            {(!minimized || (isMobile && mobileOpen)) && <h3>The Hub</h3>}
          </div>
          <div className="sidebar-nav">
            {/* Dashboard */}
            <div>
              <Link
                to="/dashboard"
                className={`sidebar-item ${activeItem === "/dashboard" ? "active" : ""}`}
                onClick={() => handleNavItemClick("/")}
                title="Dashboard"
              >
                <HomeOutlinedIcon className="sidebar-icon" />
                {(!minimized || (isMobile && mobileOpen)) && <span>Dashboard</span>}
              </Link>
            </div>

            {/* folders */}
            <div>
              <Link
                to="/folders"
                className={`sidebar-item ${
                  activeItem === "/folders" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("/folders")}
                title="Folders"
              >
                <FolderOutlinedIcon className="sidebar-icon" />
                {(!minimized || (isMobile && mobileOpen)) && <span>Folders</span>}
              </Link>
            </div>
            {/* Files */}
            <div>
              <Link
                to="/files"
                className={`sidebar-item ${
                  activeItem === "/files" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("/files")}
                title="Files"
              >
                <InsertDriveFileOutlinedIcon className="sidebar-icon" />
                {(!minimized || (isMobile && mobileOpen)) && <span>Files</span>}
              </Link>
            </div>

            {/* Starred */}
            <div>
              <Link
                to="/starred"
                className={`sidebar-item ${
                  activeItem === "/starred" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("/starred")}
                title="Starred"
              >
                <StarBorderOutlinedIcon className="sidebar-icon" />
                {(!minimized || (isMobile && mobileOpen)) && <span>Starred</span>}
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
                  onClick={() => handleNavItemClick("/notifications")}
                  title="Notifications"
                >
                  <NotificationsNoneOutlinedIcon className="sidebar-icon" />
                  {(!minimized || (isMobile && mobileOpen)) && <span>Notifications</span>}
                </Link>
              </div>

              {/* Settings */}
              <div>
                <Link
                  to="/settings"
                  className={`sidebar-item ${
                    activeItem === "/settings" ? "active" : ""
                  }`}
                  onClick={() => handleNavItemClick("/settings")}
                  title="Settings"
                >
                  <SettingsOutlinedIcon className="sidebar-icon" />
                  {(!minimized || (isMobile && mobileOpen)) && <span>Settings</span>}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className="sidebar-footer" onClick={toggleMinimize}>
            {minimized ? (
              <LastPageOutlinedIcon className="backBtn" title="Expand sidebar" />
            ) : (
              <FirstPageOutlinedIcon className="backBtn" title="Collapse sidebar" />
            )}
          </div>
        )}
      </div>
    </>
  );
}