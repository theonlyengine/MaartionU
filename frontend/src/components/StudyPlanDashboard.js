import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudyPlanDashboard = () => {
    const [studyPlans, setStudyPlans] = useState([]);

    useEffect(() => {
        const fetchStudyPlans = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get('/api/study-plan/user-plans', config);
            setStudyPlans(response.data);
        };
        fetchStudyPlans();
    }, []);

    return (
        <div>
            <h2>Your Personalized Study Plans</h2>
            <ul>
                {studyPlans.map((plan) => (
                    <li key={plan._id}>
                        <h3>{plan.title}</h3>
                        <p>Goals: {plan.goals.join(', ')}</p>
                        <h4>Recommended Courses:</h4>
                        <ul>
                            {plan.recommendedCourses.map(course => (
                                <li key={course._id}>{course.title}</li>
                            ))}
                        </ul>
                        <h4>Recommended Activities:</h4>
                        <ul>
                            {plan.recommendedActivities.map(activity => (
                                <li key={activity._id}>{activity.title}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudyPlanDashboard;
