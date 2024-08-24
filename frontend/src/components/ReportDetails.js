import React from 'react';

const ReportDetails = ({ report }) => {
    return (
        <div>
            <h3>{report.reportType.charAt(0).toUpperCase() + report.reportType.slice(1)} Report Details</h3>
            <ul>
                {report.data.map((item, index) => (
                    <li key={index}>
                        {/* Display detailed report data */}
                        <p>User ID: {item.userId}</p>
                        {report.reportType === 'progress' && (
                            <>
                                <p>Progress: {item.progressPercentage}%</p>
                                <p>Last Accessed: {new Date(item.lastAccessed).toLocaleDateString()}</p>
                            </>
                        )}
                        {report.reportType === 'performance' && (
                            <>
                                <p>Activity Type: {item.activityType}</p>
                                <p>Duration: {item.duration} minutes</p>
                                <p>Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportDetails;
