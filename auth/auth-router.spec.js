const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe('auth-router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('POST to register', () => {

        it('should return 201 on valid register', () => {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'testing', password: 'testing123' })
                .then(response => {
                    expect(response.status).toBe(201)
            })
        })
        it("should return a 500 error for inputing an incomplete password", () => {
            return request(server)
                .post("/api/auth/register")
                .send({ username: 'testing123', password: 3})
                .then(response => {
                expect(response.status).toBe(500);
            });
        });
    })

    describe('POST login', () => {
        it('should return 401 error', () => {
            return request(server)
                .post('/api/auth/login')
                .send({ username: '', password: '' })
                .then(response => {
                    expect(response.status).toBe(401)
                })
        })
        it("should return a 500 error for number password", () => {
            const username = 'username'
            const password = 'password'
            return request(server)
            .post("/api/auth/register")
            .send({ username: 'username', password: 3})
            .then(response => {
            expect(response.status).toBe(500);
            });
        });
    })
})