import React, { useState } from 'react';
import axios from 'axios';

const CreateQuizForm = ({ courseId }) => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('/api/quizzes/create', { courseId, title, questions }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            setQuestions([]);
            alert('Quiz created successfully!');
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    const addQuestion = () => {
        setQuestions([...questions, { text: '', options: [], difficulty: 'medium' }]);
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Quiz Title" required />
            <h3>Questions</h3>
            {questions.map((question, index) => (
                <div key={index}>
                    <textarea value={question.text} onChange={(e) => updateQuestion(index, 'text', e.target.value)} placeholder="Question Text" required />
                    <input type="text" value={question.difficulty} onChange={(e) => updateQuestion(index, 'difficulty', e.target.value)} placeholder="Difficulty (easy, medium, hard)" required />
                    {/* Add inputs for options here */}
                </div>
            ))}
            <button type="button" onClick={addQuestion}>Add Question</button>
            <button type="submit">Create Quiz</button>
        </form>
    );
};

export default CreateQuizForm;
