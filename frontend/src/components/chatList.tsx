import { Channel, Chat } from "./chat"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import { FriendsDialog } from "./friendsDialog";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from "../../context/authContext";

export const ChatList = () => {
    const [open, setOpen] = useState(false);
    const auth = useAuth();
    const queryClient = useQueryClient();

    const addNewChat = useMutation({
        mutationFn: async (friendId: string) => {
            if (!auth.user) {
                throw new Error('User not authenticated');
            }
            const bodyData = {
                createdBy: auth.user.id,
                users: [friendId],
                isPrivate: true
            }

            console.log('bodyData', bodyData);
            const res = await fetch(`http://localhost:3001/channel/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            if (!res.ok) {
                throw new Error('Failed to create channel');
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['channels'] });
        }
    });



    const { data: channels, isLoading, isError } = useQuery({
        queryKey: ['channels'],
        queryFn: async () => {

            if (!auth.user) {
                console.log("no user");
                throw new Error('User not authenticated');
            }
            console.log("fetching channels");
            const res = await fetch(`http://localhost:3001/user/channels/${auth.user.id}`);
            if (!res.ok) {
                console.log("failed to fetch channels");
                throw new Error('Failed to fetch channels');
            }
            const data = await res.json();
            return data.channels;
        }
    });

    const launchFriendsDialog = () => {
        setOpen(true);
    }

    const handleFriendSelected = (friendId: string) => {
        addNewChat.mutate(friendId);
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
                {isLoading && <div>Loading...</div>}
                {isError && <div>Error loading channels</div>}
                {channels && channels.map((channel: Channel) => (
                    <Chat key={channel.id} channel={channel} />
                ))}
            </div>
            <FriendsDialog open={open} onClose={() => setOpen(false)} onFriendSelected={(friendId) => {
                handleFriendSelected(friendId);
            }} />
        </div>

    )
}
