import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GlobalAnalyticsReport = () => {
    const [report, setReport] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchGlobalReport = async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('/api/analytics/global-report', { params: { startDate, endDate }, ...config });
        setReport(response.data);
    };

    useEffect(() => {
        if (startDate && endDate) {
            fetchGlobalReport();
        }
    }, [startDate, endDate]);

    return (
        <div>
            <h2>Global Analytics Report</h2>
            <div>
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </label>
            </div>
            <ul>
                {report.map((entry) => (
                    <li key={entry._id}>
                        <p>Action: {entry.action}</p>
                        <p>Date: {new Date(entry.timestamp).toLocaleString()}</p>
                        {entry.details && <p>Details: {JSON.stringify(entry.details)}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GlobalAnalyticsReport;
