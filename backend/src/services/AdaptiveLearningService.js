const AdaptiveLearning = require('../models/AdaptiveLearning');
const Course = require('../models/Course');
const Content = require('../models/Content');

class AdaptiveLearningService {
    static async updatePerformance(userId, courseId, sessionId, performance) {
        let adaptiveLearning = await AdaptiveLearning.findOne({ user: userId, course: courseId });

        if (!adaptiveLearning) {
            adaptiveLearning = new AdaptiveLearning({
                user: userId,
                course: courseId,
                currentDifficulty: 'medium',
                performanceHistory: [],
            });
        }

        adaptiveLearning.performanceHistory.push({ session: sessionId, performance });

        // Adjust difficulty based on recent performance
        const recentPerformances = adaptiveLearning.performanceHistory.slice(-5).map(p => p.performance);
        const averagePerformance = recentPerformances.reduce((a, b) => a + b, 0) / recentPerformances.length;

        if (averagePerformance > 80) {
            adaptiveLearning.currentDifficulty = 'hard';
        } else if (averagePerformance < 50) {
            adaptiveLearning.currentDifficulty = 'easy';
        } else {
            adaptiveLearning.currentDifficulty = 'medium';
        }

        // Recommend next content based on updated difficulty
        adaptiveLearning.recommendedContent = await Content.find({ 
            course: courseId, 
            difficulty: adaptiveLearning.currentDifficulty 
        }).limit(3);

        adaptiveLearning.lastUpdated = Date.now();
        await adaptiveLearning.save();

        return adaptiveLearning;
    }

    static async getRecommendedContent(userId, courseId) {
        const adaptiveLearning = await AdaptiveLearning.findOne({ user: userId, course: courseId });
        if (!adaptiveLearning) {
            return [];
        }
        return adaptiveLearning.recommendedContent;
    }
}

module.exports = AdaptiveLearningService;
