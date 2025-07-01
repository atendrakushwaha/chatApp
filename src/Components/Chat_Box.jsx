import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage, addSocketMessage } from '../features/chat/chatSlice';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat_Box = ({ user: receiver }) => {
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const chatRef = useRef();

  useEffect(() => {
    dispatch(fetchMessages(receiver._id));
    socket.emit('register', user._id);
  }, [receiver, dispatch, user._id]);

  useEffect(() => {
    socket.on('private message', (data) => {
      dispatch(addSocketMessage(data));
    });
    return () => socket.off('private message');
  }, [dispatch]);

  const handleSend = () => {
    if (!message.trim()) return;
    dispatch(sendMessage({ receiverId: receiver._id, message }));
    socket.emit('private message', {
      senderId: user._id,
      receiverId: receiver._id,
      message,
    });
    setMessage('');
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="flex flex-col h-[85vh] w-full bg-gray-50">
      <div className="bg-indigo-600 text-white px-4 py-3 text-lg font-semibold">Chat with {receiver.username}</div>
      <div ref={chatRef} className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((m, idx) => (
          <div key={idx} className={m.senderId === user._id ? 'text-right' : 'text-left'}>
            <div className={`${m.senderId === user._id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} inline-block px-4 py-2 rounded-2xl text-sm max-w-xs break-words`}>
              {m.message}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700">Send</button>
      </div>
    </div>
  );
};

export default Chat_Box;
