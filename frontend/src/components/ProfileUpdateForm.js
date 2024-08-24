import React, { useState } from 'react';
import axios from 'axios';

const ProfileUpdateForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put('/api/auth/profile', { name, email }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Profile updated:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default ProfileUpdateForm;
