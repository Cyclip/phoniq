import "./song.css";

import {
    PlayIcon,
} from "@heroicons/react/24/solid";

function Song(props) {
    return (
        <div className={
            "song" +
            (props.playable ? " playable" : "")
        }>
            <div className="songImage">
                <img src={props.image} alt="Song cover" />
                {
                    props.duration ? (
                        <div className="songDuration">{props.duration}</div>
                    ) : null
                }
                {
                    props.playable ? (
                        <PlayIcon className="songPlayIcon" />
                    ) : null
                }
            </div>
            <div className="songInfo">
                <div className="songArtist">{props.artist}</div>
                <div className="songTitle">{props.title}</div>
                <div className="message">{props.message}</div>
            </div>
        </div>
    );
}

export default Song;