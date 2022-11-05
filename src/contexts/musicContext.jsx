import { createContext } from "react";

// These are the default values for the context
// The setter functions should be determined by the context provider in the App.jsx file
const MusicContext = createContext({
    currentlyPlaying: null,
    setCurrentlyPlaying: () => {},
    songQueue: [],
    setSongQueue: () => {},
    currentVolume: 0.5,
    setVolume: () => {},
    isPlaying: false,
    setIsPlaying: () => {},
    played: 90,
    setPlayed: () => {},
    duration: 100,
    setDuration: () => {},
});

export default MusicContext;