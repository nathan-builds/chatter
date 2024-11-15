import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
const chatName = 'Chat Name'
const message = 'Message'

export const Chat = () => {
    return (
        <ListItemButton alignItems="flex-start">
            <ListItemAvatar>
                <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={chatName}
                secondary={message}
                sx={{
                    wordBreak: 'break-word'
                }}
            />
        </ListItemButton>
    )
}