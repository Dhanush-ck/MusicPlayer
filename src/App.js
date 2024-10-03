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

  // const imageList = document.getElementsByClassName('image-list');

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
    addDiv();
  }

  const initialSrc = '/img/heart.png';
  const filledSrc = '/img/heart_fill.png';
  const [src, setSrc] = useState(initialSrc);
  const heartHide = (e)=>{
    setSrc((prevSrc)=>(prevSrc===initialSrc? filledSrc:initialSrc));
  }

  const [divs, setDivs] = useState([]);

  const addDiv = () => {
    const newDiv = (
      <div className='songs'>
          <h4>Memory Reboot</h4>
          <img src={src} alt='heart' id='heart' onClick={heartHide}></img>
          {/* <img src='/img/heart_fill.png' alt='heart-filled' id='heart-fill' onClick={heartFillHide}></img> */}
          <button>Remove</button>
        </div>
    );
    setDivs((prevDivs) => [...prevDivs, newDiv]);
  };

  const heart = document.getElementById('heart');
  const heartFill = document.getElementById('heart-fill');

  // const heartHide = ()=>{
  //   heart.style.display = 'none';
  //   heartFill.style.display = 'block';
  // }

  // const heartFillHide = ()=>{
  //   heartFill.style.display = 'none';
  //   heart.style.display = 'block';
  // }

  return (
    <div className="App">
      <div className='music-content-heading'>
        <h2>List</h2>
      </div>
      
      <div className="current-playing">
        <div className='current-playing-elements'>
          <h1>Music Player</h1>

          <audio ref={audioRef} src="/songs/memory_reboot_-_vøj,_narvent_[edit_audio](256k).mp3" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetaData}></audio>

          <input type='range' id='duration-slider' min="0" max={duration} value={currentTime} onChange={(e)=> (audioRef.current.currentTime = e.target.value)}></input>

          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      <div className='music-list'>
        <div className='music-list-buttons'>
          <button className='input-button'>
            <label htmlFor="input-music">
                +
            </label>
          </button>
          <input type='file' accept='audio/*' id="input-music" onChange={handleMusicInput}></input>
        </div>
        <div className='songs'>
          <h4>Memory Reboot</h4>
          <img src={src} alt='heart' id='heart' onClick={heartHide}></img>
          {/* <img src='/img/heart_fill.png' alt='heart-filled' id='heart-fill' onClick={heartFillHide}></img> */}
          <button>Remove</button>
        </div>
        {divs.map((div) => div)}
      </div>
    </div>
  );
}

export default App;
