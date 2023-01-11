import React, { useEffect } from 'react';
import './Messages.scss';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Messages = () => {
    const [messages, setMessages] = React.useState([]);
    const token = sessionStorage.getItem('token');

    const getMessages = async () => {
        const response = await axios.get('/api/messages?token=' + sessionStorage.getItem('token'));

        if (response.data.success) {
            setMessages(response.data.messages);
        }
    };

    useEffect(() => {
        getMessages();
    }, []);

    const unread = () => {
        
    };

    return (
        <div className="messages">
            <h1>Messages</h1>
            <form>
                <h1>Write</h1>
                <input placeholder='Title' type='text'></input>
                <input placeholder='To' type='text'></input>
                <input className='content' placeholder='Content' type='text'></input>
                <button>Send</button>
            </form>

            <div className='filters'>
                <button onClick={unread}>Unread</button>
                <button>Read</button>
            </div>

            <div className='messages-list'>
                {messages.map(message => {
                    return (
                        <div className='message'>
                            <p>{message._id}</p>
                            <p>{message.name}</p>
                            <p>{message.message}</p>
                            <button>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Messages;