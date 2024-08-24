import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAchievements = () => {
    const [achievements, setAchievements] = useState(null);

    useEffect(() => {
        const fetchAchievements = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/achievements', config);
            setAchievements(response.data);
        };
        fetchAchievements();
    }, []);

    return (
        <div>
            <h2>Your Achievements</h2>
            {achievements && (
                <div>
                    <h3>Badges</h3>
                    <ul>
                        {achievements.badges.map((badge) => (
                            <li key={badge._id}>
                                <img src={badge.icon} alt={badge.name} />
                                {badge.name}: {badge.description}
                            </li>
                        ))}
                    </ul>
                    <h3>Points: {achievements.points}</h3>
                </div>
            )}
        </div>
    );
};

export default UserAchievements;
