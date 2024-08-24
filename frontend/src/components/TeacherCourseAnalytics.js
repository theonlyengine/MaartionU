import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherCourseAnalytics = ({ courseId }) => {
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        const fetchProgressData = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/analytics/teacher/course/${courseId}`, config);
            setProgressData(response.data);
        };
        fetchProgressData();
    }, [courseId]);

    return (
        <div>
            <h2>Class Progress</h2>
            <ul>
                {progressData.map((item) => (
                    <li key={item._id}>
                        {item.student.name}: {item.progressPercentage}% (Module: {item.module.name}, Last accessed: {new Date(item.lastAccessed).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherCourseAnalytics;
