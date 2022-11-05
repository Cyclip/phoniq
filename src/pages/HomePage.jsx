import { useContext, useState } from "react";
import "./homepage.css";

import Song from "../components/Song";

import {
    HeartIcon
} from "@heroicons/react/24/outline";

import {
    EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import LoadingSVG from "../assets/loading.svg";

import {
    search
} from "../mod/yt";

import MusicContext from "../contexts/musicContext";

function HomePage() {
    const musicContext = useContext(MusicContext);
    const [searchBarValue, setSearchBarValue] = useState("");
    const [currentlySearching, setCurrentlySearching] = useState(false); // also disables button
    const [refinements, setRefinements] = useState([]);
    const [songs, setSongs] = useState([
        // {
        //     title: "Song Title",
        //     artist: "Artist Name",
        //     image: "https://via.placeholder.com/150",
        //     description: "Song description woohoo",
        //     id: "song-id",
        //     duration: "3:00",
        // },
        
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
    ]);

    function durationToSeconds(duration) {
        // format HH:MM:SS
        let seconds = 0;
        let minutes = 0;
        let hours = 0;

        if (duration.includes(":")) {
            let split = duration.split(":");
            if (split.length === 3) {
                hours = parseInt(split[0]);
                minutes = parseInt(split[1]);
                seconds = parseInt(split[2]);
            } else if (split.length === 2) {
                minutes = parseInt(split[0]);
                seconds = parseInt(split[1]);
            } else {
                seconds = parseInt(split[0]);
            }
        } else {
            seconds = parseInt(duration);
        }

        return seconds + (minutes * 60) + (hours * 60 * 60);
    }

    function onSongClick(songID) {
        // update the MusicContext
        console.log("Song clicked: " + songID);
        const song = songs.find(song => song.id === songID);
        
        if (song) {
            musicContext.setCurrentlyPlaying(song);
            musicContext.setIsPlaying(true);
            musicContext.setSongQueue([]);
            musicContext.setPlayed(0);
            musicContext.setDuration(durationToSeconds(song.duration));
            console.log(`Playing ${song.title} by ${song.artist}`);
            console.log(musicContext);
        }
    }

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
                        onImageClick={() => onSongClick(song.id)}
                        official={song.official}
                    />
                    <button className="songItemButton">
                        <EllipsisVerticalIcon className="icon" />
                    </button>
                </div>
            );
        });
    }

    function onSearchClick(e) {
        const query = searchBarValue;
        console.log("[SC] Searching for " + query);
        
        // query must be at least 3 characters long
        if (query.length >= 3) {

            // wait for search to finish
            searchQuery(query);
        } else {
            console.log("Query too short");
        }
    }

    function searchQuery(query) {
        console.log("Searching for " + query);
        if (currentlySearching) {
            console.log("Already searching");
            return;
        }

        setCurrentlySearching(true);
        setSongs([]);
        setRefinements([]);
        search(query).then((data) => {
            console.log("Search results:", data);
            const vidInfo = data[0];
            const refinements = data[1];
            setSongs(vidInfo);
            setRefinements(refinements);

            // re-enable button
            setCurrentlySearching(false);
        }).catch((err) => {
            console.log(err);

            // re-enable button
            setCurrentlySearching(false);
        });
    }

    function renderRefinements() {
        return (
            <div className="refinements">
                <p className="refinementsLabel">Did you mean:</p>
                <div className="refinementsList">
                    {
                        refinements.map((refinement) => {
                            return (
                                <p className="refinement" key={refinement} onClick={() => {
                                    console.log("Refinement clicked: " + refinement);
                                    setSearchBarValue(refinement);
                                    searchQuery(refinement);
                                }}>{refinement}</p>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
    
    return (
        <div className="page homePage">
            <div className="section search">
                <div className="sectionContent">
                    <h1>Search for songs</h1>
                    <div className="searchBar">
                        <input className="searchBarInput" type="text" placeholder="Search for a song.." 
                            value={searchBarValue} 
                            onChange={(e) => setSearchBarValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    onSearchClick();
                                }
                            }}
                            disabled={currentlySearching}
                        />
                        <button className="searchBarButton" onClick={onSearchClick}
                            disabled={currentlySearching}
                        >
                            <HeartIcon className="icon" />
                            Search
                        </button>
                    </div>

                    {
                        refinements.length > 0 ? (
                            renderRefinements()
                        ) : null
                    }

                    <div className="searchSongList">
                        {
                            songs.length > 0 ? (
                                listSearchedSongs()
                            ) : (
                                <div>
                                    {
                                        currentlySearching ? (
                                            <div className="noSongsMsg">
                                                <img className="loading" src={LoadingSVG} alt="Loading..." />
                                                <p>Searching for {searchBarValue}..</p>
                                            </div>
                                        ) : (
                                            <div className="noSongsMsg">
                                                <p>No songs here :(</p>
                                                <p>Try searching for some using the search bar.</p>
                                            </div>
                                        )
                                    }
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
                                            official={song.official}
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