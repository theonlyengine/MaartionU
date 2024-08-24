import React, { useState } from 'react';
import axios from 'axios';

const CreateActivityForm = ({ moduleId }) => {
    const [type, setType] = useState('quiz');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/interactive/add-activity', {
                moduleId,
                type,
                title,
                content,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setType('quiz');
            setTitle('');
            setContent({});
            alert('Activity created successfully!');
        } catch (error) {
            console.error('Error creating activity:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="quiz">Quiz</option>
                <option value="simulation">Simulation</option>
                <option value="exercise">Exercise</option>
            </select>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Activity Title" required />
            <textarea value={JSON.stringify(content)} onChange={(e) => setContent(JSON.parse(e.target.value))} placeholder="Activity Content" required />
            <button type="submit">Create Activity</button>
        </form>
    );
};

export default CreateActivityForm;
