import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ARVRContentViewer = ({ moduleId }) => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchContent = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/arvr/module/${moduleId}`, config);
            setContent(response.data);
        };
        fetchContent();
    }, [moduleId]);

    return (
        <div>
            <h2>AR/VR Content</h2>
            <ul>
                {content.map((item) => (
                    <li key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <a href={item.contentURL} target="_blank" rel="noopener noreferrer">
                            {item.contentType === 'AR' ? 'View in AR' : 'View in VR'}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ARVRContentViewer;
