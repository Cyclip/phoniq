import { useState, createContext, useContext } from "react";
import "./css/App.css";

import NavigationBar from "./components/NavigationBar";
import PlayBar from "./components/PlayBar";
import HomePage from "./pages/HomePage";
import PlaylistsSidebar from "./PlaylistsSidebar";
import ErrorPage from "./pages/ErrorPage";

import MusicContext from "./contexts/musicContext";

function App() {
    const [page, setPage] = useState("home");
    const [playlistsOpen, setPlaylistsOpen] = useState(false);

    const [currentlyPlaying, setCurrentlyPlaying] = useState({
        title: "Song Title",
        artist: "Artist Name",
        image: "https://via.placeholder.com/150",
        description: "Song description woohoo",
        id: "song-id",
        duration: "3:00",
        exists: false,
    });
    const [songQueue, setSongQueue] = useState([]);
    const [currentVolume, setVolume] = useState(0.5);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);

    const musicContext = {
        currentlyPlaying: currentlyPlaying,
        setCurrentlyPlaying: setCurrentlyPlaying,
        songQueue: songQueue,
        setSongQueue: setSongQueue,
        currentVolume: currentVolume,
        setVolume: setVolume,
        isPlaying: isPlaying,
        setIsPlaying: setIsPlaying,
        played: played,
        setPlayed: setPlayed,
        duration: duration,
        setDuration: setDuration,
    };

    // navigationButtonClick handler
    const navigationButtonClick = (page) => {
        return () => {
            switch (page) {
                case "home":
                    setPage("home");
                    break;
                case "playlists":
                    openPlaylists();
                    break;
                case "settings":
                    setPage("settings");
                    break;
                default:
                    setPage("404");
            }
        }
    }

    // openPlaylists handler
    const openPlaylists = () => {
        setPlaylistsOpen(!playlistsOpen);
    }

    // on playlist sidebar close
    const onPlaylistsClose = () => {
        setPlaylistsOpen(false);
    }

    // on playlist selection (sidebar)
    const onPlaylistSelect = (playlist) => {
        return () => {
            console.log(playlist);
            setPage("playlist");
        }
    }

    function renderPage() {
        switch (page) {
            case "home":
                return <HomePage />;
            case "settings":
                return <p>Settings unimplemented</p>;
            default:
                return <ErrorPage
                    pageName={page}
                />;
        }
    }

    return (
        <MusicContext.Provider value={musicContext}>
            <div className="app">
                <NavigationBar 
                    onButtonClick={navigationButtonClick}
                    activePage={page}
                    playlistsOpen={playlistsOpen}
                />
                {renderPage()}
                <PlayBar />
                <PlaylistsSidebar
                    open={playlistsOpen}
                    onButtonClick={navigationButtonClick}
                    onClose={onPlaylistsClose}
                    onSelect={onPlaylistSelect}
                />
            </div>
        </MusicContext.Provider>
    );
}

export default App;
