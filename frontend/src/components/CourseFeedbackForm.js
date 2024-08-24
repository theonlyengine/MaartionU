import React, { useState } from 'react';
import axios from 'axios';

const CourseFeedbackForm = ({ courseId }) => {
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState('');

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/feedback/submit', { courseId, rating, feedback }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Feedback submitted successfully!');
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <form onSubmit={handleSubmitFeedback}>
            <label>Rating (1-5):</label>
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" required />
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Your feedback" required />
            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default CourseFeedbackForm;
