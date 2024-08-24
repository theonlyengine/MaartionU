import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/feedback', { feedback }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Feedback submitted successfully!');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your feedback"
            />
            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default FeedbackForm;
