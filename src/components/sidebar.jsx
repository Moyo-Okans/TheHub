import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import logo from "../assets/logo.png";

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
import LastPageOutlinedIcon from "@mui/icons-material/LastPageOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "../style/sidebar.css";

export default function Sidebar() {
  const [isHubOpen, setIsHubOpen] = useState(false);
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
    if (
      location.pathname.includes("/groups") ||
      location.pathname.includes("/files")
    ) {
      setIsHubOpen(true);
    }
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

  const toggleHub = () => {
    setIsHubOpen(!isHubOpen);
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
    // Close the dropdown when minimizing
    if (!minimized) {
      setIsHubOpen(false);
    }
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
                className={`sidebar-item ${activeItem === "/" ? "active" : ""}`}
                onClick={() => handleNavItemClick("/")}
                title="Dashboard"
              >
                <HomeOutlinedIcon className="sidebar-icon" />
                {(!minimized || (isMobile && mobileOpen)) && <span>Dashboard</span>}
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
                title="My Hub"
              >
                <div className="sidebar-item-content">
                  <LocalLibraryOutlinedIcon className="sidebar-icon" />
                  {(!minimized || (isMobile && mobileOpen)) && <span>My Hub</span>}
                </div>
                {(!minimized || (isMobile && mobileOpen)) && (
                  isHubOpen ? (
                    <KeyboardArrowUpIcon sx={{ fontSize: "15px" }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ fontSize: "15px" }} />
                  )
                )}
              </button>

              {/* Dropdown content */}
              {isHubOpen && (!minimized || (isMobile && mobileOpen)) && (
                <div className="sidebar-dropdown">
                  <div>
                    <Link
                      to="/groups"
                      className={`sidebar-dropdown-item ${
                        activeItem === "/groups" ? "active" : ""
                      }`}
                      onClick={() => handleNavItemClick("/groups")}
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
                      onClick={() => handleNavItemClick("/files")}
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
                onClick={() => handleNavItemClick("/collaborators")}
                title="Collaborators"
              >
                <GroupsOutlinedIcon className="sidebar-icon" />
                {(!minimized || (isMobile && mobileOpen)) && <span>Collaborators</span>}
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

              {/* Trash */}
              <div>
                <Link
                  to="/trash"
                  className={`sidebar-item ${
                    activeItem === "/trash" ? "active" : ""
                  }`}
                  onClick={() => handleNavItemClick("/trash")}
                  title="Trash"
                >
                  <DeleteOutlineOutlinedIcon className="sidebar-icon" />
                  {(!minimized || (isMobile && mobileOpen)) && <span>Trash</span>}
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