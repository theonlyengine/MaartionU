import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forum = ({ courseId }) => {
    const [forum, setForum] = useState(null);
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const fetchForumData = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const forumRes = await axios.get(`/api/forums/course/${courseId}`, config);
            const threadsRes = await axios.get(`/api/forums/forum/${forumRes.data._id}/threads`, config);
            setForum(forumRes.data);
            setThreads(threadsRes.data);
        };
        fetchForumData();
    }, [courseId]);

    return (
        <div>
            {forum && <h2>{forum.title}</h2>}
            <ul>
                {threads.map((thread) => (
                    <li key={thread._id}>{thread.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Forum;
