import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoSessionScheduler = ({ courseId }) => {
    const [startTime, setStartTime] = useState('');
    const [participants, setParticipants] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/communication/course/${courseId}/participants`, config);
            setParticipants(response.data);
        };
        fetchParticipants();
    }, [courseId]);

    const handleScheduleSession = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/communication/schedule-video-session', {
                courseId,
                startTime,
                participantIds: selectedParticipants,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Video session scheduled successfully!');
        } catch (error) {
            console.error('Error scheduling video session:', error);
        }
    };

    return (
        <div>
            <h2>Schedule a Video Session</h2>
            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
            />
            <label>Select Participants:</label>
            <select
                multiple
                value={selectedParticipants}
                onChange={(e) => setSelectedParticipants([...e.target.selectedOptions].map(option => option.value))}
            >
                {participants.map((participant) => (
                    <option key={participant._id} value={participant._id}>{participant.name}</option>
                ))}
            </select>
            <button onClick={handleScheduleSession}>Schedule Session</button>
        </div>
    );
};

export default VideoSessionScheduler;
