import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VirtualClassroomDashboard = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [selectedClassroom, setSelectedClassroom] = useState(null);

    useEffect(() => {
        const fetchClassrooms = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/virtual-classroom/classrooms', config);
            setClassrooms(response.data);
        };
        fetchClassrooms();
    }, []);

    const handleClassroomSelect = async (classroomId) => {
        setSelectedClassroom(classroomId);
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('/api/virtual-classroom/sessions', {
            params: { classroomId },
            ...config,
        });
        setSessions(response.data);
    };

    return (
        <div>
            <h2>Virtual Classrooms</h2>
            <ul>
                {classrooms.map(classroom => (
                    <li key={classroom._id} onClick={() => handleClassroomSelect(classroom._id)}>
                        <h3>{classroom.title}</h3>
                        <p>{classroom.description}</p>
                        <p>Scheduled Time: {new Date(classroom.scheduledTime).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
            {selectedClassroom && (
                <div>
                    <h3>Live Sessions</h3>
                    <ul>
                        {sessions.map(session => (
                            <li key={session._id}>
                                <p>Start Time: {new Date(session.startTime).toLocaleString()}</p>
                                {session.endTime && <p>End Time: {new Date(session.endTime).toLocaleString()}</p>}
                                <a href={session.recordingUrl} target="_blank" rel="noopener noreferrer">Join/Watch Session</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default VirtualClassroomDashboard;
