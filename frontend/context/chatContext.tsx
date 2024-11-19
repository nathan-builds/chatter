import { createContext, useContext, useState } from "react";
import React from "react";

export interface ChatContextType {
    activeChatId: string | null;
    setActiveChatId: (chatId: string) => void;
}

export const ChatContext = createContext<ChatContextType>({ activeChatId: null, setActiveChatId: () => { } });

export const useChat = () => {
    return useContext(ChatContext);
}


export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeChatId, setActiveChatId] = useState<string | null>(null);

    return <ChatContext.Provider value={{ activeChatId, setActiveChatId }}>{children}</ChatContext.Provider>;
}
