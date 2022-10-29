import { useState, useReducer } from "react";

import "./playbar.css";

import Song from "./Song";

import {
    ForwardIcon,
    BackwardIcon,
    HeartIcon,
    PauseIcon,
} from "@heroicons/react/24/solid";

function PlayBar(props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playedPercentage, setPlayedPercentage] = useState(33);
    const [currentTime, setCurrentTime] = useState("1:00");
    const [duration, setDuration] = useState("3:00");
    const [volume, setVolume] = useState(50);
    const [song, setSong] = useState({
        exists: false,
        title: null,
        artist: null,
        image: null,
        id: null,

        // exists: true,
        // title: "Song Title",
        // artist: "Artist Name",
        // image: "https://via.placeholder.com/150",
        // id: "song-id",
    });

    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    function updatePlayedPercentage(e) {
        // get the mouse position
        const mousePosition = e.clientX;

        // get the playbar position (must be .progressBarFill class)
        let closestElement = e.target.closest(".progressBarFill");
        const playbarPosition = closestElement.getBoundingClientRect();
        const left = playbarPosition.left;
        const right = playbarPosition.right;

        // calculate the percentage
        const percentage = (mousePosition - left) / (right - left);

        // update the state
        setPlayedPercentage(percentage * 100);
        forceUpdate();
    }

    function updateVolume(e) {
        // get the mouse position
        const mousePosition = e.clientY;

        let closestElement = e.target.closest(".volumeBarFill");
        const playbarPosition = closestElement.getBoundingClientRect();
        const bottom = playbarPosition.bottom;
        const top = playbarPosition.top;

        // calculate the percentage
        const percentage = (mousePosition - bottom) / (top - bottom);

        // update the state
        setVolume(percentage * 100);
        forceUpdate();
    }

    function onPlayPauseClick() {
        setIsPlaying(!isPlaying);
    }

    function onBackwardClick() {
        console.log("backward");
    }

    function onForwardClick() {
        console.log("forward");
    }

    return (
        <div className="playbarContainer">
            <div className="playbar">
                <div className="playbarCenter">
                    <div className="buttons">
                        <button className="playbarButton" onClick={onBackwardClick}>
                            <BackwardIcon className="playbarIcon" />
                        </button>
                        <button className="playbarButton circled" onClick={onPlayPauseClick}>
                            {
                                isPlaying ? <PauseIcon className="playbarIcon pause" /> : <HeartIcon className="playbarIcon" />
                            }
                        </button>
                        <button className="playbarButton" onClick={onForwardClick}>
                            <ForwardIcon className="playbarIcon" />
                        </button>
                    </div>
                    <div className="progress">
                        <div className="progressBarContainer pb-container">
                            <p className="progressBarText pb-text">{currentTime}</p>
                            <div className="progressBarFill pb-fill"
                                onMouseDown={updatePlayedPercentage}
                                onMouseMove={(e) => {
                                    if (e.buttons === 1) {
                                        updatePlayedPercentage(e);
                                    }
                                }}
                            >
                                <div className="progressBar" style={{
                                    width: `${playedPercentage}%`,
                                }}></div>
                                <div className="progressBarHandle pb-handle" style={{
                                    left: `calc(${playedPercentage}% - 10px)`,
                                }}></div>
                            </div>
                            <p className="progressBarText">{duration}</p>
                        </div>
                    </div>
                </div>
                <div className="playbarRight">
                    <div className="volumeText pb-text">
                        <p>Volume</p>
                        <p className="volumePerc">{Math.round(volume)}%</p>
                    </div>
                    <div className="volumeBarContainer  pb-container"
                        onMouseDown={updateVolume}
                        onMouseMove={(e) => {
                            if (e.buttons === 1) {
                                updateVolume(e);
                            }
                        }}
                    >
                        <div className="volumeBarFill pb-fill">
                            <div className="volumeBar" style={{
                                height: `${volume}%`,
                            }}></div>
                            <div className="volumeBarHandle pb-handle" style={{
                                bottom: `calc(${volume}% - 10px)`,
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={song.exists ? "currentlyPlaying visible" : "currentlyPlaying"}>
                <Song
                    title={song.title}
                    artist={song.artist}
                    image={song.image}
                    id={song.id}
                />
            </div>
        </div>
    );
}


export default PlayBar;