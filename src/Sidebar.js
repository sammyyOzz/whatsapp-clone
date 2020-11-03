import React from 'react'
import './Sidebar.css'
import './TransitionModal.css'
import Avatar from '@material-ui/core/Avatar'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import { useState } from 'react';
import { useEffect } from 'react';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar({ modalView }) {
    const [rooms, setRooms] = useState([])
    const [{ user }, dispatch] = useStateValue()

    useEffect(() => {
        const unsubscibe = 
            db
            .collection('rooms')
            .onSnapshot(snapshot => 
                setRooms(snapshot.docs.map(doc => 
                    ({
                        id: doc.id,
                        data: doc.data(),
                    })
                ))
            )

        return() => {
            unsubscibe()
        }
    }, [])

    return (
        <div className={ ! modalView ? "sidebar" : "modal" }>
            <div className={ ! modalView ? "sidebar__header" : "modal__header" }>
                <Avatar src={user?.photoURL} />
                <div className={ ! modalView ? "sidebar__headerRight" : "modal__headerRight" }>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className={ ! modalView ? "sidebar__search" : "modal__search" }>
                <div className={ ! modalView ? "sidebar__searchContainer" : "modal__searchContainer" }>
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className={ ! modalView ? "sidebar__chats" : "modal__chats" }>
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat 
                        key={room.id} 
                        id={room.id}
                        name={room.data.name}
                    />
                ))}
            </div>
        </div>
    ) 
}

export default Sidebar
