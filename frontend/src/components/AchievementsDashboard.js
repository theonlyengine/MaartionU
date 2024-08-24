import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AchievementsDashboard = ({ userId }) => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/progress/user/${userId}/achievements`, config);
            setAchievements(response.data);
        };
        fetchAchievements();
    }, [userId]);

    return (
        <div>
            <h2>Your Achievements</h2>
            <ul>
                {achievements.map((achievement) => (
                    <li key={achievement._id}>
                        <h3>{achievement.title}</h3>
                        <p>{achievement.description}</p>
                        <p>Awarded on: {new Date(achievement.awardedAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AchievementsDashboard;
