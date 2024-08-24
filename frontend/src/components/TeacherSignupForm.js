import React, { useState } from 'react';
import axios from 'axios';

const TeacherSignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/register-teacher', { name, email, password });
            alert('Teacher registered successfully!');
        } catch (error) {
            console.error('Error registering teacher:', error);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign Up as Teacher</button>
        </form>
    );
};

export default TeacherSignupForm;
