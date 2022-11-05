import { useState, useContext } from "react";
import "./playbar.css";
import Song from "./Song";

import {
    ForwardIcon,
    BackwardIcon,
    HeartIcon,
    PauseIcon,
} from "@heroicons/react/24/solid";

import debounce from "debounce";

import MusicContext from "../contexts/musicContext";

function PlayBar(props) {
    const musicContext = useContext(MusicContext);

    const updatePlayedPercentage = debounce(
        debouncedUpdatePlayedPercentage,
        7,
    );

    const updateVolume = debounce(debouncedUpdateVolume, 7);

    function debouncedUpdatePlayedPercentage(e) {
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
        // make sure difference between percentage and playedPercentage is greater than 0.01
        let playedPercentage = musicContext.played / musicContext.duration;
        if (Math.abs(percentage - playedPercentage) > 0.01) {
            musicContext.setPlayed(musicContext.duration * percentage);
        }
    }

    function debouncedUpdateVolume(e) {
        // get the mouse position
        const mousePosition = e.clientY;

        let closestElement = e.target.closest(".volumeBarFill");
        const playbarPosition = closestElement.getBoundingClientRect();
        const bottom = playbarPosition.bottom;
        const top = playbarPosition.top;

        // calculate the percentage
        const percentage = (mousePosition - bottom) / (top - bottom) * 100;

        // update the state
        // make sure difference between percentage and playedPercentage is greater than 0.01
        if (Math.abs(percentage - musicContext.currentVolume) > 0.01) {
            musicContext.setVolume(percentage / 100);
        }
    }

    function onPlayPauseClick() {
        musicContext.setIsPlaying(!musicContext.isPlaying);
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
                                musicContext.isPlaying ? <PauseIcon className="playbarIcon pause" /> : <HeartIcon className="playbarIcon" />
                            }
                        </button>
                        <button className="playbarButton" onClick={onForwardClick}>
                            <ForwardIcon className="playbarIcon" />
                        </button>
                    </div>
                    <div className="progress">
                        <div className="progressBarContainer pb-container">
                            <p className="progressBarText pb-text">{musicContext.played.toHHMMSS()}</p>
                            <div className="progressBarFill pb-fill"
                                onMouseDown={updatePlayedPercentage}
                                onMouseMove={(e) => {
                                    if (e.buttons === 1) {
                                        updatePlayedPercentage(e);
                                    }
                                }}
                            >
                                <div className="progressBar" style={{
                                    width: `${musicContext.played / musicContext.duration * 100}%`,
                                }}></div>
                                <div className="progressBarHandle pb-handle" style={{
                                    left: `calc(${musicContext.played / musicContext.duration * 100}% - 10px)`,
                                }}></div>
                            </div>
                            <p className="progressBarText">{musicContext.duration.toHHMMSS()}</p>
                        </div>
                    </div>
                </div>
                <div className="playbarRight">
                    <div className="volumeText pb-text">
                        <p>Volume</p>
                        <p className="volumePerc">{Math.round(musicContext.currentVolume * 100)}%</p>
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
                                height: `${musicContext.currentVolume * 100}%`,
                            }}></div>
                            <div className="volumeBarHandle pb-handle" style={{
                                bottom: `calc(${musicContext.currentVolume * 100}% - 10px)`,
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={
                musicContext.isPlaying ? "currentlyPlaying visible" : "currentlyPlaying"
            }>
                <Song
                    title={musicContext.currentlyPlaying.title}
                    artist={musicContext.currentlyPlaying.artist}
                    image={musicContext.currentlyPlaying.image}
                    id={musicContext.currentlyPlaying.id}
                />
            </div>
        </div>
    );
}

// Number to time converter
Number.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this.toString(), 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    
    if (hours === "00") {
        return minutes+':'+seconds;
    } else {
        return hours+':'+minutes+':'+seconds;
    }
}

export default PlayBar;