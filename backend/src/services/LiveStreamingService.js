const axios = require('axios');
const LiveSession = require('../models/LiveSession');
const VirtualClassroom = require('../models/VirtualClassroom');

class LiveStreamingService {
    static async startLiveSession(classroomId, instructorId) {
        // Integrate with a live streaming API (e.g., Zoom, Google Meet)
        // For example, let's assume we are using Zoom's API:
        const classroom = await VirtualClassroom.findById(classroomId);
        const session = new LiveSession({
            classroom: classroomId,
            instructor: instructorId,
            startTime: Date.now(),
        });
        
        // Example API call to start a Zoom meeting
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic: classroom.title,
            type: 1,  // Instant meeting
            settings: {
                host_video: true,
                participant_video: true,
                auto_recording: 'cloud',
            }
        }, {
            headers: { 'Authorization': `Bearer ${process.env.ZOOM_JWT_TOKEN}` }
        });
        
        session.recordingUrl = response.data.join_url;  // Save the Zoom meeting URL
        await session.save();
        return session;
    }

    static async endLiveSession(sessionId) {
        const session = await LiveSession.findById(sessionId);
        session.endTime = Date.now();
        await session.save();
        return session;
    }

    static async getLiveSessionsForClassroom(classroomId) {
        return await LiveSession.find({ classroom: classroomId }).sort({ startTime: -1 });
    }
}

module.exports = LiveStreamingService;
