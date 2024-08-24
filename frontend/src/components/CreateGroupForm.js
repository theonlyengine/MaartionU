import React, { useState } from 'react';
import axios from 'axios';

const CreateGroupForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/social/create-group', { name, description }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setName('');
            setDescription('');
            alert('Group created successfully!');
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Group Name" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Group Description" required />
            <button type="submit">Create Group</button>
        </form>
    );
};

export default CreateGroupForm;
