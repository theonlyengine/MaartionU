import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadContentForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [type, setType] = useState('video');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/content/categories', config);
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/content/upload', { title, description, url, type, categoryId: selectedCategory }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            setDescription('');
            setUrl('');
            setType('video');
            setSelectedCategory('');
            alert('Content uploaded successfully!');
        } catch (error) {
            console.error('Error uploading content:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Content URL" required />
            <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="video">Video</option>
                <option value="article">Article</option>
                <option value="textbook">Textbook</option>
                <option value="external">External</option>
            </select>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            <button type="submit">Upload Content</button>
        </form>
    );
};

export default UploadContentForm;
