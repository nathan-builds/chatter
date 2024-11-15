import { Chat } from "./chat"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import { FriendsDialog } from "./friendsDialog";

export const ChatList = () => {
    const [open, setOpen] = useState(false);

    const launchFriendsDialog = () => {
        console.log("launching friends dialog");
        setOpen(true);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            maxWidth: '300px',
            backgroundColor: '#f5f5f5'
        }}>

            <IconButton onClick={launchFriendsDialog}>
                <AddIcon sx={{ fontSize: '2rem' }} />
            </IconButton>

            <div style={{

                width: '300px',
                minHeight: '100%',
                height: '100%',
                borderRight: '1px solid #e0e0e0',
                backgroundColor: '#f5f5f5'
            }}>
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />

            </div>
            <FriendsDialog open={open} onClose={() => setOpen(false)} />
        </div>

    )
}
