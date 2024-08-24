import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatInterface = ({ chatRoomId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/communication/chat-room/${chatRoomId}/messages`, config);
            setMessages(response.data);
        };
        fetchMessages();
    }, [chatRoomId]);

    const handleSendMessage = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/communication/send-message', { chatRoomId, message }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('');
            const response = await axios.get(`/api/communication/chat-room/${chatRoomId}/messages`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>{msg.sender.name}:</strong> {msg.message}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatInterface;
