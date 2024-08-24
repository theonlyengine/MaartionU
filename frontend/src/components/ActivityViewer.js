import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityViewer = ({ moduleId }) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/interactive/module/${moduleId}/activities`, config);
            setActivities(response.data);
        };
        fetchActivities();
    }, [moduleId]);

    return (
        <div>
            <h2>Activities</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        <h3>{activity.title}</h3>
                        {activity.type === 'quiz' && <p>Quiz Content: {activity.content.questions}</p>}
                        {activity.type === 'simulation' && <p>Simulation Content: {activity.content.scenario}</p>}
                        {activity.type === 'exercise' && <p>Exercise Content: {activity.content.instructions}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityViewer;
