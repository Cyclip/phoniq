import "./song.css";

import {
    PlayIcon,
} from "@heroicons/react/24/solid";

import MusicContext from "../contexts/musicContext";
import { useContext } from "react";

function Song(props) {
    const musicContext = useContext(MusicContext);

    function songDisplayType() {
        // determine what type of song display to use
        // if song is playing, use the song playing display
        // if the song is not playing (but another is), use the song not playing display
        // if no song is playing, use the song not playing display
        
        if (musicContext.isPlaying) {
            if (musicContext.currentlyPlaying.id === props.id) {
                return "playing";
            } else {
                return "not-playing";
            }
        } else {
            return "";
        }
    }

    return (
        <div className={
            "song" +
            (props.playable ? " playable " : "") +
            (props.official ? " official " : "")
        }>
            <div className="songImage" onClick={props.onImageClick}>
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
            <div className={
                "songInfo ellipsis " + songDisplayType()
            }>
                <div className="songArtist ellipsis">
                    {props.artist}
                    {
                        props.official ? (
                            <span className="officialSong">Official</span>
                        ) : null
                    }
                </div>
                <div className="songTitle ellipsis">{props.title}</div>
                <div className="message ellipsis">{props.message}</div>
            </div>
        </div>
    );
}

export default Song;