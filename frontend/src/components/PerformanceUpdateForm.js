import React, { useState } from 'react';
import axios from 'axios';

const PerformanceUpdateForm = ({ courseId, sessionId }) => {
    const [performance, setPerformance] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/adaptive-learning/update-performance', {
                courseId,
                sessionId,
                performance,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Performance updated successfully!');
        } catch (error) {
            console.error('Error updating performance:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Performance Score (0-100):</label>
            <input
                type="number"
                value={performance}
                onChange={(e) => setPerformance(e.target.value)}
                min="0"
                max="100"
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default PerformanceUpdateForm;
