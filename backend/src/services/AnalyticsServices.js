const Analytics = require('../models/Analytics');

class AnalyticsService {
    static async logActivity(userId, activityType, activityDetails) {
        const analyticsData = new Analytics({
            user: userId,
            activityType,
            activityDetails,
        });
        await analyticsData.save();
        return analyticsData;
    }

    static async getUserActivityReport(userId) {
        return await Analytics.find({ user: userId }).sort({ timestamp: -1 });
    }

    static async getPlatformWideReport() {
        // Aggregates data to provide platform-wide insights
        const report = await Analytics.aggregate([
            { $group: { _id: '$activityType', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        return report;
    }
}

module.exports = AnalyticsService;
