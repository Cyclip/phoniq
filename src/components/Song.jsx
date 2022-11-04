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
                        <PlayIcon fill="#ECB1BC" className="songPlayIcon" />
                    ) : null
                }
            </div>
            <div className="songInfo ellipsis">
                <div className="songArtist ellipsis">{props.artist}</div>
                <div className="songTitle ellipsis">{props.title}</div>
                <div className="message ellipsis">{props.message}</div>
            </div>
        </div>
    );
}

export default Song;