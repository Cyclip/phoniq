import { useState } from "react";

import "./playlist.css";

function Playlist(props) {
    return (
        <div className="playlist">
            <img src={props.image} alt="Playlist cover" />
            <div className="playlistInfo">
                <h3>{props.name}</h3>
                <p>{props.numSongs} songs</p>
                <p>{props.duration}</p>
            </div>
        </div>
    )
}

export default Playlist;