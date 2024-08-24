import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GamificationDashboard = () => {
    const [points, setPoints] = useState(0);
    const [badges, setBadges] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchGamificationData = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const pointsResponse = await axios.get('/api/gamification/user-gamification', config);
            setPoints(pointsResponse.data.points);
            setBadges(pointsResponse.data.badges);

            const leaderboardResponse = await axios.get('/api/gamification/leaderboard', config);
            setLeaderboard(leaderboardResponse.data);
        };
        fetchGamificationData();
    }, []);

    return (
        <div>
            <h2>Your Gamification Dashboard</h2>
            <p>Points: {points}</p>
            <h3>Badges</h3>
            <ul>
                {badges.map((badge) => (
                    <li key={badge._id}>
                        <h4>{badge.title}</h4>
                        <p>{badge.description}</p>
                        {badge.iconUrl && <img src={badge.iconUrl} alt={badge.title} />}
                    </li>
                ))}
            </ul>
            <h3>Leaderboard</h3>
            <ul>
                {leaderboard.map((entry, index) => (
                    <li key={entry._id}>
                        <p>Rank {index + 1}: {entry.user.name} - {entry.points} points</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GamificationDashboard;
