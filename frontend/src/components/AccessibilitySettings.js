import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccessibilitySettings = () => {
    const [language, setLanguage] = useState('en');
    const [fontSize, setFontSize] = useState('medium');
    const [colorContrast, setColorContrast] = useState('normal');

    useEffect(() => {
        const fetchPreferences = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/accessibility/preferences', config);
            const prefs = response.data;
            setLanguage(prefs.language);
            setFontSize(prefs.fontSize);
            setColorContrast(prefs.colorContrast);
        };
        fetchPreferences();
    }, []);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/accessibility/update-preferences', { language, fontSize, colorContrast }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Accessibility preferences updated!');
        } catch (error) {
            console.error('Error updating accessibility preferences:', error);
        }
    };

    return (
        <div>
            <h2>Accessibility Settings</h2>
            <label>
                Language:
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    {/* Add more languages as needed */}
                </select>
            </label>
            <label>
                Font Size:
                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </label>
            <label>
                Color Contrast:
                <select value={colorContrast} onChange={(e) => setColorContrast(e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                </select>
            </label>
            <button onClick={handleSave}>Save Preferences</button>
        </div>
    );
};

export default AccessibilitySettings;
