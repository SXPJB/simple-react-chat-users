import {createContext, useContext, useState} from "react";
import {io} from "socket.io-client";
const URL = "/";
export const socket = io(URL);

export const ChatContext = createContext()

export const useChatContext = () => {
    const chatContext = useContext(ChatContext)
    if (!chatContext) {
        throw new Error("chatContext must be used within a ChatContextProvider")
    }
    return chatContext
}

const toHHMM = (date) => {
    let hh = date.getHours();
    let mm = date.getMinutes();
    const ampm = hh >= 12 ? 'pm' : 'am';
    hh = hh % 12;
    hh = hh ? hh : 12;
    mm = mm < 10 ? '0' + mm : mm;
    return hh + ':' + mm + ' ' + ampm;
}

export const ChatProvider = ({children})=>{

    const [user, setUser] = useState({
        id: null,
        nickName: '',
    })
    const [messages, setMessages] = useState([]);
    const [modal, setModal] = useState(false)
    const [isLogin, setIsLogin] = useState(false);
    const [typingUser, setTypingUser] = useState({});
    const hideModal = () => setModal(false)
    const showModal = () => setModal(true)
    const login = (user) => {
        socket.emit('login', user);
        socket.on('login', (user)=> {
            console.log(user.nickName + ' has joined the chat');
            setUser(user)
            setModal(false)
            setIsLogin(true)
        })
        socket.on('userExists', (response)=>{
            alert(response);
        })
    }
    const logout = () => {
        socket.emit('logout', user.id);
        socket.on('logout', (user)=> {
            console.log(user.nickName + ' has left the chat');
            setUser({
                id: null,
                nickName: '',
            })
            setIsLogin(false)
        })
    }
    const sendMessage = message => {
        const newMessage = {
            body: message,
            from: 'Me',
            time: toHHMM(new Date())
        }
        socket.emit('message', newMessage);
        setMessages([newMessage,...messages]);
    }
    const loadMessages = () => {
        socket.on('message', message => {
            setMessages([message,...messages]);
        })
    }
    const typing = (typingUser) => {
        console.log(typingUser)
        socket.emit('typing', typingUser);
        socket.on('typing', (typingUser) => {
            setTypingUser(typingUser)
        })
    }
    return <ChatContext.Provider value={
        {
            user,
            isLogin,
            modal,
            messages,
            typingUser,
            hideModal,
            showModal,
            login,
            logout,
            sendMessage,
            loadMessages,
            typing
        }
    }>
        {children}
    </ChatContext.Provider>
}