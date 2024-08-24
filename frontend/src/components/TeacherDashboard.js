import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/courses', config);
            setCourses(response.data);
        };
        fetchCourses();
    }, []);

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/courses/create', { title, description }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCourses([...courses, response.data]);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div>
            <h2>Teacher Dashboard</h2>
            <form onSubmit={handleCreateCourse}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Course Description" required />
                <button type="submit">Create Course</button>
            </form>

            <h3>Your Courses</h3>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>{course.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherDashboard;
