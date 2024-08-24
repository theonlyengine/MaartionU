import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/achievements/leaderboard', config);
            setLeaderboard(response.data);
        };
        fetchLeaderboard();
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.map((entry, index) => (
                    <li key={index}>
                        {index + 1}. {entry.user.name}: {entry.points} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;