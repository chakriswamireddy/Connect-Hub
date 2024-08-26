import React, { useEffect, useMemo, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { CiMicrophoneOff, CiMicrophoneOn } from "react-icons/ci";
import { PiVideoCameraLight, PiVideoCameraSlashLight } from "react-icons/pi";
import { ImExit } from "react-icons/im";
import { useRouter } from "next/router";
import { usePlayerContext } from "@/context/playersContext";
import 'animate.css';

const PlayerControls = ({ myId, roomId, socket, peer ,mainPlayer,setMainPlayer}) => {
  const { players } = usePlayerContext();
  const router = useRouter();

  

  function toggleAudio() {
    socket.emit("user-toggle-audio", myId, roomId);
    console.log("You clicked toggle audio button");
    setMainPlayer((prev)=> ({
      ...prev,
      muted: ! prev.muted,
    }))
  }

  function toggleVideo() {
    socket.emit("user-toggle-video", myId, roomId);
    console.log("You clicked toggle video button");

    setMainPlayer((prev)=> ({
      ...prev,
      playing: ! prev.playing,
    }))

  }

  function leaveMeet() {
    socket.emit("user-leave", myId, roomId);
    console.log("User clicked leave button", roomId);
    peer?.disconnect();
    router.push("/");
  }

  return (
    <Grid
      container
      justifyContent="center"
      // paddingLeft="25%"
      gap="50px"
      alignItems="center"
      height="70px"
      sx={{ background: "linear-gradient(to bottom, #212E66,#041149,#030D3D,#070F31)", position: "absolute", bottom: 0, border: 1, }}
    >
      {/* <h1> {mainPlayer && mainPlayer.muted ? "mic off"  : 'mic on'} </h1>  */}

              <Grid item  >
                <IconButton className={ `animate__animated ${ mainPlayer.muted ? 'animate__bounceIn' : 'animate__bounceDown'}`}
                  onClick={toggleAudio}
                  sx={{ border: "1px solid #60a5fa" }}
                >
                  { mainPlayer && mainPlayer.muted ? 
                   <CiMicrophoneOff color="#60a5fa" fontSize="30px" className= 'animate__animated animate__bounceIn' /> :
                  <CiMicrophoneOn color="#60a5fa" fontSize="30px" className= 'animate__animated animate__bounceIn'  />
                  }
                </IconButton>
              </Grid>

              <Grid item >
                <IconButton
                  onClick={toggleVideo}
                  sx={{ border: "1px solid #60a5fa" }}
                  className={ `animate__animated ${ mainPlayer.playing ? 'animate__bounceIn' : 'animate__bounceDown'}`}
                >
                  {mainPlayer && mainPlayer.playing ? (
                    <PiVideoCameraSlashLight color="#60a5fa" fontSize="30px" className= 'animate__animated animate__bounceIn' />
                  ) : (
                    <PiVideoCameraLight color="#60a5fa" fontSize="30px" className= 'animate__animated animate__bounceIn' />
                  )}
                </IconButton>
              </Grid>

              <Grid  
                item
                // justifySelf="end"
                // alignSelf="end"
                xs={3}
                textAlign="right"
              >
                <IconButton
                  onClick={leaveMeet}
                  sx={{ border: "1px solid #fb923c" }}
                >
                  <ImExit fontSize="30px" color="#fb923c" />
                </IconButton>
              </Grid>

    </Grid>
  );
};

export default PlayerControls;
