import { useState } from "react";

import "./playbar.css";

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

    function updatePlayedPercentage(e) {
        // print element class
        // get the mouse position
        const mousePosition = e.clientX;

        // get the playbar position (must be .progressBarFill class)
        let closestElement = e.target.closest(".progressBarFill");
        const playbarPosition = closestElement.getBoundingClientRect();
        const left = playbarPosition.left;
        const right = playbarPosition.left + playbarPosition.width;

        // calculate the percentage
        const percentage = (mousePosition - left) / (right - left);

        // update the state
        setPlayedPercentage(percentage * 100);
    }

    function updateVolume(e) {
        setVolume(e.target.value);
    }

    return (
        <div className="playbar">
            <div className="playbarCenter">
                <div className="buttons">
                    <button className="playbarButton">
                        <BackwardIcon className="playbarIcon" />
                    </button>
                    <button className="playbarButton circled">
                        {
                            isPlaying ? <PauseIcon className="playbarIcon pause" /> : <HeartIcon className="playbarIcon" />
                        }
                    </button>
                    <button className="playbarButton">
                        <ForwardIcon className="playbarIcon" />
                    </button>
                </div>
                <div className="progress">
                    <div className="progressBarContainer">
                        <p className="progressBarText">{currentTime}</p>
                        <div className="progressBarFill"
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
                            <div className="progressBarHandle" style={{
                                left: `calc(${playedPercentage}% - 10px)`,
                            }}></div>
                        </div>
                        <p className="progressBarText">{duration}</p>
                    </div>
                </div>
            </div>
            <div className="playbarRight">
                <div className="volumeText">
                    <p>Volume</p>
                    <p className="volumePerc">{Math.round(volume)}%</p>
                </div>
                <div className="volumeBarContainer"
                    onMouseDown={updateVolume}
                    onMouseMove={(e) => {
                        if (e.buttons === 1) {
                            updateVolume(e);
                        }
                    }}
                >
                    <div className="volumeBarFill">
                        <div className="volumeBar" style={{
                            width: `${volume}%`,
                        }}></div>
                        <div className="volumeBarHandle" style={{
                            bottom: `calc(${volume}% - 10px)`,
                        }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default PlayBar;