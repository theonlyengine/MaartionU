import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressDashboard = ({ courseId }) => {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        const fetchProgress = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/progress/user/${courseId}`, config);
            setProgress(response.data);
        };
        fetchProgress();
    }, [courseId]);

    return (
        <div>
            <h2>Your Progress</h2>
            <ul>
                {progress.map((item, index) => (
                    <li key={index}>
                        Module: {item.module.name} - {item.progressPercentage}% Complete
                        <br />
                        Recommendations: {item.recommendations.join(', ')}
                        <br />
                        Feedback: {item.feedback.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgressDashboard;
