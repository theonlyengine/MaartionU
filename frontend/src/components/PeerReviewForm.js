import React, { useState } from 'react';
import axios from 'axios';

const PeerReviewForm = ({ projectId }) => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/collaboration/submit-review', {
                projectId,
                feedback,
                rating,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFeedback('');
            setRating(1);
            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Provide your feedback" required />
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)} required>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
            </select>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default PeerReviewForm;
