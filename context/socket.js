import { createContext, useContext, useEffect, useState } from "react"
import {io } from "socket.io-client"

const SocketContext = createContext(null)

//instead of defining in where we use in app, we are defining here and we can call it (just to decrease redundancy)
export const useSocket =() => {
    const gotSocket = useContext(SocketContext)
    return gotSocket;
}

export function SocketProvider(props) {

    const {children} = props;

    const [socket,setSocket]  = useState(null)

    useEffect(() => {
      const connectSocket = async () => {
        try {
          const connection = io({
            path: process.env.NEXT_PUBLIC_SOCKET_PATH || '/api/socket',
            addTrailingSlash: false,
            transports: ['websocket', 'polling'],
          });
          setSocket(connection);
          console.log(connection);
   
          connection.on("connect_error", async (err) => {
            console.log("Error Establishing", err);
            await fetch('/api/socket');
          });
          
          // Cleanup on component unmount
          return () => {
            connection.disconnect();
          };
   
        } catch (error) {
          console.error("Failed to establish socket connection:", error);
        }
      };
   
      connectSocket();
   
    }, []);
   

    socket?.on("connect_error", async (err) => {
        console.log("Errror Establishing", err)
        await fetch('/api/socket')
    })
    
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}
