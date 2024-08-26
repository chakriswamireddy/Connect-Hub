const { default: ReactPlayer } = require("react-player")

const Player = (props) => {

    const { url,muted,playing,borderRadius} = props;
    return (
            <ReactPlayer style={{borderRadius: borderRadius, overflow:'hidden',boxShadow:'-1px 0px 5px 1px rgba(107,107,107,0.75)'}} width='100%' height='100%' muted={muted} url={url} playing={playing} />

    )
}

export default Player;