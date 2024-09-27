import './App.css';
import React, { useRef, useState } from "react";

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="App">
      <div className="top-nav">
        <h1>Music Player</h1>
        <audio ref={audioRef} src="/memory_reboot_-_vøj,_narvent_[edit_audio](256k).mp3"></audio>
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}

export default App;
