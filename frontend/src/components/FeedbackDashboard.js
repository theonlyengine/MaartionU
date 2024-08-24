import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackDashboard = ({ courseId, userId }) => {
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        const fetchAssessments = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/feedback/assessments/${courseId}/${userId}`, config);
            setAssessments(response.data);
        };
        fetchAssessments();
    }, [courseId, userId]);

    return (
        <div>
            <h2>Your Feedback</h2>
            <ul>
                {assessments.map((assessment, index) => (
                    <li key={index}>
                        <p>Date: {new Date(assessment.date).toLocaleDateString()}</p>
                        <p>Feedback: {assessment.feedback}</p>
                        <p>Score: {assessment.score}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedbackDashboard;
