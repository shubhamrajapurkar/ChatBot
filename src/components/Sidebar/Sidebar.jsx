import './Sidebar.css'
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/Message';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/HistoryOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';

export default function Sidebar(){

    const [extended,setExtended]=useState(false);
    const {onSent,prevPrompt,setRecentPrompt,newChat}=useContext(Context);

    const loadPrompt= async(prompt)=>{
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return(
        <div className="Sidebar">
            <div className="top">

                <IconButton aria-label="delete" className='menu icon' onClick={()=>setExtended(prev=>!prev)}>
                    <MenuIcon />
                </IconButton>

                <div onClick={()=>newChat()} className="newchat">
                    <AddIcon className='icon'/>
                    {extended?<p>New Chat</p>:null}
                </div>

                {extended?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompt.map((item,index)=>{
                            return (
                                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                                    <MessageIcon className='icon'/>
                                    <p>{item.slice(0,18)} ...</p>
                                </div>
                            )
                        })}
                        
                    </div>
                    :null
                }   
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <HelpIcon className='icon'/>
                    {extended?<p>Help</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <HistoryIcon className='icon'/>
                    {extended?<p>History</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <SettingsIcon className='icon'/>
                    {extended?<p>Settings</p>:null}
                </div>
            </div>
        </div>
    )
}