import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateLearningPathForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/courses', config); // Assuming there's an endpoint to fetch all courses
            setCourses(response.data);
        };
        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/learning-path/create-path', {
                title,
                description,
                courseIds: selectedCourses,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            setDescription('');
            setSelectedCourses([]);
            alert('Learning path created successfully!');
        } catch (error) {
            console.error('Error creating learning path:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Path Title" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Path Description" required />
            <label>Select Courses:</label>
            <select
                multiple
                value={selectedCourses}
                onChange={(e) => setSelectedCourses([...e.target.selectedOptions].map(option => option.value))}
            >
                {courses.map((course) => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                ))}
            </select>
            <button type="submit">Create Learning Path</button>
        </form>
    );
};

export default CreateLearningPathForm;
