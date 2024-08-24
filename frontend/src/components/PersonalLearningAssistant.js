import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonalLearningAssistant = () => {
    const [recommendations, setRecommendations] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const fetchRecommendations = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/assistant/recommendations', config);
            setRecommendations(response.data.recommendations);
        };
        fetchRecommendations();
    }, []);

    const handleAskQuestion = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/assistant/ask', { question }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <div>
            <h2>Your Personal Learning Assistant</h2>
            <h3>Recommendations</h3>
            <p>{recommendations}</p>
            <h3>Ask a Question</h3>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Type your question here" />
            <button onClick={handleAskQuestion}>Ask</button>
            {answer && (
                <div>
                    <h3>Answer</h3>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default PersonalLearningAssistant;
