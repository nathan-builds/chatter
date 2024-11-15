import { Chat } from "./chat"

export const ChatList = () => {
    return (
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
    )
}
