import React, { useState, useEffect } from 'react'
import './Chat.css'
import Avatar from '@material-ui/core/Avatar'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom';
import db from './firebase';

function Chat() {
    const [input, setInput] = useState('')
    const [seed, setSeed] = useState('');
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState("")

    useEffect(() => {
        if(roomId) {
            db
            .collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => setRoomName(snapshot.data().name))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = e => {
        e.preventDefault()
        setInput("")
    }

    return (
        <div className="chat">
            
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                <p className={`chat__message ${true && "chat__reciever"}`}>
                    <span className="chat__name">Sammy</span>
                    Hey Guys
                    <span className="chat__timestamp">
                        3:52pm
                    </span>
                    
                </p>

                <p className="chat__message">
                    Hey Guys
                </p>
                <p className="chat__message">
                    Hey Guys
                </p>
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                        value={input} 
                        type="text" 
                        placeholder="Type a message"
                        onChange={e => setInput(e.target.value)} 
                    />
                    <button onClick={sendMessage} type="submit">Send Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
