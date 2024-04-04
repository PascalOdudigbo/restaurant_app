// Import Chai
const chai = require("fix-esm").require('chai');

// Import the expect function for easy assertions
const expect = require("fix-esm").require('chai').expect;

// Import Supertest
const supertest = require('supertest');

// Import your server file
const app = require('../server.js');

// Global variable to store the ID of the newly created user
let newUserId = 0;


// Testing the get all users functionality
describe('User Controller', () => {
    describe('GET /users', () => {
        it('should return all users', async () => {
            const server = app.listen(); // Start the server for testing
            const res = await supertest(server).get('/users');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            // Additional assertions to validate user structure
            if (res.body.length > 0) {
                const user = res.body[0];
                expect(user).to.have.property('name');
                expect(user).to.have.property('mobile_number');
                expect(user).to.have.property('postcode');
                expect(user).to.have.property('email');
                expect(user).to.have.property('role');
            }
            server.close(); // Close the server after testing
        });
    });
});

// Testing the create user functionality
describe('POST /users', () => {
    it('should add a new user', async () => {
        const newUser = {
            name: 'Test User',
            mobile_number: '1234567890',
            postcode: '12345',
            email: 'test@example.com',
            password: 'testpassword',
            role: 'client'
        };
        const server = app.listen();
        const res = await supertest(server)
            .post('/users')
            .send(newUser);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        // Store the ID of the newly created user in the global variable
        newUserId = res.body.id;
        expect(res.body).to.have.property('name').to.equal('Test User');
        expect(res.body).to.have.property('email').to.equal('test@example.com');
        expect(res.body).to.have.property('role').to.equal('client');
        server.close();
    });
});

// Testing the user update functionality
describe('PATCH /users/:id', () => {
    it('should update an existing user', async () => {
        const updatedUserData = {
            name: 'Updated Test User',
            mobile_number: '9876543210',
            postcode: '54321',
            email: 'updated_test@example.com',
            password: 'updatedpassword',
            role: 'manager'
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .patch(`/users/${newUserId}`)
            .send(updatedUserData);
        expect(res.status).to.equal(200);
        expect(res.body.user).to.have.property('name').to.equal('Updated Test User');
        expect(res.body.user).to.have.property('email').to.equal('updated_test@example.com');
        expect(res.body.user).to.have.property('role').to.equal('manager');
        server.close(); // Close the server after testing
    });
});

// Testing the user delete functionality
describe('DELETE /users/:id', () => {
    it('should delete an existing user', async () => {
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server).delete(`/users/${newUserId}`); // Assuming user with ID 1 exists for testing
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('User deleted successfully!');
        server.close(); // Close the server after testing
    });
});
