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
                        <div className="progressBarFill">
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

            </div>
        </div>
    );
}

export default PlayBar;