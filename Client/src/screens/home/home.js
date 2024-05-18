import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/sidebar'
import '../../shared/screen.css'
import  logo from '../../shared/user.png'
import './home.css'
import { Link, useLocation } from 'react-router-dom'
export default function Home() {
    const location = useLocation()
    const [Number, setNumber] = useState("Username");
    const [Name, setName] = useState("Name");
    const [Email, setEmail] = useState("Email")
    const [isLoggedIn, setisLoggedIn] = useState(false)
    useEffect(()=>{
        if(location.state){
            setName(location.state.name);
            setNumber(location.state.number);
            setEmail(location.state.email);
            setisLoggedIn(true)
        }
        else{
            setisLoggedIn(false)
        }
    },[location.state])

  return (
      <div className='main-body'>
        <div className='screen'>
            <div className='container'>
                <div className='userProfile'>
                <img
                    src={logo} alt='logo'
                    />
                        <div className="user-details">
                            <h3>{Name}</h3>
                            <h3>{Email}</h3>
                            <h3>{Number}</h3>
                        </div>
                </div>

                <div className='previousTracks'>
                   {
                        isLoggedIn?(<>
                            <h1>Welcome to our Music Player</h1>
                        </>)
                        :
                        (<>
                                
                            <h1>Please Login to See Previous Tracks Played</h1>
                            <Link to='/login'>
                            <button className='btn-login'>Login</button>
                            </Link>
                        </>)
                   }
                </div>

            </div>
        </div>
        <Sidebar/>
    </div>
  )
}
