import React, { useEffect } from 'react';
import axios from 'axios';

const ActivityLogger = ({ courseId, moduleId, activityType, duration, additionalData }) => {
    useEffect(() => {
        const logActivity = async () => {
            const token = localStorage.getItem('token');
            try {
                await axios.post('/api/analytics/log-activity', { courseId, moduleId, activityType, duration, additionalData }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Error logging activity:', error);
            }
        };

        logActivity();
    }, [courseId, moduleId, activityType, duration, additionalData]);

    return null;
};

export default ActivityLogger;
