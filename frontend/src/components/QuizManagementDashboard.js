import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizManagementDashboard = ({ courseId }) => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/quizzes/course/${courseId}`, config);
            setQuizzes(response.data);
        };
        fetchQuizzes();
    }, [courseId]);

    return (
        <div>
            <h2>Manage Quizzes</h2>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <h3>{quiz.title}</h3>
                        <p>{quiz.questions.length} questions</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizManagementDashboard;
