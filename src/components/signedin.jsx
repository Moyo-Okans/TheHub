import React from "react";
import emptyState from "../assets/empty_state.png"
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PublicIcon from "@mui/icons-material/Public";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Divider } from "@mui/material";

function SignedIn() {
    return (
        <>
            <div className="welcomeHeader">
                <div className="welcomeText">
                    <h3>Welcome, Moyosore Okanlawon</h3>
                    <p>Open your files or folders here!</p>
                </div>
                <button>
                    <AddRoundedIcon />
                    Create
                    <KeyboardArrowDownIcon
                        sx={{
                            fontSize: "16px",
                        }}
                    />
                </button>
            </div>
            
        </>
    );
}

export default SignedIn;
