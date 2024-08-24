import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPreferencesForm = () => {
    const [learningStyle, setLearningStyle] = useState('visual');
    const [pacing, setPacing] = useState('medium');

    useEffect(() => {
        const fetchPreferences = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/accessibility/preferences', config); // Assuming preferences route is reused
            setLearningStyle(response.data.preferredLearningStyle);
            setPacing(response.data.preferredPacing);
        };
        fetchPreferences();
    }, []);

    const handleSavePreferences = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/accessibility/update-preferences', { preferredLearningStyle: learningStyle, preferredPacing: pacing }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Preferences updated successfully!');
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    return (
        <div>
            <h2>Update Your Learning Preferences</h2>
            <label>
                Learning Style:
                <select value={learningStyle} onChange={(e) => setLearningStyle(e.target.value)}>
                    <option value="visual">Visual</option>
                    <option value="auditory">Auditory</option>
                    <option value="kinesthetic">Kinesthetic</option>
                </select>
            </label>
            <label>
                Pacing:
                <select value={pacing} onChange={(e) => setPacing(e.target.value)}>
                    <option value="fast">Fast</option>
                    <option value="medium">Medium</option>
                    <option value="slow">Slow</option>
                </select>
            </label>
            <button onClick={handleSavePreferences}>Save Preferences</button>
        </div>
    );
};

export default UserPreferencesForm;
