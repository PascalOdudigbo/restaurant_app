// Import Chai
const chai = require("fix-esm").require('chai');

// Import the expect function for easy assertions
const expect = require("fix-esm").require('chai').expect;

// Import Supertest
const supertest = require('supertest');

// Import your server file
const app = require('../server.js');

// A variable to hold test menu category id
let menuCategoryId = 0;

// Testing the get all menu categories functionality
describe('Menu Category Controller', () => {
    describe('GET /menu-categories', () => {
        it('should return all menu categories', async () => {
            const server = app.listen(); // Start the server for testing
            const res = await supertest(server).get('/menu-categories');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            // Additional assertions to validate menu category structure
            if (res.body.length > 0) {
                const menuCategory = res.body[0];
                expect(menuCategory).to.have.property('name');
                expect(menuCategory).to.have.property('description');
            }
            server.close(); // Close the server after testing
        });
    });
});

// Testing the create menu category functionality
describe('POST /menu-categories', () => {
    it('should add a new menu category', async () => {
        const newMenuCategory = {
            name: "Test Category",
            description: "This is a test category",
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .post('/menu-categories')
            .send(newMenuCategory);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message').to.equal('Menu category created successfully!');
        expect(res.body).to.have.property('menuCategory');
        menuCategoryId = res.body.menuCategory.id;
        server.close(); // Close the server after testing
    });
});

// Testing the menu category update functionality
describe('PATCH /menu-categories/:id', () => {
    it('should update an existing menu category', async () => {
        const updatedMenuCategoryData = {
            name: "Updated Category",
            description: "This is an updated test category",
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .patch(`/menu-categories/${menuCategoryId}`)
            .send(updatedMenuCategoryData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('Menu category updated successfully');
        expect(res.body).to.have.property('menuCategory');
        server.close(); // Close the server after testing
    });
});

// Testing the menu category delete functionality
describe('DELETE /menu-categories/:id', () => {
    it('should delete an existing menu category', async () => {
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server).delete(`/menu-categories/${menuCategoryId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('Menu category deleted successfully');
        server.close(); // Close the server after testing
    });
});
