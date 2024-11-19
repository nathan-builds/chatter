export interface ChatMessageProps {
    message: string;
    senderName: string;
    isSender: boolean;
}



export const ChatMessage = (props: ChatMessageProps) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: props.isSender ? 'flex-end' : 'flex-start',
            marginBottom: '10px'
        }}>
            <div style={{
                backgroundColor: props.isSender ? '#007bff' : '#e9ecef',
                color: props.isSender ? 'white' : 'black',
                padding: '8px 12px',
                borderRadius: '12px',
                maxWidth: '70%',
            }}>
                {props.message}
                <div style={{
                    fontSize: '0.75rem',
                    color: props.isSender ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
                    marginTop: '4px'
                }}>
                    {props.senderName}
                </div>
            </div>
        </div>
    )
}