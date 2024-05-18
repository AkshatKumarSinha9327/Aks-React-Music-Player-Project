import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import { useLocation } from 'react-router-dom';
import player_image from './player-img.png';
import './player.css';
import '../../shared/screen.css';
import play from './play.png';
import pause from './pause.png';
import next from './next.png';
import prev from './prev.png';

export default function Player() {
    const location = useLocation();
    const [image, setImage] = useState(player_image);
    const [link, setLink] = useState("");
    const [isPlaying, setIsPlaying] = useState(true);
    const [name, setName] = useState("Select The song");
    const audioRef = useRef(null);
    const seekbarRef = useRef(null);

    useEffect(() => {
        if (location.state) {
            setImage(location.state.img);
            setLink(location.state.song);
            setName(location.state.title);
        }
    }, [location.state]);

    useEffect(() => {
        if (audioRef.current && seekbarRef.current) {
            setupSeekbar();
            updateSeekbar();
        }
    }, [link]);

    const playPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const setupSeekbar = () => {
        const audio = audioRef.current;
        const seekbar = seekbarRef.current;

        seekbar.min = 0;
        seekbar.max = audio.duration;

        audio.ondurationchange = () => {
            seekbar.max = audio.duration;
        };
    };

    const updateSeekbar = () => {
        const audio = audioRef.current;
        const seekbar = seekbarRef.current;

        const updateUI = () => {
            if (audio.buffered.length > 0) {
                seekbar.value = audio.currentTime;
            }
        };

        audio.ontimeupdate = updateUI;
        seekbar.onchange = () => {
            audio.currentTime = seekbar.value;
        };
    };

    return (
        <div className='main-body'>
            <div className='screen'>
                <div className='player'>
                    <div className='player-image'>
                        <img src={image} alt="Player" />
                    </div>
                    <div className='player-controls'>
                        <h3>{name}</h3>
                        <input id="seekbar" ref={seekbarRef} type='range' min={0} max={100} />
                        <audio id='audio' ref={audioRef} src={link} controls autoPlay="true" hidden />
                        <div className='audio-control'>
                            <img src={prev} id='prev-audio' alt="Previous" />
                            <img src={isPlaying ? pause : play} id='play-pause' alt="Play/Pause" onClick={playPause} />
                            <img src={next} id='next-audio' alt="Next" />
                        </div>
                    </div>
                </div>
                <div className='otherSongs'></div>
            </div>
            <Sidebar />
        </div>
    );
}
