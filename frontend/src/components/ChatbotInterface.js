import React, { useState } from 'react';
import axios from 'axios';

const ChatbotInterface = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleAskQuestion = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/chatbot/ask', { question }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error('Error interacting with chatbot:', error);
        }
    };

    return (
        <div>
            <h2>Ask the Chatbot</h2>
            <form onSubmit={handleAskQuestion}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    required
                />
                <button type="submit">Ask</button>
            </form>
            {answer && (
                <div>
                    <h3>Answer:</h3>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default ChatbotInterface;
