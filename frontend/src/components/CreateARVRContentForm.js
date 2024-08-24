import React, { useState } from 'react';
import axios from 'axios';

const CreateARVRContentForm = ({ courseId, moduleId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contentURL, setContentURL] = useState('');
    const [contentType, setContentType] = useState('AR');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/arvr/create', { courseId, moduleId, title, description, contentURL, contentType }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            setDescription('');
            setContentURL('');
            setContentType('AR');
            alert('AR/VR content created successfully!');
        } catch (error) {
            console.error('Error creating AR/VR content:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Content Title" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Content Description" required />
            <input type="url" value={contentURL} onChange={(e) => setContentURL(e.target.value)} placeholder="Content URL" required />
            <select value={contentType} onChange={(e) => setContentType(e.target.value)} required>
                <option value="AR">AR</option>
                <option value="VR">VR</option>
            </select>
            <button type="submit">Create Content</button>
        </form>
    );
};

export default CreateARVRContentForm;
