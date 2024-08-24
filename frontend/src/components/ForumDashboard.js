import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ForumDashboard = () => {
    const [forums, setForums] = useState([]);

    useEffect(() => {
        const fetchForums = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/community/forums', config);
            setForums(response.data);
        };
        fetchForums();
    }, []);

    return (
        <div>
            <h2>Forums</h2>
            <ul>
                {forums.map((forum) => (
                    <li key={forum._id}>
                        <h3>{forum.title}</h3>
                        <p>{forum.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ForumDashboard;
