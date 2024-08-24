import React, { useState } from 'react';
import axios from 'axios';

const StartStudySession = ({ studyPlanId, courseId, activityId }) => {
    const [session, setSession] = useState(null);

    const handleStartSession = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/study-plan/start-session', {
                studyPlanId,
                courseId,
                activityId,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSession(response.data);
        } catch (error) {
            console.error('Error starting study session:', error);
        }
    };

    return (
        <div>
            <button onClick={handleStartSession}>Start Study Session</button>
            {session && (
                <div>
                    <h3>Session Started:</h3>
                    <p>Course: {session.course.title}</p>
                    {session.activity && <p>Activity: {session.activity.title}</p>}
                    <p>Progress: {session.progress}%</p>
                </div>
            )}
        </div>
    );
};

export default StartStudySession;
