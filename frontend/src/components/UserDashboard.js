import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [progress, setProgress] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [interactions, setInteractions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const progressRes = await axios.get('/api/user/progress', config);
            const rewardsRes = await axios.get('/api/user/rewards', config);
            const interactionsRes = await axios.get('/api/user/interactions', config);
            setProgress(progressRes.data);
            setRewards(rewardsRes.data);
            setInteractions(interactionsRes.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>User Dashboard</h2>
            <div>
                <h3>Progress</h3>
                <ul>
                    {progress.map((item, index) => (
                        <li key={index}>{item.name}: {item.percentage}%</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Rewards</h3>
                <ul>
                    {rewards.map((reward, index) => (
                        <li key={index}>{reward.name}: {reward.points} points</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Social Interactions</h3>
                <ul>
                    {interactions.map((interaction, index) => (
                        <li key={index}>{interaction.user}: {interaction.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserDashboard;
