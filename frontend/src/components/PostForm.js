import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ threadId }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/forums/post', { threadId, content }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContent('');
        } catch (error) {
            console.error('Error posting message:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post..." required />
            <button type="submit">Post</button>
        </form>
    );
};

export default PostForm;
