import React from "react";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

const Sidebar = () => {
    return ( 
        <div className="sidebar">
            <div className="sideIcons selected">
                <HomeOutlinedIcon style={{ fontSize: 25, paddingLeft: 10}} className="selectedIcon"/>
                <p>Dashboard</p>
            </div>
            <div className="sideIcons">
                <LocalLibraryOutlinedIcon style={{ fontSize: 25, color: '#cac7c5', paddingLeft: 10}}/>
                <p>Collaborators</p>
            </div>
            <div className="sideIcons">
                <Groups2OutlinedIcon style={{ fontSize: 25, color: '#cac7c5', paddingLeft: 10}}/>
                <p>Group</p>
            </div>
            <div className="sideIcons">
                <StarBorderOutlinedIcon style={{ fontSize: 25, color: '#cac7c5', paddingLeft: 10}}/>
                <p>Starred</p>
            </div>
            <div className="lowerIcons">
                <div className="sideIcons">
                    <NotificationsOutlinedIcon style={{ fontSize: 25, color: '#cac7c5', paddingLeft: 10}}/>
                    <p>Notifications</p>
                </div>
                <div className="sideIcons">
                    <SettingsOutlinedIcon style={{ fontSize: 25, color: '#cac7c5', paddingLeft: 10}}/>
                    <p>Settings</p>
                </div>
                <div className="sideIcons">
                    <DeleteOutlineRoundedIcon style={{ fontSize: 25, color: '#cac7c5', paddingLeft: 10}}/>
                    <p>Trash</p>
                </div>
            </div>
        </div>
     );
}
 
export default Sidebar;
