import { useState } from "react";
import "./css/App.css";

import NavigationBar from "./components/NavigationBar";
import PlayBar from "./components/PlayBar";

import HomePage from "./pages/HomePage";


function App() {
    const [page, setPage] = useState("home");

    // navigationButtonClick handler
    const navigationButtonClick = (page) => {
        return () => {
            setPage(page);
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
                return <p>404 unimplemented</p>;
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
