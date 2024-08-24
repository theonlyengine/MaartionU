import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressTracker = ({ userId }) => {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        const fetchProgress = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/progress/user/${userId}/progress`, config);
            setProgress(response.data);
        };
        fetchProgress();
    }, [userId]);

    return (
        <div>
            <h2>Your Learning Progress</h2>
            {progress.map((p) => (
                <div key={p._id}>
                    <h3>{p.course.title}</h3>
                    <p>Completion: {p.completionPercentage}%</p>
                    <p>Milestones Reached: {p.milestonesReached.join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default ProgressTracker;
