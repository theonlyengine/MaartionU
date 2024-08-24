import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupDashboard = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/social/user-groups', config);
            setGroups(response.data);
        };
        fetchGroups();
    }, []);

    return (
        <div>
            <h2>Your Groups</h2>
            <ul>
                {groups.map((group) => (
                    <li key={group._id}>
                        <h3>{group.name}</h3>
                        <p>{group.description}</p>
                        <a href={`/group/${group._id}/posts`}>View Posts</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupDashboard;
