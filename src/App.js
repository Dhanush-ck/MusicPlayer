import './App.css';
import React, { useRef, useState } from "react";

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleTimeUpdate = ()=>{
    setCurrentTime(audioRef.current.currentTime);
  }

  const handleLoadedMetaData = ()=> {
    setDuration(audioRef.current.duration);
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMusicInput = (e)=> {
    const file = e.target.files[0];
    if(file){
      const fileURL = URL.createObjectURL(file);
      audioRef.current.src = fileURL;
    }
  }

  return (
    <div className="App">
      <div className='music-list'>
        <h2>List</h2>

        <button>
        <label htmlFor="input-music">
          Add
        </label>

        </button>
        <input type='file' accept='audio/*' id="input-music" onChange={handleMusicInput}></input>
      </div>
      
      <div className="current-playing">
        <h1>Music Player</h1>
        <h3></h3>
        <audio ref={audioRef} src="/memory_reboot_-_vøj,_narvent_[edit_audio](256k).mp3" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetaData}></audio>

        <input type='range' min="0" max={duration} value={currentTime} onChange={(e)=> (audioRef.current.currentTime = e.target.value)}></input>

        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>

      </div>
    </div>
  );
}

export default App;
