const axios = require('axios');
const ExternalResource = require('../models/ExternalResource');

class ExternalResourceService {
    static async fetchKhanAcademyResources() {
        try {
            const response = await axios.get('https://www.khanacademy.org/api/v1/topictree');
            const resources = response.data.children;

            const resourcePromises = resources.map(async (resource) => {
                return await ExternalResource.create({
                    title: resource.title,
                    description: resource.description,
                    url: `https://www.khanacademy.org${resource.ka_url}`,
                    provider: 'Khan Academy',
                    category: resource.domain_slug || 'General',
                    language: 'en',
                });
            });

            await Promise.all(resourcePromises);
        } catch (error) {
            console.error('Error fetching Khan Academy resources:', error);
        }
    }

    static async fetchCourseraResources() {
        try {
            // Assuming we have an API key and an endpoint to fetch Coursera resources
            const response = await axios.get('https://api.coursera.org/api/courses.v1', {
                headers: { 'Authorization': `Bearer ${process.env.COURSERA_API_KEY}` }
            });
            const courses = response.data.elements;

            const coursePromises = courses.map(async (course) => {
                return await ExternalResource.create({
                    title: course.name,
                    description: course.description,
                    url: `https://www.coursera.org/learn/${course.slug}`,
                    provider: 'Coursera',
                    category: course.domain || 'General',
                    language: course.language || 'en',
                });
            });

            await Promise.all(coursePromises);
        } catch (error) {
            console.error('Error fetching Coursera resources:', error);
        }
    }

    static async getAllExternalResources() {
        return await ExternalResource.find();
    }
}

module.exports = ExternalResourceService;
