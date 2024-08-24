import React, { useState } from 'react';
import axios from 'axios';

const CreateMicroModuleForm = ({ courseId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [duration, setDuration] = useState('');
    const [order, setOrder] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/modules/create', { courseId, title, description, content, duration, order }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            setDescription('');
            setContent('');
            setDuration('');
            setOrder('');
            alert('Micro-module created successfully!');
        } catch (error) {
            console.error('Error creating micro-module:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Module Title" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Module Description" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Module Content" required />
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (minutes)" required />
            <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} placeholder="Module Order" required />
            <button type="submit">Create Module</button>
        </form>
    );
};

export default CreateMicroModuleForm;
