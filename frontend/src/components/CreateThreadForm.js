import React, { useState } from 'react';
import axios from 'axios';

const CreateThreadForm = ({ forumId }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/community/create-thread', { forumId, title }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            alert('Thread created successfully!');
        } catch (error) {
            console.error('Error creating thread:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Thread Title" required />
            <button type="submit">Create Thread</button>
        </form>
    );
};

export default CreateThreadForm;
