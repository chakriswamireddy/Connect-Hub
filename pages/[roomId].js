import Player from "@/components/Player";
import PlayerControls from "@/components/playerControls";
import { useSocket } from "@/context/socket"
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import useStreamMedia from "@/hooks/useStreamMedia";
import { useContext, useEffect, useState } from "react";
import { Box, Grid, Snackbar, Typography } from "@mui/material";
import PlayersContext, { usePlayerContext } from "@/context/playersContext";
import playersContext from "@/context/playersContext";
import { useRouter } from "next/router";
import { IoMicOffCircleOutline } from "react-icons/io5";
import { TbUserFilled } from "react-icons/tb";
import Header from "@/components/Header";
import { Hourglass, ThreeCircles } from "react-loader-spinner";
import CopyBtn from "@/components/CopyBtn";


const Room = () => {
    const socket = useSocket()
    const { peer, myId } = usePeer();


    // useEffect(()=> {
    //     setTimeout(()=> {
    //         setShowNote(false)
    //     },[500])
    // },[])


    const { stream, toggleStream, endStreamClick } = useStreamMedia();

    // const {players,setPlayers} = usePlayer()
    const { players, setPlayers } = usePlayerContext();


    const [callUsers, setCallUsers] = useState();

    const router = useRouter();
    const { roomId } = router.query

    useEffect(() => {

        if (!socket || !stream || !peer) return;
        // console.log(peer)
        const handleUserConnected = (newUser) => {
            console.log("new user connected in our room with", newUser)

            // handshake - sending my stream to new user

            const call = peer.call(newUser, stream)
            // console.log("calling new user")
            call.on('stream', (incomingStream) => {
                console.log("Incoming stream from", newUser)

                // storing stream from new user

                setPlayers((prev) => ({
                    ...prev,
                    [newUser]: {
                        url: incomingStream,
                        muted: false,
                        playing: true,
                    }
                }))

                setCallUsers((prev) => ({
                    ...prev,
                    [newUser]: call
                }))
            })

            // call.on('left-meet', (msg) => {
            //     console.log('')
            // } )
            call.on('error', (err) => {
                console.log('error', err)
            })
        }

        socket.on('user-connected', handleUserConnected)

        const handleUserLeft = (userId) => {
            console.log('throwing out the user', userId)

            setPlayers((prev) => {
                const { [userId]: _, ...restPlayers } = prev;
                return restPlayers;
            });

            callUsers[userId]?.close();

            setCallUsers((prev) => {
                const { [userId]: _, ...restCalls } = prev;
                return restCalls;
            });
        }

        const handleToggleAudio = (userId) => {
            console.log("got from socket, user toggled Audio", userId)
            setPlayers((prev) => {

                const updatedPlayers = { ...prev };
                updatedPlayers[userId] = {
                    ...updatedPlayers[userId],
                    muted: !updatedPlayers[userId].muted,
                };
                return updatedPlayers;
            });

            console.log(players[userId])
        }

        const handleToggleVideo = (userId) => {
            console.log("got from socket, user toggled Video", userId)
            setPlayers((prev) => {
                const updatedPlayers = { ...prev };
                updatedPlayers[userId] = {
                    ...updatedPlayers[userId],
                    playing: !updatedPlayers[userId].playing,
                };
                return updatedPlayers;
            });
        }


        socket.on('user-leave', handleUserLeft)

        socket.on('user-toggle-audio', handleToggleAudio)
        socket.on('user-toggle-video', handleToggleVideo)


        return () => {
            socket.off('user-connected', handleUserConnected)
            socket.off('user-leave', handleUserLeft)
            socket.off('user-toggle-audio', handleToggleAudio)
            socket.off('user-toggle-video', handleToggleVideo)


        }
    }, [socket, stream, peer, setPlayers, callUsers])

    //handshake - new user accepting stream and answerin

    useEffect(() => {
        if (!peer || !stream) return;

        peer.on('call', (call) => {
            const { peer: callerId } = call;
            // console.log(`Received call from ${callerId}`);
            call.answer(stream)

            call.on('stream', (incomingStream) => {
                console.log("Incoming stream from", callerId)

                setPlayers((prev) => ({
                    ...prev,
                    [callerId]: {
                        url: stream,
                        muted: false,
                        playing: true,
                    }
                }))

                setCallUsers((prev) => ({
                    ...prev,
                    [callerId]: call
                }))
            })

            // call.on('leave-room',(callerId)=> {
            //     setPlayers((prev) => {
            //         const {callerId:_, restPlayers} = prev;
            //         return restPlayers;
            //     })
            // })
        })
    }, [peer, stream, setPlayers, callUsers])



    //collecting all streams and displaying them

    useEffect(() => {
        if (!stream || !myId) return;

        console.log("adding my stream to list")
        setPlayers((prev) => ({
            ...prev,
            [myId]: {
                url: stream,
                muted: false,
                playing: true,
            }
        }))

        // setPlayers((prev) => {
        //     const {otherUser:_, restPlayers} = prev;
        //     return restPlayers;
        // })


    }, [stream, myId, setPlayers])



    const [mainPlayer, setMainPlayer] = useState({});


    return (
        // <div className="flex flex-col h-screen border-2 border-green-400 ">
        // <PlayersContext
        (Object.keys(players).length > 0 ?

            <Grid container direction='column' sx={{
                background: 'radial-gradient(#455289,#2F3D7B,#212E66,#041149,#030D3D,#070F31)'
                , height: '100vh'
            }}>
                <Header />
                <Grid container justifyContent='center'
                    borderRadius='10px' gap={1}
                    marginTop='40px' direction='row' item alignSelf='center' justifySelf='center' >


                    {Object.keys(players).filter((playerId) => playerId === myId).map((playerId) => {
                        const { url, muted, playing } = players[playerId]

                        return (
                            // <div className="flex-1 sm:w-40 md:w-92 border-2 xs:h-1/4 p-0  xs:border-pink-400  md:border-pink-800 " >
                            <Grid key={playerId} height='55vh' item  >
                                {playing ?
                                    <Player muted={muted} playing={playing} url={stream} borderRadius={'10px'} />
                                    :
                                    <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 24 24"
                                        fill="#fff"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="12" cy="6" r="4" fill="rgb(251 146 60)" />
                                        <path
                                            d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                                            fill="rgb(251 146 60)"
                                        />
                                    </svg>
                                }
                            </Grid>
                            // </div>
                        )
                    })}

                    <CopyBtn roomId={roomId} />

                    

                    <Grid item container borderColor='yellow' xs={12} md={2} sx={{ direction: { xs: 'row', md: 'column' } }} >
                        {Object.keys(players).filter(pId => pId != myId).map((playerId) => {
                            const { url, muted, playing } = players[playerId]
                            return (
                                // <div className="flex-none w-full border-black border-2 h-40" >
                                <Grid
                                    item
                                    key={playerId}
                                    // border={1}
                                    alignItems="start"
                                    // height="37%"
                                    sx={{ height: { xs: '100%', md: '34%' } }}
                                    width='max-content'
                                >
                                    {playing ? (
                                        <Player muted={muted} playing={playing} url={stream} borderRadius={'10px'} />
                                    ) : (
                                        // <TbUserFilled fontSize='50px'  width='100%' height='100%' />
                                        <Grid border={1} borderColor='rgb(251 146 60)'>


                                            <svg
                                                width="100%"
                                                height="100%"
                                                viewBox="0 0 24 24"

                                                fill="#fff"

                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle cx="12" cy="6" r="4" fill="rgb(251 146 60)" />
                                                <path
                                                    d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                                                    fill="rgb(251 146 60)"
                                                />
                                            </svg>
                                        </Grid>
                                    )}
                                    {muted && <IoMicOffCircleOutline />}
                                </Grid>
                                // </div>
                            );
                        })}
                    </Grid>
                    {/* </div> */}
                </Grid>
                <PlayerControls
                    roomId={roomId} myId={myId} toggleStream={toggleStream} endStreamClick={endStreamClick} socket={socket}
                    peer={peer} mainPlayer={mainPlayer} setMainPlayer={setMainPlayer}
                />
            </Grid>
            // </div>

            :
            <Grid container xs={12} height='100vh' alignItems='center' justifyContent="center" gap={10}
                sx={{ background: 'radial-gradient(#455289,#2F3D7B,#212E66,#041149,#030D3D,#070F31)' }}
                direction='column'
                border={1}
            >
                <ThreeCircles
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    color="#fb923c"
                // colors={['#fb923c', '#fdba74']}

                />
                <Box display='flex' flexDirection='column' gap={2} alignItems='center' justifyContent='center'>
                    <Typography variant="h6" color='#60a5fa'> Please wait while we load and optimize your stream.</Typography>
                    <Typography variant="" color='#60a5fa'> This may take a moment.  </Typography>
                </Box>
            </Grid>

        )
    )

}

export default Room;