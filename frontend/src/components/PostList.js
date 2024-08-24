import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = ({ threadId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/community/thread/${threadId}/posts`, config);
            setPosts(response.data);
        };
        fetchPosts();
    }, [threadId]);

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <p>{post.content}</p>
                        <p>Posted by: {post.user.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
