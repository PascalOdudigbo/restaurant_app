// Import Chai
const chai = require("fix-esm").require('chai');

// Import the expect function for easy assertions
const expect = require("fix-esm").require('chai').expect;

// Import Supertest
const supertest = require('supertest');

// Import your server file
const app = require('../server.js');

// A variable to hold test menu item id
let menuItemId = 0;

// Testing the get all menu items functionality
describe('Menu Item Controller', () => {
    describe('GET /menu-items', () => {
        it('should return all menu items', async () => {
            const server = app.listen(); // Start the server for testing
            const res = await supertest(server).get('/menu-items');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            // Additional assertions to validate menu item structure
            if (res.body.length > 0) {
                const menuItem = res.body[0];
                expect(menuItem).to.have.property('name');
                expect(menuItem).to.have.property('description');
                expect(menuItem).to.have.property('price');
                expect(menuItem).to.have.property('image');
                expect(menuItem).to.have.property('is_available');
            }
            server.close(); // Close the server after testing
        });
    });
});

// Testing the create menu item functionality
describe('POST /menu-items', () => {
    it('should add a new menu item', async () => {
        const newMenuItem = {
            menu_category_id: 1,
            name: "Test Item",
            description: "This is a test item",
            price: 10.99,
            image: "test.jpg",
            image_public_id: "public_id",
            is_available: true
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .post('/menu-items')
            .send(newMenuItem);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message').to.equal('Menu item created successfully!');
        expect(res.body).to.have.property('menuItem');
        menuItemId = res.body.menuItem.id;
        server.close(); // Close the server after testing
    });
});

// Testing the menu item update functionality
describe('PATCH /menu-items/:id', () => {
    it('should update an existing menu item', async () => {
        const updatedMenuItemData = {
            menu_category_id: 2,
            name: "Updated Item",
            description: "This is an updated test item",
            price: 15.99,
            image: "updated.jpg",
            image_public_id: "updated_public_id",
            is_available: false
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .patch(`/menu-items/${menuItemId}`)
            .send(updatedMenuItemData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('Menu item updated successfully!');
        expect(res.body).to.have.property('menuItem');
        server.close(); // Close the server after testing
    });
});

// Testing the menu item delete functionality
describe('DELETE /menu-items/:id', () => {
    it('should delete an existing menu item', async () => {
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server).delete(`/menu-items/${menuItemId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('Menu item deleted successfully');
        server.close(); // Close the server after testing
    });
});
