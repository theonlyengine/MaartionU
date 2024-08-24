import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Thread = ({ threadId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/forums/thread/${threadId}/posts`, config);
            setPosts(response.data);
        };
        fetchPosts();
    }, [threadId]);

    return (
        <div>
            <h2>Thread</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        {post.author.name}: {post.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Thread;
