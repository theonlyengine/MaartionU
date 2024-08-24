import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/auth/profile', config);
            setUser(response.data);
        };
        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default ProfilePage;
