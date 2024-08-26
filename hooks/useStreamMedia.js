
import React, { useEffect, useRef, useState } from 'react'

const useStreamMedia=()=> {
    const [state,setState] = useState(null)
    const isStreamSet = useRef(false)

    // const toggleStreaming = () => {
    //     setState
    // }

    const [onVideo,setOnVideo] = useState(true);

    const toggleStream =() =>{

        isStreamSet.current =false
        // setOnVideo(!onVideo);
        setOnVideo((prevOnVideo) => !prevOnVideo);
        // console.log(isStreamSet.current)

    }

    const endStreamClick = () => {
        if (state) {
            state.getTracks().forEach(track => track.stop()); // Stop all tracks
            setState(null); // Clear the state
            console.log('Stream ended');
        }
    };

    useEffect(()=> {

        if (isStreamSet.current) return;
       
        (async function(){
            try{
            const stream = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:onVideo,
            })
            console.log('Setting your Stream Started',stream)
            setState(stream)
            isStreamSet.current = true;
            }
            catch(e) {
                console.log("Error in Stream Setting", e)
            }
        })()
    },[onVideo])

    return {stream: state,toggleStream,endStreamClick}
}

export default useStreamMedia;