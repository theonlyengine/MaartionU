import React, { useState } from 'react';
import axios from 'axios';

const AwardPointsForm = ({ courseId }) => {
    const [points, setPoints] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/gamification/award-points', { courseId, points }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPoints(0);
            alert('Points awarded successfully!');
        } catch (error) {
            console.error('Error awarding points:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} placeholder="Points" required />
            <button type="submit">Award Points</button>
        </form>
    );
};

export default AwardPointsForm;
