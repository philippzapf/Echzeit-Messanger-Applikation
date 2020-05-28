import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

let socket;


const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost: 5000';

    useEffect(() => {
      const { name, room } = queryString.parse(location.search);
  
      socket = io(ENDPOINT);
  
      setRoom(room);
      setName(name)
  
      socket.emit('join', { name, room }, (error) => {

      });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
      socket.on('message', (message) => {
        setMessages(messages => [ ...messages, message ]);
      });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message,messages);

  return (
    <div className="outerContainer">
      <div className="container">
          <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}/>
      </div>
    </div>
  );
}

export default Chat;