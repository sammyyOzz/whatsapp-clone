import React, { useState, useEffect } from 'react'
import './SidebarChat.css'
import Avatar from '@material-ui/core/Avatar'
import db from './firebase';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('')

    useEffect(() => {
        if (id) {
          db
            .collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => 
                setMessages(snapshot.docs.map(doc => doc.data()))
            )
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt("Please enter a name for the chat room");

        if (roomName) {
            // do some database stuff...
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <Button style={{backgroundColor: '#006064', color: 'white'}} variant="contained" fullWidth><h3>😄 Add New Chat 😄</h3></Button>
        </div>
    )
}

export default SidebarChat
