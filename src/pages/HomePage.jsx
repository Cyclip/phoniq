import { useState } from "react";
import "./homepage.css";

import Song from "../components/Song";

import {
    HeartIcon
} from "@heroicons/react/24/outline";

import {
    EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";

function HomePage() {
    const [songs, setSongs] = useState([
        {
            title: "Song Title",
            artist: "Artist Name",
            image: "https://via.placeholder.com/150",
            description: "Song description woohoo",
            id: "song-id",
            duration: "3:00",
        },
        {
            title: "Song Title 2",
            artist: "Artist Name",
            image: "https://via.placeholder.com/150",
            description: "Song description woohoo",
            id: "song-id2",
            duration: "2:00",
        },
    ]);

    const [recentlyPlayed, setRecentlyPlayed] = useState([
        {
            title: "Song Title",
            artist: "Artist Name",
            image: "https://via.placeholder.com/150",
            description: "Song description woohoo",
            id: "song-id",
            duration: "3:00",
        },
        {
            title: "Song Title",
            artist: "Artist Name",
            image: "https://via.placeholder.com/150",
            description: "Song description woohoo",
            id: "song-id",
            duration: "3:00",
        },
        {
            title: "Song Title",
            artist: "Artist Name",
            image: "https://via.placeholder.com/150",
            description: "Song description woohoo",
            id: "song-id",
            duration: "3:00",
        },
        {
            title: "Song Title",
            artist: "Artist Name",
            image: "https://via.placeholder.com/150",
            description: "Song description woohoo",
            id: "song-id",
            duration: "3:00",
        },
        {
            title: "Song Title",
            artist: "Artist Name",
            image: "https://via.placeholder.com/150",
            description: "Song description woohoo",
            id: "song-id",
            duration: "3:00",
        },
        {
            title: "Song Title",
            artist: "Artist Name",
            image: "https://via.placeholder.com/150",
            description: "Song description woohoo",
            id: "song-id",
            duration: "3:00",
        },
        
    ]);

    function listSearchedSongs() {
        return songs.map((song) => {
            return (
                <div className="songItem" key={song.id}>
                    <Song
                        title={song.title}
                        artist={song.artist}
                        image={song.image}
                        message={song.description}
                        id={song.id}
                        duration={song.duration}
                        playable={true}
                    />
                    <button className="songItemButton">
                        <EllipsisVerticalIcon className="icon" />
                    </button>
                </div>
            );
        });
    }
    
    return (
        <div className="page homePage">
            <div className="section search">
                <div className="sectionContent">
                    <h1>Search for songs</h1>
                    <div className="searchBar">
                        <input className="searchBarInput" type="text" placeholder="Search for a song.." />
                        <button className="searchBarButton">
                            <HeartIcon className="icon" />
                            Search
                        </button>
                    </div>

                    <div className="searchSongList">
                        {
                            songs.length > 0 ? (
                                listSearchedSongs()
                            ) : (
                                <div className="noSongsMsg">
                                    <p>No songs here :(</p>
                                    <p>Try searching for some using the search bar.</p>
                                </div>
                                )
                        }
                    </div>
                </div>
            </div>
            <div className="section recentlyPlayed">
                <div className="sectionContent">
                    <h1>Recently played</h1>
                    <h3 className="subtitle">{
                        recentlyPlayed.length > 0 ? (
                            `Here are your recently played songs (${recentlyPlayed.length}):`
                        ) : (
                            "You haven't played any songs yet. Try searching for some songs!"
                        )
                    }</h3>

                    <div className="recentlyPlayedSongList">
                        {
                            recentlyPlayed.map((song) => {
                                return (
                                    <div className="songItem" key={song.id}>
                                        <Song
                                            title={song.title}
                                            artist={song.artist}
                                            image={song.image}
                                            message={song.description}
                                            id={song.id}
                                            duration={song.duration}
                                            playable={true}
                                        />
                                        <button className="songItemButton">
                                            <EllipsisVerticalIcon className="icon" />
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;