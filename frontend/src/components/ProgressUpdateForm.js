import React, { useState } from 'react';
import axios from 'axios';

const ProgressUpdateForm = ({ courseId }) => {
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const [milestones, setMilestones] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/progress/update-progress', {
                courseId,
                completionPercentage,
                milestones,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Progress updated successfully!');
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={completionPercentage}
                onChange={(e) => setCompletionPercentage(e.target.value)}
                placeholder="Completion Percentage"
                required
            />
            <textarea
                value={milestones.join(', ')}
                onChange={(e) => setMilestones(e.target.value.split(', '))}
                placeholder="Milestones (comma-separated)"
                required
            />
            <button type="submit">Update Progress</button>
        </form>
    );
};

export default ProgressUpdateForm;
