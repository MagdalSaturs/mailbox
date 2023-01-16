import React, { useEffect } from 'react';
import './Messages.scss';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Messages = () => {
    const [messages, setMessages] = React.useState([]);
    const token = sessionStorage.getItem('token');
    const titleRef = React.createRef();
    const reciverRef = React.createRef();
    const contentRef = React.createRef();

    const sendMessage = async (e) => {
        e.preventDefault();
        
        const title = titleRef.current.value,
              sender = sessionStorage.getItem('username'),
              reciver = reciverRef.current.value,
              content = contentRef.current.value

        const data = { title, sender, reciver, content, read: false };

        const response = await axios.post('/api/add/message', data ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response.data)

        if (response.data.success) {
            console.log('Wysłano email')
            getMessages();
            document.getElementById('form').reset();
        }
        else {
            alert('Nie udało się wysłać emaila')
        }
    };

    const getMessages = async () => {
        const response = await axios.get('/api/messages?token=' + token);

        if (response.data.success) {
            setMessages(response.data.messages);
        }
    };

    useEffect(() => {
        getMessages();
    }, []);

    const unread = () => {
        const unreadMessages = messages.filter(message => message.read === false);
        setMessages(unreadMessages);
    };

    const read = () => {
        const readMessages = messages.filter(message => message.read === true);
        setMessages(readMessages);
    };

    const send = () => {
        const sendMessages = messages.filter(message => message.sender === sessionStorage.getItem('username'));
        setMessages(sendMessages);
    };

    const readMessage = async (id) => {
        const data = { id };

        try {
            const response = await axios.post('/api/read/message', data);

            if (response.data.success) {
                getMessages();
            }
        } catch (error) {
            alert('Nie udało się oznaczyć emaila jako przeczytanego');
        }
    };

    const deleteMessage = async (id) => {
        const data = { id };

        try {
            const response = await axios.post('/api/delete/message', data);

            if (response.data.success) {
                getMessages();
            }
        } catch (error) {
            alert('Nie udało się usunąć emaila');
        }
    };

    return (
        <div className="messages">
            <h1>Messages</h1>
            <form>
                <h1>Write</h1>
                <input ref={titleRef} placeholder='Title' type='text'></input>
                <input ref={reciverRef} placeholder='Reciver' type='text'></input>
                <input ref={contentRef} className='content' placeholder='Content' type='text'></input>
                <button onClick={e => sendMessage(e)}>Send</button>
            </form>

            <div className='filters'>
                <button onClick={getMessages}>All</button>
                <button onClick={unread}>Unread</button>
                <button onClick={read}>Read</button>
                <button onClick={send}>Send</button>
            </div>

            <div className='messages-list'>
                {messages.map(message => {
                    return (
                        <div className='message' key={message.content}>
                            <p>{message._id}</p>
                            <p>{message.title}</p>
                            <p>{message.content}</p>
                            <p>{message.read ? 'Read' : 'Unread'}</p>
                            <button onClick={() => readMessage(message._id)}>Read</button>
                            <button className='delete' onClick={() => deleteMessage(message._id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Messages;