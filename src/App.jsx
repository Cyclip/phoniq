import { useState } from "react";
import "./css/App.css";

import NavigationBar from "./components/NavigationBar";
import PlayBar from "./components/PlayBar";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
    const [page, setPage] = useState("home");

    // navigationButtonClick handler
    const navigationButtonClick = (page) => {
        return () => {
            switch (page) {
                case "home":
                    setPage("home");
                    break;
                case "playlists":
                    // open playlists sidebar
                    break;
                case "settings":
                    setPage("settings");
                    break;
                default:
                    setPage("404");
            }
        }
    }

    function renderPage() {
        switch (page) {
            case "home":
                return <HomePage />;
            case "playlists":
                return <p>Playlists unimplemented</p>;
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
            />
            {renderPage()}
            <PlayBar />
        </div>
    );
}

export default App;
