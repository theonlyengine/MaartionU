import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdaptiveLearningDashboard = ({ courseId }) => {
    const [recommendedContent, setRecommendedContent] = useState([]);
    const [currentDifficulty, setCurrentDifficulty] = useState('medium');

    useEffect(() => {
        const fetchRecommendedContent = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/adaptive-learning/recommended-content', {
                params: { courseId },
                ...config,
            });
            setRecommendedContent(response.data);
        };

        const fetchCurrentDifficulty = async () => {
            // This would require an endpoint to fetch the current difficulty level
            // Example:
            // const response = await axios.get('/api/adaptive-learning/current-difficulty', config);
            // setCurrentDifficulty(response.data.currentDifficulty);
            // Simulating fetch for now:
            setCurrentDifficulty('medium');
        };

        fetchRecommendedContent();
        fetchCurrentDifficulty();
    }, [courseId]);

    return (
        <div>
            <h2>Adaptive Learning Dashboard</h2>
            <p>Current Difficulty Level: {currentDifficulty}</p>
            <h3>Recommended Content</h3>
            <ul>
                {recommendedContent.map(content => (
                    <li key={content._id}>
                        <h4>{content.title}</h4>
                        <p>{content.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdaptiveLearningDashboard;
