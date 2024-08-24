import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExternalResourcesDashboard = () => {
    const [resources, setResources] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/external-resources/resources', config);
            setResources(response.data);
        };
        fetchResources();
    }, []);

    const filteredResources = resources.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>External Educational Resources</h2>
            <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredResources.map(resource => (
                    <li key={resource._id}>
                        <h3>{resource.title}</h3>
                        <p>{resource.description}</p>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">Access Resource</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExternalResourcesDashboard;
