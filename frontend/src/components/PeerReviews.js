import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PeerReviews = ({ userId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/reviews/reviews/${userId}`, config);
            setReviews(response.data);
        };
        fetchReviews();
    }, [userId]);

    return (
        <div>
            <h2>Peer Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review._id}>
                        {review.reviewer.name}: {review.feedback} (Rating: {review.rating})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PeerReviews;
