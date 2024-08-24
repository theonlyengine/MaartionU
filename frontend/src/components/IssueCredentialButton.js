import React from 'react';
import axios from 'axios';

const IssueCredentialButton = ({ courseId, userId }) => {
    const handleIssueCredential = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/credentials/issue', { courseId, userId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Credential issued successfully!');
        } catch (error) {
            console.error('Error issuing credential:', error);
        }
    };

    return (
        <button onClick={handleIssueCredential}>
            Issue Credential
        </button>
    );
};

export default IssueCredentialButton;
