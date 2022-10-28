import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./css/App.css";

import {
  HomeModernIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import {  
  HeartIcon,
} from "@heroicons/react/24/outline";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="app">
      <div className="nav">
        <div className="navButton">
          <HomeModernIcon className="navIcon" />
          <p className="navText">Home</p>
        </div>

        <div className="navButton">
          <svg className="navIcon" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="19.8333" cy="24.0833" r="4.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24.0833 24.0833V5.66667H29.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.4167 7.08333H4.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.25 12.75H18.4167" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.75 18.4167H4.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="navText">Playlists</p>
        </div>

        <div className="navButton right">
          <Cog6ToothIcon className="navIcon" />
          <p className="navText">Settings</p>
        </div>

        <div className="title">
          <HeartIcon className="titleIcon" />
          <p className="titleText">Phoniq</p>
          <HeartIcon className="titleIcon" />
        </div>
      </div>
    </div>
  );
}

export default App;
