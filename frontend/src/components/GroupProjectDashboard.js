import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupProjectDashboard = ({ courseId }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/projects/course/${courseId}`, config);
            setProjects(response.data);
        };
        fetchProjects();
    }, [courseId]);

    return (
        <div>
            <h2>Group Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p>Group Members: {project.groupMembers.map(member => member.name).join(', ')}</p>
                        {project.submission && (
                            <>
                                <p>Submitted on: {new Date(project.submissionDate).toLocaleDateString()}</p>
                                <p>Feedback: {project.feedback}</p>
                                <p>Grade: {project.grade}</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupProjectDashboard;
