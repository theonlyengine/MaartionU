import React, { useState } from 'react';
import axios from 'axios';

const SubmitGroupProjectForm = ({ projectId }) => {
    const [submission, setSubmission] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/projects/submit', { projectId, submission }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubmission('');
            alert('Project submitted successfully!');
        } catch (error) {
            console.error('Error submitting project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={submission} onChange={(e) => setSubmission(e.target.value)} placeholder="Enter submission link or details" required />
            <button type="submit">Submit Project</button>
        </form>
    );
};

export default SubmitGroupProjectForm;
