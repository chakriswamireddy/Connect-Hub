import { useEffect, useMemo, useState } from "react";
import usePeer from "./usePeer";

const usePlayer =() => {
    const [players,setPlayers] = useState({})
    // const {myId} = usePeer() ;

    const [mainPlayer,setMainPlayer] = useState(null)
    //  = useMemo(()=> {
    //     return  players[myId]
    // },[players,myId])

    useEffect(()=> {
        Object.keys(players).length > 0 && setMainPlayer(players[myId])
        console.log("players ", players)
    },[players])



    return {
        players,
        setPlayers,
        mainPlayer
    }
}

export default usePlayer;