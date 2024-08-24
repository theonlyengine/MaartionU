import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportDashboard = ({ courseId }) => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/reports/course/${courseId}/reports`, config);
            setReports(response.data);
        };
        fetchReports();
    }, [courseId]);

    const generateReport = async (reportType) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`/api/reports/generate-${reportType}-report`, { courseId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReports([...reports, response.data]);
            alert(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully!`);
        } catch (error) {
            console.error(`Error generating ${reportType} report:`, error);
        }
    };

    return (
        <div>
            <h2>Analytics and Reports</h2>
            <button onClick={() => generateReport('progress')}>Generate Progress Report</button>
            <button onClick={() => generateReport('performance')}>Generate Performance Report</button>
            <ul>
                {reports.map((report) => (
                    <li key={report._id}>
                        <h3>{report.reportType.charAt(0).toUpperCase() + report.reportType.slice(1)} Report</h3>
                        <p>Generated on: {new Date(report.generatedAt).toLocaleDateString()}</p>
                        {/* Additional details can be displayed here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportDashboard;
