import express from 'express'
import morgan from 'morgan'
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
import {PORT} from './config.js'
import path from 'path'
import {fileURLToPath} from 'url'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})
const users = []
io.on('connection', socket => {
    socket.on('login', (userdata) => {
        if (!users.find(user => user.nickName === userdata.nickName)) {
            const user = {id: socket.id, nickName: userdata.nickName}
            users.push(user)
            socket.emit('login', user)
        } else {
            socket.emit('userExists', userdata.nickName + ' username is taken! Try some other username.');
        }
    })
    socket.on('logout', (id) => {
        const userRemove = users.find(user => user.id === id)
        if (userRemove) {
            users.splice(users.findIndex(user => user.id === userRemove.id), 1)
            socket.emit('logout', userRemove)
        }
    })
    socket.on('message', (message) => {
        socket.broadcast.emit('message', {
            ...message,
            from: users.find(user => user.id === socket.id).nickName
        })
    })
    socket.on('typing',(typingUser)=>{
        socket.broadcast.emit('typing', typingUser)
    })
})

app.use(cors());
app.use(morgan('common'));

app.use(express.static(path.join(__dirname,'../chat-ui/dist')));

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
