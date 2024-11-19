import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/authContext';
import { Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

// Add type for friend
interface Friend {
    id: string;
    username: string;
    name: string;
    // add other friend properties you need
}

interface FriendsDialogProps {
    open: boolean;
    onClose: () => void;
    onFriendSelected: (friendId: string) => void;
}

export const FriendsDialog = ({ open, onClose, onFriendSelected }: FriendsDialogProps) => {
    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to="/login" />;
    }

    const { data: friends, isLoading, isError } = useQuery<Friend[]>({
        queryKey: ['friends', auth.user.id],
        queryFn: async () => {
            if (!auth.user) {
                throw new Error('User not authenticated');
            }
            const res = await fetch(`http://localhost:3001/user/friends/${auth.user.id}`);
            if (!res.ok) {
                throw new Error('Failed to fetch friends');
            }
            const data = await res.json();
            return data.users;
        }
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: '50%', maxWidth: '800px' }
            }}
        >
            <DialogTitle>Start a conversation</DialogTitle>
            <DialogContent>
                {isLoading && <CircularProgress />}
                {isError && <div>Error loading friends</div>}
                {friends && (
                    <List>
                        {friends.map((friend) => (
                            <ListItem key={friend.id} disablePadding>
                                <Avatar />
                                <ListItemButton onClick={() => {
                                    // Handle friend selection here
                                    console.log('Selected friend:', friend);
                                    onFriendSelected(friend.id);
                                    // onFriendSelected(friend.id);
                                    onClose();
                                }}>
                                    <ListItemText
                                        primary={friend.name}
                                        secondary={friend.username} // Assuming friend has a name property
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>

        </Dialog>
    )
}