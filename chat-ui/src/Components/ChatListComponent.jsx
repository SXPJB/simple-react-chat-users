import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {useChatContext} from "../context/ChatContext.jsx";
import ChatItemComponent from "./ChatItemComponent.jsx";

const ChatListComponent = () => {
    const {typingUser,typing,user,sendMessage, messages, loadMessages} = useChatContext()
    const [message, setMessage] = useState("");

    const submitMessage = e => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
        typing({typing: false, user });
    }

    useEffect(() => {
        loadMessages();
    }, [messages,typingUser])

    return (
        <div className='mt-2'>
            <h1>Chat room</h1>
            <Form className='my-2' onSubmit={submitMessage}>
                <Form.Control
                    type='text'
                    placeholder='Type a message...'
                    onChange={e => {
                        typing({typing: true, user});
                        setMessage(e.target.value)
                    }}
                    value={message}
                />
            </Form>
            {typingUser.typing && <p>{typingUser.user.nickName} {'typing...'}</p>}
            <ul>
                {messages.map((message, i) => (
                   <ChatItemComponent message={message} key={i}/>
                ))}
            </ul>
        </div>
    );
};

export default ChatListComponent;