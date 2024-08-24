import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectDashboard = ({ courseId }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/collaboration/course/${courseId}/projects`, config);
            setProjects(response.data);
        };
        fetchProjects();
    }, [courseId]);

    return (
        <div>
            <h2>Collaborative Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p>Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>
                        <p>Members: {project.members.map((member) => member.name).join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectDashboard;
