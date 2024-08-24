import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MicroModuleDashboard = ({ courseId }) => {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/modules/course/${courseId}`, config);
            setModules(response.data);
        };
        fetchModules();
    }, [courseId]);

    return (
        <div>
            <h2>Micro-Modules</h2>
            <ul>
                {modules.map((module) => (
                    <li key={module._id}>
                        <h3>{module.title}</h3>
                        <p>{module.description}</p>
                        <p>Duration: {module.duration} minutes</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MicroModuleDashboard;
