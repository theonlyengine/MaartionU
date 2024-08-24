import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CredentialDashboard = ({ userId }) => {
    const [credentials, setCredentials] = useState([]);

    useEffect(() => {
        const fetchCredentials = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/credentials/user/${userId}`, config);
            setCredentials(response.data);
        };
        fetchCredentials();
    }, [userId]);

    return (
        <div>
            <h2>Your Credentials</h2>
            <ul>
                {credentials.map((credential) => (
                    <li key={credential._id}>
                        <p>Course: {credential.course.title}</p>
                        <a href={credential.certificateURL} target="_blank" rel="noopener noreferrer">View Certificate</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CredentialDashboard;
