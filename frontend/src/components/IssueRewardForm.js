import React, { useState } from 'react';
import axios from 'axios';

const IssueRewardForm = () => {
    const [type, setType] = useState('discount');
    const [details, setDetails] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/gamification/issue-reward', { type, details }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setType('discount');
            setDetails('');
            alert('Reward issued successfully!');
        } catch (error) {
            console.error('Error issuing reward:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="discount">Discount</option>
                <option value="gift">Gift</option>
                <option value="certificate">Certificate</option>
            </select>
            <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Reward Details" required />
            <button type="submit">Issue Reward</button>
        </form>
    );
};

export default IssueRewardForm;
