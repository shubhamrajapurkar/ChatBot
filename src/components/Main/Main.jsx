import './Main.css'
import PersonIcon from '@mui/icons-material/Person';
import ExploreIcon from '@mui/icons-material/Explore';
import CodeIcon from '@mui/icons-material/Code';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function Main(){

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context);

    return (
        <div className='main'>
            <div className="nav">
                <p>ChatBot</p>
                <PersonIcon className='profile'/>
            </div>
            <div className="main-container">

                {!showResult
                    ?<>
                        <div className="welcome">
                            <p><span>hello, Shubham</span></p>
                            <p>How can I help you?</p>
                        </div>

                        <div className="cards">
                            <div className="card">
                                <p>Suggest some beautiful places to see on an upcoming road trip</p> 
                                <ExploreIcon className='icon'/>
                            </div>
                            <div className="card">
                                <p>Briefly summerize this concept</p> 
                                <SummarizeIcon className='icon'/>
                            </div>
                            <div className="card">
                                <p>Python script for daily email report</p> 
                                <CodeIcon className='icon'/>
                            </div>
                            <div className="card">
                                <p>Super hero shark story</p> 
                                <AutoStoriesIcon className='icon'/>
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <PersonIcon className='profile'/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <EmojiObjectsTwoToneIcon/>
                            {loading
                            ? <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div> 
                            :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                             
                        </div>
                    </div>
                }

                

                <div className="main-bottom">
                    <div className="searchbox">

                        
                        <input onChange={(event)=>setInput(event.target.value)} value={input} type='text' placeholder='enter your promt here'/>
                        <div>

                            {/* <PhotoSizeSelectActualIcon className='icon'/>
                            <MicIcon className='icon'/>
                            <SendIcon className='icon'/> */}

                            <IconButton className='icon'>
                                <PhotoSizeSelectActualIcon/>
                            </IconButton>
                            <IconButton className='icon'>
                                <MicIcon/>
                            </IconButton>
                            {input?<IconButton className='icon'  onClick={()=>onSent()}  >
                                <SendIcon />
                            </IconButton>
                            :null}
                            
                        </div>
                    
                    </div>
                    <div className="bottom-info">
                        The chatbot may display inaccurate info, including about people, so double check you responses. Your privacy and chatBot app.
                    </div>
                </div>
            </div>

        </div>
    )
}