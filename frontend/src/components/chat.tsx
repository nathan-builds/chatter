import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import { useChat } from "../../context/chatContext";

export interface Channel {
    id: string;
    name: string;
}

export const Chat = ({ channel }: { channel: Channel }) => {
    const { setActiveChatId } = useChat();
    return (
        <ListItemButton alignItems="flex-start" onClick={() => setActiveChatId(channel.id)}>
            <ListItemAvatar>
                <Avatar></Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={channel.name}
                secondary={'Test Message'}
                sx={{
                    wordBreak: 'break-word'
                }}
            />
        </ListItemButton>
    )
}