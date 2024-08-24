import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlatformAnalyticsDashboard = () => {
    const [platformReport, setPlatformReport] = useState([]);

    useEffect(() => {
        const fetchPlatformReport = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/analytics/platform-report', config);
            setPlatformReport(response.data);
        };
        fetchPlatformReport();
    }, []);

    return (
        <div>
            <h2>Platform Analytics</h2>
            <ul>
                {platformReport.map(report => (
                    <li key={report._id}>
                        <p>Activity Type: {report._id}</p>
                        <p>Count: {report.count}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlatformAnalyticsDashboard;
