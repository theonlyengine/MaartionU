import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProgressDashboard = ({ courseId }) => {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        const fetchProgress = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/analytics/course/${courseId}`, config);
            setProgress(response.data);
        };
        fetchProgress();
    }, [courseId]);

    return (
        <div>
            <h2>Your Progress</h2>
            <ul>
                {progress.map((item) => (
                    <li key={item.module._id}>
                        {item.module.name}: {item.progressPercentage}% (Last accessed: {new Date(item.lastAccessed).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentProgressDashboard;
