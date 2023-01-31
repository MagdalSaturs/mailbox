import React, { useEffect } from "react";
import "./Messages.scss";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = React.useState([]);
  const [userEmails, setUserEmails] = React.useState([]);
  const token = sessionStorage.getItem("token");
  const titleRef = React.createRef();
  const reciverRef = React.createRef();
  const contentRef = React.createRef();

  const sendMessage = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value,
      reciver = reciverRef.current.value,
      content = contentRef.current.value;

    const data = { title, reciver, content, read: false, token };

    console.log(data);

    const response = await axios.post("/api/add/message", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    if (response.data.success) {
      getMessages();
      document.getElementById("form").reset();
    } else {
      alert("Nie udało się wysłać emaila");
    }
  };

  const getMessages = async () => {
    const response = await axios.get("/api/messages?token=" + token);

    if (response.data.success) {
      setMessages(response.data.messages);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const read = () => {
    const unreadMessages = messages.filter((message) => message.read === true);
    setMessages(unreadMessages);
  };

  const send = async () => {
    const response = await axios.get("/api/send/messages?token=" + token);

    if (response.data.success) {
      setMessages(response.data.messages);
    }
  };

  const readMessage = async (id) => {
    const data = { id };

    try {
      const response = await axios.post("/api/read/message", data);

      if (response.data.success) {
        getMessages();
      }
    } catch (error) {
      alert("Nie udało się oznaczyć emaila jako przeczytanego");
    }
  };

  const deleteMessage = async (id) => {
    const data = { id };

    try {
      const response = await axios.post("/api/delete/message", data);

      if (response.data.success) {
        getMessages();
      }
    } catch (error) {
      alert("Nie udało się usunąć emaila");
    }
  };

  useEffect(() => {
    const getEmails = async () => {
      try {
        const response = await axios.get("/api/get/emails");

        if (response.data.success) {
          setUserEmails(response.data.emails);
        }
      } catch (error) {
        console.log("Nie udało się wybrać emaila");
      }
    };
    getEmails();
  }, []);

  return (
    <>
      <h1>Messages</h1>
      <div id="formDiv" className="form">
        <form id="form">
          <h1>Write</h1>
          <spam></spam>
          <input ref={titleRef} placeholder="Title" type="text"></input>
          <select ref={reciverRef}>
            {userEmails.map((user) => {
              return <option>{user}</option>;
            })}
          </select>
          <textarea
            ref={contentRef}
            className="content"
            placeholder="Content"
            type="text"
          ></textarea>
          <button onClick={(e) => sendMessage(e)}>Send</button>
        </form>
      </div>

      <div className="rightDiv">
        <div className="filters">
          <button onClick={getMessages}>All</button>
          <button onClick={read}>Read</button>
          <button onClick={send}>Send</button>
        </div>

        <div className="messages-list">
          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td>Content</td>
                <td>Read?</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => {
                return (
                  <tr key={index}>
                    <td>{message.title}</td>
                    <td>{message.content}</td>
                    <td>{message.read ? "Read" : "Unread"}</td>
                    <td>
                      <button onClick={() => readMessage(message._id)}>
                        Read
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteMessage(message)}>
                        Delate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Messages;
