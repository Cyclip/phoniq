import { useState } from "react";

import Playlist from "./components/Playlist";

import "./css/playlistsSidebar.css";
import {
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline"

import {
    EllipsisVerticalIcon,
    PlusIcon,
} from "@heroicons/react/24/solid"

function PlaylistsSidebar(props) {
    const [playlists, setPlaylists] = useState([
        {
            name: "Playlist 1",
            id: "1",
            image: "https://via.placeholder.com/150",
            numSongs: 5,
            duration: "5h 30m",
        },
        {
            name: "Playlist 2",
            id: "2",
            image: "https://via.placeholder.com/150",
            numSongs: 5,
            duration: "5h 30m",
        },
        {
            name: "Playlist 3",
            id: "3",
            image: "https://via.placeholder.com/150",
            numSongs: 5,
            duration: "5h 30m",
        },
        {
            name: "Playlist 4",
            id: "4",
            image: "https://via.placeholder.com/150",
            numSongs: 5,
            duration: "5h 30m",
        },
        {
            name: "Playlist 5",
            id: "5",
            image: "https://via.placeholder.com/150",
            numSongs: 5,
            duration: "5h 30m",
        },
        {
            name: "Playlist 6",
            id: "6",
            image: "https://via.placeholder.com/150",
            numSongs: 5,
            duration: "5h 30m",
        },
    ]);

    function shiftUp(index) {
        if (index === 0) {
            return;
        }
        // swap with the previous
        let previous = playlists[index - 1];
        let current = playlists[index];
        let newPlaylists = playlists;
        newPlaylists[index - 1] = current;
        newPlaylists[index] = previous;
        setPlaylists([...newPlaylists]);
    }

    function shiftDown(index) {
        if (index === playlists.length - 1) {
            return;
        }
        // swap with the next
        let next = playlists[index + 1];
        let current = playlists[index];
        let newPlaylists = playlists;
        newPlaylists[index + 1] = current;
        newPlaylists[index] = next;
        setPlaylists([...newPlaylists]);
    }

    function handleSidebarClick(e) {
        e.stopPropagation();

        if (e.target.className === "playlistsSidebar open") {
            // close the sidebar
            props.onClose();
        }
    }

    return (
        <div className={
            "playlistsSidebar" +
            (props.open ? " open" : "")
        }
            onClick={handleSidebarClick}
        >
            <div className="sidebar">
                <div className="playlistList">
                    <div className="playlistItem createNew">
                        <div className="buttonContainer" style={{opacity: 0}}>
                            <button className="playlistButton"><ChevronUpIcon className="icon" /></button>
                            <button className="playlistButton"><ChevronDownIcon className="icon" /></button>
                        </div>
                        <div className="playlist">
                            <div className="empty">
                                <PlusIcon className="icon" />
                            </div>
                            <div className="playlistInfo">
                                <h3>Create a new playlist</h3>
                            </div>
                        </div>
                    </div>
                    {
                        playlists.map((playlist, index) => {
                            return (
                                <div className="playlistItem"
                                    key={index}
                                    onClick={() => {
                                        props.onSelect(playlist.id);
                                        props.onClose();
                                    }}
                                >
                                    <div className="buttonContainer">
                                        <button className="playlistButton"
                                            onClick={() => shiftUp(index)}
                                        ><ChevronUpIcon className="icon" /></button>
                                        <button className="playlistButton"
                                            onClick={() => shiftDown(index)}
                                        ><ChevronDownIcon className="icon" /></button>
                                    </div>
                                    <Playlist
                                        name={playlist.name}
                                        id={playlist.id}
                                        image={playlist.image}
                                        numSongs={playlist.numSongs}
                                        duration={playlist.duration}
                                    />
                                    <button className="moreButton"><EllipsisVerticalIcon className="icon" /></button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default PlaylistsSidebar;