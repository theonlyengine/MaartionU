import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecommendationDashboard = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/recommendation/recommendations', config);
            setRecommendations(response.data);
        };
        fetchRecommendations();
    }, []);

    return (
        <div>
            <h2>Recommended for You</h2>
            <ul>
                {recommendations.map((item) => (
                    <li key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">View Content</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendationDashboard;
