import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LearningPathDashboard = () => {
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        const fetchPaths = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/learning-path/user-paths', config);
            setPaths(response.data);
        };
        fetchPaths();
    }, []);

    return (
        <div>
            <h2>Your Learning Paths</h2>
            <ul>
                {paths.map((path) => (
                    <li key={path._id}>
                        <h3>{path.learningPath.title}</h3>
                        <p>{path.learningPath.description}</p>
                        <p>Current Course: {path.currentCourse ? path.currentCourse.title : 'Completed'}</p>
                        <p>Completed Courses: {path.completedCourses.map(course => course.title).join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LearningPathDashboard;
