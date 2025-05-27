import React from "react";
import "../style/community.css";
import NavbarCommunity from "../components/navbarCommuntiy";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Footer from "../components/footer";


function Community() {
  return (
    <div>
      <NavbarCommunity />
      <div className="community-container">
        <div className="community-header">
          <h1>
            Discover public community <span>study groups, materials</span> and a{" "}
            <span>forum to do more.</span>
          </h1>
          <div className="searchbar">
            <SearchOutlinedIcon sx={{ fontSize: "24px", color: "#C4C7C5" }} />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search for your files and groups"
            />
          </div>
        </div>
        <div className="community-content">
          <div className="communityContentHead">
            <h3>Recommended Groups</h3>
            <div className="recommended">
              <p>Find study groups and materials for your study goals</p>
              <Link>See More</Link>
            </div>
          </div>
          <div className="groupRow">
            <div className="groupFolder">
              <div className="groupFolderHeader">
                <p>CSC Final Exam Group</p>
                <MoreVertIcon />
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder">
              <div className="groupFolderHeader">
                <p>CSC Final Exam Group</p>
                <MoreVertIcon />
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder">
              <div className="groupFolderHeader">
                <p>CSC Final Exam Group</p>
                <MoreVertIcon />
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder">
              <div className="groupFolderHeader">
                <p>CSC Final Exam Group</p>
                <MoreVertIcon />
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
          </div>
        </div>
        <div className="community-content">
          <div className="communityContentHead">
            <h3>Public Files</h3>
            <div className="recommended">
              <p>Public files that could help your educational journey</p>
              <Link>See More</Link>
            </div>
          </div>
          <div className="fileTable paddingTop">
                <div className="fileHeader">
                  <p>Name</p>
                  <p>Location</p>
                  <p>Owner</p>
                  <p>Date</p>
                </div>
                <div className="fileLines">
                  <div className="fileName">
                    <InsertDriveFileIcon
                      style={{
                        color: "#425EEA",
                        fontSize: 22,
                      }}
                    />
                    <p>CSC 104</p>
                  </div>
                  <p className="location">CSC Final Exam Preparations</p>
                  <p className="owner">Me</p>
                  <p className="date">March 12,2025</p>
                </div>
                <div className="fileLines">
                  <div className="fileName">
                    <InsertDriveFileIcon
                      style={{
                        color: "#425EEA",
                        fontSize: 22,
                      }}
                    />
                    <p>CSC 104</p>
                  </div>
                  <p className="location">CSC Final Exam Preparations</p>
                  <p className="owner">Me</p>
                  <p className="date">March 12,2025</p>
                </div>
                <div className="fileLines">
                  <div className="fileName">
                    <InsertDriveFileIcon
                      style={{
                        color: "#425EEA",
                        fontSize: 22,
                      }}
                    />
                    <p>CSC 104</p>
                  </div>
                  <p className="location">CSC Final Exam Preparations</p>
                  <p className="owner">Me</p>
                  <p className="date">March 12,2025</p>
                </div>
                <div className="fileLines">
                  <div className="fileName">
                    <InsertDriveFileIcon
                      style={{
                        color: "#425EEA",
                        fontSize: 22,
                      }}
                    />
                    <p>CSC 104</p>
                  </div>
                  <p className="location">CSC Final Exam Preparations</p>
                  <p className="owner">Me</p>
                  <p className="date">March 12,2025</p>
                </div>
                <div className="fileLines">
                  <div className="fileName">
                    <InsertDriveFileIcon
                      style={{
                        color: "#425EEA",
                        fontSize: 22,
                      }}
                    />
                    <p>CSC 104</p>
                  </div>
                  <p className="location">CSC Final Exam Preparations</p>
                  <p className="owner">Me</p>
                  <p className="date">March 12,2025</p>
                </div>
                <div className="fileLines">
                  <div className="fileName">
                    <InsertDriveFileIcon
                      style={{
                        color: "#425EEA",
                        fontSize: 22,
                      }}
                    />
                    <p>CSC 104</p>
                  </div>
                  <p className="location">CSC Final Exam Preparations</p>
                  <p className="owner">Me</p>
                  <p className="date">March 12,2025</p>
                </div>
                <div className="fileLines">
                  <div className="fileName">
                    <InsertDriveFileIcon
                      style={{
                        color: "#425EEA",
                        fontSize: 22,
                      }}
                    />
                    <p>CSC 104</p>
                  </div>
                  <p className="location">CSC Final Exam Preparations</p>
                  <p className="owner">Me</p>
                  <p className="date">March 12,2025</p>
                </div>
              </div>
             <div className="communityContentHead3">
            <h3>Popular Courses</h3>
            <div className="popular">
              <p>Find study groups and materials for your study goals</p>
              <Link>See More</Link>
            </div>
          </div>
          <div className="groupRow1">
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Agricultural Science</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Business Administration</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Computer Science</p>
               
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Dentistry Science</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Economics</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Forestry Technology</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Geography and Planning</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
            <div className="groupFolder1">
              <div className="groupFolderHeader1">
                <p>Health Education</p>
              </div>
              <FolderIcon
                style={{
                  fontSize: 125,
                  margin: 0,
                  padding: 0,
                  color: "gray",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Community;
