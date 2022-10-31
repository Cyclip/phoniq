import { useState } from "react";

import "./playlist.css";

function Playlist(props) {
    return (
        <div className="playlist">
            <img src={props.image} alt="Playlist cover" />
            <div className="playlistInfo">
                <h3 className="ellipsis">{props.name}</h3>
                <p className="ellipsis">{props.numSongs} songs</p>
                <p className="ellipsis">{props.duration}</p>
            </div>
        </div>
    )
}

export default Playlist;