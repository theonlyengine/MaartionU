import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [botResponse, setBotResponse] = useState('');

    const handleChat = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/llm/chat', { userInput });
            setBotResponse(response.data.response);
        } catch (error) {
            console.error('Error with chatbot:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleChat}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask me anything"
                    required
                />
                <button type="submit">Send</button>
            </form>
            {botResponse && <div><h3>Response:</h3><p>{botResponse}</p></div>}
        </div>
    );
};

export default ChatBot;
