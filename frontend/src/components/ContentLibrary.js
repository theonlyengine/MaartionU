import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContentLibrary = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/content/categories', config);
            setCategories(response.data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const fetchContent = async () => {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get(`/api/content/category/${selectedCategory}`, config);
                setContent(response.data);
            };
            fetchContent();
        }
    }, [selectedCategory]);

    return (
        <div>
            <h2>Content Library</h2>
            <label>
                Select Category:
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Select</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </label>
            <div>
                {content.map((item) => (
                    <div key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">View Content</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentLibrary;
