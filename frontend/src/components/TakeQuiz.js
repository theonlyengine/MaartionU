import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TakeQuiz = ({ quizId }) => {
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchQuiz = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`/api/quizzes/quiz/${quizId}`, config);
            setQuiz(response.data);
        };
        fetchQuiz();
    }, [quizId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            // Submit answers logic here
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    return (
        <div>
            {quiz && (
                <form onSubmit={handleSubmit}>
                    <h2>{quiz.title}</h2>
                    {quiz.questions.map((question, index) => (
                        <div key={index}>
                            <p>{question.text}</p>
                            {/* Render options here */}
                        </div>
                    ))}
                    <button type="submit">Submit Quiz</button>
                </form>
            )}
        </div>
    );
};

export default TakeQuiz;
