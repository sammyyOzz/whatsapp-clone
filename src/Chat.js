import React, { useState, useEffect } from 'react'
import './Chat.css'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';
import { useParams, Link } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer'
import firebase from 'firebase'

function Chat() {
    const [input, setInput] = useState('')
    const [seed, setSeed] = useState('');
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [ { user }, dispatch] = useStateValue()

    useEffect(() => {
        if(roomId) {
          db
            .collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => setRoomName(snapshot.data().name))

          db
            .collection('rooms')
            .doc(roomId)
            .collection("messages")
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ) )
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    useEffect(() => {
        dispatch({
            type: actionTypes.SET_MENU,
            mobileMenu: false,
        })
    },[roomId])

    const sendMessage = e => {
        e.preventDefault()

        if(input) {
          db
            .collection('rooms')
            .doc(roomId)
            .collection("messages")
            .add({
                message: input,
                name: user?.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })

            setInput("")
        }
    }

    const handleMenuOpen = () => {
        dispatch({
            type: actionTypes.SET_MENU,
            mobileMenu: true,
        })
    }

    return (
        <div className="chat">
            
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                    <Link to="/">
                        <IconButton>
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <div class="menuIcon" onClick={handleMenuOpen}>
                        <IconButton>
                            <MenuIcon />
                        </IconButton>
                    </div>
                        
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p key={message.timestamp} className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name" style={{color: 'white'}}>{message.name}</span>
                            {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                        
                    </p>
                ))}
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
                    <IconButton onClick={sendMessage} type="submit">
                        <SendIcon />
                    </IconButton>
                </form>
            </div>
        </div>
    )
}

export default Chat
