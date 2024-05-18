import React from 'react'
import './sidebar.css'
import {  FaHome } from "react-icons/fa";
import { SiPlayerfm } from "react-icons/si";
import { MdQueueMusic } from "react-icons/md";
import SidebarButton from './siderbarButton';
export default function Sidebar() {
  return (
    <div className='sidebar-area'>
        <div className='sidebar-container'>
        <SidebarButton title="Home" to="/" icon={<FaHome/>}/>
        <SidebarButton title="Songs" to="/songs" icon={<MdQueueMusic/>}/>
        <SidebarButton title="Player" to="/player" icon={<SiPlayerfm/>}/>
        </div>
    </div>
  )
}

