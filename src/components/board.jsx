import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from '@mui/material';
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
                    <Box className="groupContainer">
                        <FolderIcon style={{
                            fontSize: 60,
                            color: "#282a2c",
                            marginLeft: 130
                        }}/>
                        <h3>
                            Create a group
                        </h3>
                        <p>Create your first Group to start collaborations 
                            with your study group members
                        </p>
                        <button>
                        <AddRoundedIcon style={{
                            paddingRight: 5
                        }}/>
                        Create
                        </button>
                    </Box>

                    <Box className="groupContainer">
                        <FolderIcon style={{
                            fontSize: 60,
                            color: "#282a2c",
                            marginLeft: 130
                        }}/>
                        <h3>
                            Create a group
                        </h3>
                        <p>Create your first Group to start collaborations 
                            with your study group members
                        </p>
                        <button>
                        <AddRoundedIcon style={{
                            paddingRight: 5
                        }}/>
                        Create
                        </button>
                    </Box>

                    <Box className="groupContainer">
                        <FolderIcon style={{
                            fontSize: 60,
                            color: "#282a2c",
                            marginLeft: 130
                        }}/>
                        <h3>
                            Create a group
                        </h3>
                        <p>Create your first Group to start collaborations 
                            with your study group members
                        </p>
                        <button>
                        <AddRoundedIcon style={{
                            paddingRight: 5
                        }}/>
                        Create
                        </button>
                    </Box>
                </div>
            </div>

            <div className="activityBoard"></div>
        </div>
     );
}
 
export default Board;