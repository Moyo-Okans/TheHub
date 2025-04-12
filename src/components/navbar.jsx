import React from "react"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PublicIcon from '@mui/icons-material/Public';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import profileImg from '../assets/profileImage.jpg'
import logo from '../assets/Frame 13.png';

const Navbar = () => {
    return ( 
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="" />
                <h3>The Hub</h3>
            </div>
            <div className="searchbar">
                <SearchOutlinedIcon style={{ fontSize: 20, color: '#cac7c5', paddingLeft: 10}}/>
                <input type="search" name="" id="" placeholder='Search for your files and groups'/>
            </div>
            <div className="profile">
                <PublicIcon style={{ fontSize: 30, color: '#cac7c5' }}/>
                <HelpOutlineOutlinedIcon style={{ fontSize: 30, color: '#cac7c5'}}/>
                <img src={profileImg} alt="" />
            </div>
        </div>
     );
}
 
export default Navbar;