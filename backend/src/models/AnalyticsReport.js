const mongoose = require('mongoose');

const analyticsReportSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The educator
    reportType: { type: String, enum: ['progress', 'performance', 'engagement'], required: true },
    data: { type: Map, of: mongoose.Schema.Types.Mixed }, // Flexible schema for various types of reports
    generatedAt: { type: Date, default: Date.now },
});

const AnalyticsReport = mongoose.model('AnalyticsReport', analyticsReportSchema);
module.exports = AnalyticsReport;
