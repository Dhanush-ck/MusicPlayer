import './App.css';
import React, { useRef, useState } from "react";
import jsmediatags from 'jsmediatags';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [audioName, setAudioName] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [coverArt, setCoverArt] = useState(null);

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

      jsmediatags.read(file, {
        onSuccess: (tag) => {
          const { title, artist, album, picture } = tag.tags;
          setArtist(artist || 'Unknown Artist');
          setAlbum(album || 'Unknown Album');

          // Extract album art if available
          if (picture) {
            const base64String = arrayBufferToBase64(picture.data);
            const imageSrc = `data:${picture.format};base64,${base64String}`;
            setCoverArt(imageSrc);
          }
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
    }

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

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
<<<<<<< HEAD

        <audio ref={audioRef} src="/memory_reboot_-_vøj,_narvent_[edit_audio](256k).mp3" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetaData}></audio>

        <input type='range' min="0" max={duration} value={currentTime} onChange={(e)=> (audioRef.current.currentTime = e.target.value)}></input>

=======
        <audio ref={audioRef} src="../public/song/memory_reboot_-_vøj,_narvent_[edit_audio](256k).mp3"></audio>
>>>>>>> parent of 1181bb5 (Song play error solved)
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Display the audio file name */}
      {audioName && <p>Audio Name: {audioName}</p>}
      
      {/* Display artist and album info */}
      {artist && <p>Artist: {artist}</p>}
      {album && <p>Album: {album}</p>}

      {/* Display album art if available */}
      {coverArt && <img src={coverArt} alt="Album Art" />}

      </div>
    </div>
  );
}

export default App;
