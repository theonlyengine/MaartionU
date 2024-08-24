import React, { useState } from 'react';
import axios from 'axios';

const CreatePostForm = ({ groupId }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/social/create-post', { groupId, content }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContent('');
            alert('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" required />
            <button type="submit">Post</button>
        </form>
    );
};

export default CreatePostForm;
