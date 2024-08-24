const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const LLMService = require('../services/LLMService'); // Service to interact with the LLM
const authenticate = require('../auth/middleware');

// Create a new quiz
router.post('/create', authenticate, async (req, res) => {
    const { courseId, title, questions } = req.body;

    try {
        const quiz = new Quiz({
            course: courseId,
            title,
            questions: [],
        });

        for (let q of questions) {
            const question = new Question({
                quiz: quiz._id,
                text: q.text,
                options: q.options,
                difficulty: q.difficulty || 'medium',
            });
            await question.save();
            quiz.questions.push(question._id);
        }

        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Adjust question difficulty and wording
router.post('/adjust-difficulty', authenticate, async (req, res) => {
    const { questionId, difficulty, userId } = req.body;

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Use LLM to modify the question based on difficulty and user preferences
        const modifiedQuestion = await LLMService.modifyQuestion(question, difficulty, userId);

        question.text = modifiedQuestion.text;
        question.difficulty = difficulty;
        await question.save();

        res.json(question);
    } catch (error) {
        console.error('Error adjusting question difficulty:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get quiz with anti-cheating measures
router.get('/quiz/:quizId', authenticate, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId).populate('questions');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Modify quiz questions using LLM to minimize cheating
        const modifiedQuestions = [];
        for (let question of quiz.questions) {
            const modifiedQuestion = await LLMService.modifyQuestionForAntiCheating(question);
            modifiedQuestions.push(modifiedQuestion);
        }

        res.json({ ...quiz._doc, questions: modifiedQuestions });
    } catch (error) {
        console.error('Error retrieving quiz:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
