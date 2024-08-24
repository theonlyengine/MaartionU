import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherCourseFeedback = ({ courseId }) => {
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        const fetchFeedbackData = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/feedback/course/${courseId}`, config);
            setFeedbackData(response.data);
        };
        fetchFeedbackData();
    }, [courseId]);

    return (
        <div>
            <h2>Course Feedback</h2>
            <ul>
                {feedbackData.map((item) => (
                    <li key={item._id}>
                        {item.student.name} rated {item.rating}/5: {item.feedback}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherCourseFeedback;
