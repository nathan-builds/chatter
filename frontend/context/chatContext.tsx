import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import React from "react";
import { useAuth } from "./authContext";
import { Channel } from "../src/components/chat";
import { useQueryClient } from "@tanstack/react-query";
export interface ChatContextType {
    activeChatId: string | null;
    setActiveChatId: (chatId: string) => void;
    socket: WebSocket | null;
    isConnected: boolean;
}

export const ChatContext = createContext<ChatContextType>({
    activeChatId: null,
    setActiveChatId: () => { },
    socket: null,
    isConnected: false
});

export const useChat = () => {
    return useContext(ChatContext);
}

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const { data: channels, isLoading, isError } = useQuery({
        queryKey: ['channels'],
        queryFn: async () => {

            if (!user) {
                console.log("no user");
                throw new Error('User not authenticated');
            }
            console.log("fetching channels");
            const res = await fetch(`http://localhost:3001/user/channels/${user.id}`);
            if (!res.ok) {
                console.log("failed to fetch channels");
                throw new Error('Failed to fetch channels');
            }
            const data = await res.json();
            return data.channels;
        }
    });

    useEffect(() => {

        if (isLoading || isError || !channels) {
            return;
        }


        const ws = new WebSocket(`ws://localhost:6969`);

        ws.onopen = () => {
            console.log('WebSocket Connected');
            setIsConnected(true);
            // Wait for the connection to be established before sending the channels
            setTimeout(() => {
                ws.send(JSON.stringify({
                    channels: channels.map((channel: Channel) => channel.id).join(',')
                }));
            }, 2000)

        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data) as { message: string, dstChannelId: string, senderId: string };
            // Handle incoming messages here
            queryClient.setQueryData(['messages', data.dstChannelId], (oldData: any) => {
                console.log('dataId', data.senderId);
                console.log('authId', user?.id);
                return [...(oldData || []), { message: data.message, dstChannelId: data.dstChannelId, sender: data.senderId }];
            });
            console.log('Received:', data);
        };

        ws.onclose = () => {
            console.log('WebSocket Disconnected');
            setIsConnected(false);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [isLoading]);

    return (
        <ChatContext.Provider value={{
            activeChatId,
            setActiveChatId,
            socket,
            isConnected
        }}>
            {children}
        </ChatContext.Provider>
    );
}
