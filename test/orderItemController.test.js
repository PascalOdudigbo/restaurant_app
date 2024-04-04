// Import Chai
const chai = require("fix-esm").require('chai');

// Import the expect function for easy assertions
const expect = require("fix-esm").require('chai').expect;

// Import Supertest
const supertest = require('supertest');

// Import your server file
const app = require('../server.js');

// A variable to hold test order item id
let orderItemId = 0;

// Testing the get all order items functionality
describe('Order Item Controller', () => {
    describe('GET /order-items', () => {
        it('should return all order items', async () => {
            const server = app.listen(); // Start the server for testing
            const res = await supertest(server).get('/order-items');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            // Additional assertions to validate order item structure
            if (res.body.length > 0) {
                const orderItem = res.body[0];
                expect(orderItem).to.have.property('order_id');
                expect(orderItem).to.have.property('menu_item_id');
                expect(orderItem).to.have.property('quantity');
            }
            server.close(); // Close the server after testing
        });
    });
});

// Testing the create order item functionality
describe('POST /order-items', () => {
    it('should add a new order item', async () => {
        const newOrderItem = {
            order_id: 7,
            menu_item_id: 9,
            quantity: 2
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .post('/order-items')
            .send(newOrderItem);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message').to.equal('Item added to cart successfully!');
        expect(res.body).to.have.property('order_item');
        orderItemId = res.body.order_item.id;
        server.close(); // Close the server after testing
    });
});

// Testing the order item update functionality
describe('PATCH /order-items/:id', () => {
    it('should update an existing order item', async () => {
        const updatedOrderItemData = {
            order_id: 7,
            menu_item_id: 9,
            quantity: 3
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .patch(`/order-items/${orderItemId}`)
            .send(updatedOrderItemData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('order_id').to.equal(7);
        expect(res.body).to.have.property('menu_item_id').to.equal(9);
        expect(res.body).to.have.property('quantity').to.equal(3);
        server.close(); // Close the server after testing
    });
});

// Testing the order item delete functionality
describe('DELETE /order-items/:id', () => {
    it('should delete an existing order item', async () => {
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server).delete(`/order-items/${orderItemId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.equal('Order item deleted successfully');
        server.close(); // Close the server after testing
    });
});
