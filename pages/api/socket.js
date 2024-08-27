import {Server} from "socket.io"

const SocketHandler =(req,res) => {

    console.log("called API")

    if (res.socket.server.io) {
        console.log("Socket already running")
    } else {
        
        const io  = new Server(res.socket.server, {
            path:'/api/socket',
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        })
        res.socket.server.io = io;
        
        io.on("connection", (socket) => {
            console.log("Server is Connected", socket.id)
            
            //joined new one lettin every one know
            socket.on('join-room', (roomId,userId)=> {
                console.log(`${userId} a new user joined in room ${roomId}`)
                 
                socket.join(roomId)
                socket.to(roomId).emit('user-connected',userId) //sending this to handleUserConnectedfunc
                //sending to all except its own
                //no need of broadcast

                
            })

            socket.on('user-toggle-audio', ( userId,roomId) => {
                console.log(userId,"want to toggle audio", roomId)
                socket.join(roomId)
                socket.to(roomId).emit('user-toggle-audio',userId)
            })

            socket.on('user-toggle-video', ( userId,roomId) => {
                console.log(userId,"want to toggle video", roomId)
                socket.join(roomId)
                socket.to(roomId).emit('user-toggle-video',userId)
            })

            socket.on('user-leave', (userId,roomId) => {
                console.log(userId,"want to leave this room", roomId)
                // socket.join(roomId)
                socket.to(roomId).emit('user-leave',userId)
                // socket.leave(roomId)
            })
        })
    }
    res.end();


}

export default SocketHandler;