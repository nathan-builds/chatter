import { Container } from "@mui/material"
import { ChatList } from "../components/chatList"
import { ActiveChat } from "../components/activeChat"
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { useChat } from "../../context/chatContext";

export const ChatPage = () => {

    const { isAuthenticated } = useAuth();
    const { activeChatId, setActiveChatId } = useChat();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%',
                height: '100%',
                overflow: 'hidden',
                p: 0,
                width: '100%',
                maxWidth: '100% !important',
            }}
        >
            <ChatList  />
            <ActiveChat />
        </Container>
    )
} 