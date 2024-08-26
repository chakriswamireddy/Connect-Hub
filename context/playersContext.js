import usePeer from '@/hooks/usePeer';
import { createContext, useContext, useEffect, useState } from 'react'

//create context
const PlayerContext = createContext(null)

//return function

export function usePlayerContext() {

    const playerCont = useContext(PlayerContext)
    return playerCont;
}

export default function PlayerContextProvider({children}) {

    const [players,setPlayers] = useState({})

    

    const [mainPlayer,setMainPlayer] = useState(null)

    // useEffect(()=> {
    //     Object.keys(players).length > 0 && players[m] && setMainPlayer(players[myId])
    //     console.log("players ", players)
    // },[players])
    



    return(
        <PlayerContext.Provider value={{players, setPlayers,mainPlayer}}>
            {children}
        </PlayerContext.Provider>
    )
}

