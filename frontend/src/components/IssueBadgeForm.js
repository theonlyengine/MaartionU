import React, { useState } from 'react';
import axios from 'axios';

const IssueBadgeForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/gamification/issue-badge', { name, description }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setName('');
            setDescription('');
            alert('Badge issued successfully!');
        } catch (error) {
            console.error('Error issuing badge:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Badge Name" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Badge Description" required />
            <button type="submit">Issue Badge</button>
        </form>
    );
};

export default IssueBadgeForm;
