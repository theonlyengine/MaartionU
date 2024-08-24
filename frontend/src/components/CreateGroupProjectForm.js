import React, { useState } from 'react';
import axios from 'axios';

const CreateGroupProjectForm = ({ courseId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/projects/create', { courseId, title, description }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            setDescription('');
            alert('Group project created successfully!');
        } catch (error) {
            console.error('Error creating group project:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project Title" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Project Description" required />
            <button type="submit">Create Project</button>
        </form>
    );
};

export default CreateGroupProjectForm;
