import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InteractiveModuleDashboard = ({ courseId }) => {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/interactive/course/${courseId}/modules`, config);
            setModules(response.data);
        };
        fetchModules();
    }, [courseId]);

    return (
        <div>
            <h2>Interactive Learning Modules</h2>
            <ul>
                {modules.map((module) => (
                    <li key={module._id}>
                        <h3>{module.title}</h3>
                        <p>{module.description}</p>
                        <a href={`/module/${module._id}/activities`}>View Activities</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InteractiveModuleDashboard;
