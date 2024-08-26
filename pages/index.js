import Header from "@/components/Header";
import { useSocket } from "@/context/socket";
import { usePeer } from "@/hooks/usePeer";
import { TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {v4 as uuidv4} from "uuid"



export default function Home() {

  const router = useRouter();
  const [roomId,setRoomId] = useState('')

  const createAndJoin =() => {
    const roomId = uuidv4()
    router.push('/'+roomId)
  }

  const JoinRoom=()=> {
    if (roomId == null) window.alert("Please enter room id")
    else router.push('/'+roomId);

  }

  
  return (
    <div className="h-screen flex flex-col items-center gap-4 justify-center border-2 "  style={{background:'radial-gradient(#455289,#2F3D7B,#212E66,#041149,#030D3D)'}}>

      {/* <h1 className="text-lg"> Meet </h1> */}

      <Header isInHomePage={true}  />

      <div className="flex gap-10 ">

      <TextField  id="standard-basic" label="Enter Room ID" variant="standard" sx={{color:'white',
        '& .MuiInputBase-input': {
          color: 'white', // Change this to your desired color
        },
        '& .MuiInputLabel-root': {
          color: '#070F31', // Change label color if needed
        },
      }}     value={roomId} onChange={(e)=> setRoomId(e.target.value) } />
        {/* <input type="text" /> */}
        <button className="bg-blue-400 p-2 rounded-lg" onClick={JoinRoom}> Join Room </button>
      </div>

      <Typography>OR</Typography>
      <div >
       
        <button  className="bg-orange-400 p-2 rounded-lg" onClick={createAndJoin}> create Room </button>
      </div>

    </div>
  );
}


  // const socket = useSocket()
  
  // usePeer()

  // useEffect(()=> {
  //   console.log("index run")
  //   socket?.on("connect", () => {
  //     console.log("in index",socket.id)
  //   });
  // },[socket])