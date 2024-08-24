const StudyPlan = require('../models/StudyPlan');
const User = require('../models/User');
const Course = require('../models/Course');
const Activity = require('../models/Activity');

class StudyPlanService {
    static async generatePersonalizedPlan(userId) {
        // Fetch user data
        const user = await User.findById(userId).populate('preferences');
        
        // Example logic for generating a personalized plan
        const recommendedCourses = await Course.find().limit(5);  // Replace with AI logic
        const recommendedActivities = await Activity.find().limit(10);  // Replace with AI logic

        // Create a new study plan
        const studyPlan = new StudyPlan({
            user: userId,
            title: `${user.name}'s Personalized Study Plan`,
            goals: ['Complete the recommended courses', 'Achieve mastery in selected topics'],  // Example goals
            recommendedCourses: recommendedCourses.map(course => course._id),
            recommendedActivities: recommendedActivities.map(activity => activity._id),
        });

        await studyPlan.save();
        return studyPlan;
    }
}

module.exports = StudyPlanService;
