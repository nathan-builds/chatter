import { TextField } from "@mui/material"
import { ChatMessage } from "./chatMessage"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";
import { useChat } from "../../context/chatContext";
import { useState } from "react";




export const ActiveChat = () => {

    const auth = useAuth();
    const queryClient = useQueryClient();
    const { activeChatId } = useChat();                 
    const [message, setMessage] = useState("");
    const { data, isLoading, error } = useQuery({
        queryKey: ['messages', activeChatId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3001/channel/messages/${activeChatId}`);
            const json = await res.json();
            console.log(json);
            return json;
        },
    });

    const sendMessageMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:3001/message/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    sender: auth.user?.id,
                    dstChannelId: activeChatId
                }),
            });
            return response.json();
        },
        onSuccess: (newMessage) => {
            queryClient.setQueryData(['messages', activeChatId], (oldData: any) => {
                return [...(oldData || []), newMessage];
            });
            setMessage("");
        },
    });

    const sendMessage = () => {
        if (!message.trim()) return;
        sendMessageMutation.mutate();
    }


    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, flexDirection: 'column', padding: '10px', overflowY: 'auto' }}>
                {data?.map((msg: any) => (
                    <ChatMessage message={msg.message} senderName={msg.senderName} isSender={msg.sender === auth.user?.id} />
                ))}

            </div>

            <TextField placeholder="Type a message"
                sx={{ padding: 1 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                }}
            />
        </div>
    )
}