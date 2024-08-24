import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThreadList = ({ forumId }) => {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const fetchThreads = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/community/forum/${forumId}/threads`, config);
            setThreads(response.data);
        };
        fetchThreads();
    }, [forumId]);

    return (
        <div>
            <h2>Threads</h2>
            <ul>
                {threads.map((thread) => (
                    <li key={thread._id}>
                        <h3>{thread.title}</h3>
                        <p>Created by: {thread.user.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThreadList;
