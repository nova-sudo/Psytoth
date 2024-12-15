import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { MdOutlinePlayCircle } from "react-icons/md";
import { MdOutlinePauseCircleOutline } from "react-icons/md";


const MusicPlayer = () => {
  const [playlist] = useState([
    { url: '/Windows.mp3', title: 'Fallen Up' },
    { url: '/Linux.mp3', title: 'Nematophy' },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);

  const playerRef = useRef(null);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1 < playlist.length ? prev + 1 : 0));
    setPlayed(0);
  };
  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev > 0 ? prev - 1 : playlist.length - 1));
    setPlayed(0);
  };
  const handleProgressChange = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(newPlayed, 'fraction');
  };
  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));
  const handleProgress = (state) => setPlayed(state.played);

  return (
    <div className="     text-black font-aqem max-w-xs rounded-lg">
      <h3 className="text-3xl font-medium  truncate">
        {playlist[currentSongIndex].title}
      </h3>
      
      <ReactPlayer
        ref={playerRef}
        url={playlist[currentSongIndex].url}
        playing={isPlaying}
        volume={volume}
        onEnded={nextSong}
        onProgress={handleProgress}
        width="100%"
        height="30px"
        style={{ display: 'none' }} // Hides the built-in controls
      />

      <div className="flex items-center justify-between  text-sm">
        <button onClick={prevSong} className="text-black">◄</button>
        <button
          onClick={togglePlayPause}
          className="px-3 rounded text-4xl"
        >
          {isPlaying ? <MdOutlinePauseCircleOutline/> : <MdOutlinePlayCircle/>}
        </button>
        <button onClick={nextSong} className="text-black">►</button>
      </div>

      {/* Black and white progress bar */}
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={played}
        onChange={handleProgressChange}
        className="w-full mt-2 black-and-white-slider"
      />

     

      <style jsx>{`
        .black-and-white-slider {
          -webkit-appearance: none;
          width: 100%;
          background-color: black;
          height: 2px;
        }
        
        .black-and-white-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          background-color: black;
          border: 2px solid black; /* White ring */
          border-radius: 50%;
          cursor: pointer;
        }
        
        .black-and-white-slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          background-color: transparet;
          border: 2px solid black; /* White ring */
          border-radius: 50%;
          cursor: pointer;
        }
        
        .black-and-white-slider:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
