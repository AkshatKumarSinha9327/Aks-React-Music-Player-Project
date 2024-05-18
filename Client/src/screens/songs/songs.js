import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/sidebar'
import '../../shared/screen.css'
import './songs.css'
import { useNavigate } from 'react-router-dom';

export default function Songs() {

    const [songs, setSongs] = useState({});
    useEffect(()=>{
        async function fetchData(){
            try {
                const response = await fetch("http://localhost/api/auth/getSongs");
                if(!response.ok){
                    throw new Error("Connection failed");
                }
                const data = await response.json();
                setSongs(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[])

    const navigate = useNavigate();

    const playSong = (img,song,title)=>{
        navigate('/player',{state:{
            'img':img,
            "song":song,
            "title":title
        }})
    }

    return (
        <>
            <div className='main-body'>
                <div className='screen'>
                    {
                        Object.keys(songs).length>0?(
                            Object.keys(songs)?.map((ele)=>{
                                return (
                                    <>
                                        <div className='song-card' key={songs[ele].img} onClick={()=>{
                                            playSong(songs[ele].img,songs[ele].song,songs[ele].title)
                                        }}>
                                            <img src={songs[ele].img} alt={songs[ele].title}></img>
                                            <h4>{songs[ele].title}</h4>
                                        </div>
                                    </>
                                )
                            })
                        ):
                        (<p>Loading Songs</p>)
                        
                    }
                </div>
                <Sidebar></Sidebar>
            </div>
        </>
    )
}
