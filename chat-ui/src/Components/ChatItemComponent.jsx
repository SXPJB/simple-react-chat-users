import React from 'react';

const ChatItemComponent = ({message}) => {

    return (
        <div className={message.from==="Me" ? "chat-message-right pb-4" : "chat-message-left pb-4"}>
            <div>
                <img
                    src="https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png"
                    className="rounded-circle mr-1" alt={message.from} width="40" height="40"/>
                <div className="text-muted small text-nowrap mt-2">{message.time}</div>
            </div>
            <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                <div className="fw-bold mb-1">{message.from}</div>
                {message.body}
            </div>
        </div>
    );
};

export default ChatItemComponent;