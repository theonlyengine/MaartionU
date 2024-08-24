import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserActivityDashboard = () => {
    const [activityReport, setActivityReport] = useState([]);

    useEffect(() => {
        const fetchActivityReport = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/analytics/user-report', config);
            setActivityReport(response.data);
        };
        fetchActivityReport();
    }, []);

    return (
        <div>
            <h2>Your Activity Report</h2>
            <ul>
                {activityReport.map(activity => (
                    <li key={activity._id}>
                        <p>Type: {activity.activityType}</p>
                        <p>Details: {JSON.stringify(activity.activityDetails)}</p>
                        <p>Date: {new Date(activity.timestamp).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserActivityDashboard;
