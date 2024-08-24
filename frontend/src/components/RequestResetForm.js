import React, { useState } from 'react';
import axios from 'axios';

const RequestResetForm = () => {
    const [email, setEmail] = useState('');

    const handleRequest = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/reset-password', { email });
            console.log('Password reset link sent');
        } catch (error) {
            console.error('Error requesting password reset:', error);
        }
    };

    return (
        <form onSubmit={handleRequest}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <button type="submit">Request Password Reset</button>
        </form>
    );
};

export default RequestResetForm;
