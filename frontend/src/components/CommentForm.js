import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ postId }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/social/comment', { postId, content }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContent('');
            alert('Comment added successfully!');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write a comment..." required />
            <button type="submit">Comment</button>
        </form>
    );
};

export default CommentForm;
