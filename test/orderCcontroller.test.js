// Import Chai
const chai = require("fix-esm").require('chai');

// Import the expect function for easy assertions
const expect = require("fix-esm").require('chai').expect;

// Import Supertest
const supertest = require('supertest');

// Import your server file
const app = require('../server.js');

// A variable to hold test order id
let orderId = 0;

// Testing the get all orders functionality
describe('Order Controller', () => {
    describe('GET /orders', () => {
        it('should return all orders', async () => {
            const server = app.listen(); // Start the server for testing
            const res = await supertest(server).get('/orders');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            // Additional assertions to validate order structure
            if (res.body.length > 0) {
                const order = res.body[0];
                expect(order).to.have.property('user_id');
                expect(order).to.have.property('table_id');
                expect(order).to.have.property('status');
            }
            server.close(); // Close the server after testing
        });
    });
});

// Testing the create order functionality
describe('POST /orders', () => {
    it('should add a new order', async () => {
        const newOrder = {
            user_id: 4,
            table_id: 6,
            status: "Pending",
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .post('/orders')
            .send(newOrder);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message').to.equal('Order submitted successfully!');
        expect(res.body).to.have.property('order');
        orderId = res.body.order.id;
        server.close(); // Close the server after testing
    });
});

// Testing the order update functionality
describe('PATCH /orders/:id', () => {
    it('should update an existing order', async () => {
        const updatedOrderData = {
            table_id: 4,
            status: "Completed",
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .patch(`/orders/${orderId}`)
            .send(updatedOrderData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('Order updated successfully!');
        expect(res.body).to.have.property('order');
        server.close(); // Close the server after testing
    });
});

// Testing the order delete functionality
describe('DELETE /orders/:id', () => {
    it('should delete an existing order', async () => {
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server).delete(`/orders/${orderId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('Order deleted successfully!');
        server.close(); // Close the server after testing
    });
});
