const request = require('supertest');
const app = require('../src/index');

describe('Authentication Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "password123"
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');
    });
});
