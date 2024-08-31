import {Server} from "socket.io"
import Ably from 'ably';

const SocketHandler =(req,res) => {

    console.log("called API")

    if (res.socket.server.io) {
        console.log("Socket already running")
        res.end()
    } else {
        
        const io  = new Server(res.socket.server, {
            path:'/api/socket',
            addTrailingSlash: false,
            transports: ['websocket', 'polling'],
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true

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

            socket.on("disconnect", () => {
                console.log("Client disconnected", socket.id);
              });
        })
    }
    res.end();


}

export const config = {
    api: {
      bodyParser: false,
    },
  };

//   export async function GET(request) {
//     const client = new Ably.Rest(process.env.ABLY_API_KEY);
//     const tokenRequestData = await client.auth.createTokenRequest({
//       clientId: 'ably-nextjs-demo',
//     });
//     console.log(`Request: ${JSON.stringify(tokenRequestData)}`);
//     return Response.json(tokenRequestData);
//   }

export default SocketHandler;