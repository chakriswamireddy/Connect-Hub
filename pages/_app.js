import PlayerContextProvider from "@/context/playersContext";
import PlayersContext from "@/context/playersContext";
import { SocketProvider } from "@/context/socket";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return(
  <SocketProvider>
    <PlayerContextProvider>
    <Component {...pageProps} />;
      
    </PlayerContextProvider>
    
  </SocketProvider>
  )
}
