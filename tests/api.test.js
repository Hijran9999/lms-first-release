// tests/api.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
  // optionally set test DB
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Auth endpoints', () => {
  it('should register and login', async () => {
    const email = `t${Date.now()}@test.com`;
    const reg = await request(app).post('/api/auth/register').send({ fullName: 'Test', email, password: 'password123', role: 'instructor' });
    expect(reg.statusCode).toBe(201);
    const login = await request(app).post('/api/auth/login').send({ email, password: 'password123' });
    expect(login.statusCode).toBe(200);
    expect(login.body).toHaveProperty('token');
  });
});
