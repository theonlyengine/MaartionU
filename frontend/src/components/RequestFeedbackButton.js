import React from 'react';
import axios from 'axios';

const RequestFeedbackButton = ({ courseId, moduleId, userId }) => {
    const handleRequestFeedback = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/feedback', { courseId, moduleId, userId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Feedback and assessment generated successfully!');
        } catch (error) {
            console.error('Error generating feedback:', error);
        }
    };

    return (
        <button onClick={handleRequestFeedback}>
            Request Feedback
        </button>
    );
};

export default RequestFeedbackButton;
