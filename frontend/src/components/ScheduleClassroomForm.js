import React, { useState } from 'react';
import axios from 'axios';

const ScheduleClassroomForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [duration, setDuration] = useState(60);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/virtual-classroom/schedule', {
                title,
                description,
                scheduledTime,
                duration,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Virtual classroom scheduled successfully!');
            setTitle('');
            setDescription('');
            setScheduledTime('');
            setDuration(60);
        } catch (error) {
            console.error('Error scheduling virtual classroom:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Classroom Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Classroom Description"
                required
            />
            <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
            />
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration (minutes)"
                required
            />
            <button type="submit">Schedule Classroom</button>
        </form>
    );
};

export default ScheduleClassroomForm;
