import { createContext, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

const SocketContext = createContext(null)

export const useSocket = () => useContext(SocketContext)

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {

    const url = process.env.NEXT_PUBLIC_SOCKET_PATH
    console.log("SOCKET URL:", process.env.NEXT_PUBLIC_SOCKET_PATH)
    if (!url) return;
    const connection = io(url, {
      transports: ["websocket"]
    })

    connection.on("connect", () => {
      console.log("✅ socket connected", connection.id)
    })

    connection.on("connect_error", (err) => {
      console.error("❌ socket connect error:", err.message)
    })

    setSocket(connection)

    return () => {
      connection.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}