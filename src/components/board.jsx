import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FolderIcon from '@mui/icons-material/Folder';

import React from "react";
const Board = () => {
    return ( 
        <div className="board">
            <div className="displayBoard">
                <div className="welcomeHeader">
                    <div className="welcomeText">
                        <h3>Welcome, Moyosore Okanlawon</h3>
                        <p>Open your files or folders here!</p>
                    </div>
                    <button>
                        <AddRoundedIcon style={{
                            paddingRight: 5
                        }}/>
                        Create
                    </button>
                </div>
                <div className="actionBox">
                    <div className="groupContainer">
                        
                    </div>
                </div>
            </div>

            <div className="activityBoard"></div>
        </div>
     );
}
 
export default Board;