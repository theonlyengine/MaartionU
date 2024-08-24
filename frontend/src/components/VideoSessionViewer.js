import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoSessionViewer = ({ courseId }) => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/communication/course/${courseId}/video-sessions`, config);
            setSessions(response.data);
        };
        fetchSessions();
    }, [courseId]);

    return (
        <div>
            <h2>Video Sessions</h2>
            <ul>
                {sessions.map((session) => (
                    <li key={session._id}>
                        <p>Host: {session.host.name}</p>
                        <p>Start Time: {new Date(session.startTime).toLocaleString()}</p>
                        <p>Participants: {session.participants.map((participant) => participant.name).join(', ')}</p>
                        <a href={`/video-session/${session._id}`} target="_blank" rel="noopener noreferrer">Join Session</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VideoSessionViewer;
