import { useState } from "react";
import "./css/App.css";

import NavigationBar from "./components/NavigationBar";
import PlayBar from "./components/PlayBar";
import HomePage from "./pages/HomePage";
import PlaylistsSidebar from "./PlaylistsSidebar";
import ErrorPage from "./pages/ErrorPage";

function App() {
    const [page, setPage] = useState("home");
    const [playlistsOpen, setPlaylistsOpen] = useState(false);

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
    );
}

export default App;
