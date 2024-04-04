// Import Chai
const chai = require("fix-esm").require('chai');

// Import the expect function for easy assertions
const expect = require("fix-esm").require('chai').expect;

// Import Supertest
const supertest = require('supertest');

// Import your server file
const app = require('../server.js');

// A variable to hold test table id
let tableId = 0;

// Testing the get all tables functionality
describe('Table Controller', () => {
    describe('GET /tables', () => {
        it('should return all tables', async () => {
            const server = app.listen(); // Start the server for testing
            const res = await supertest(server).get('/tables');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            // Additional assertions to validate table structure
            if (res.body.length > 0) {
                const table = res.body[0];
                expect(table).to.have.property('table_number');
                expect(table).to.have.property('is_occupied');
            }
            server.close(); // Close the server after testing
        });
    });
});

// Testing the create table functionality
describe('POST /tables', () => {
    it('should add a new table', async () => {
        const newTable = {
            table_number: 9,
            is_occupied: false
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .post('/tables')
            .send(newTable);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('table_number').to.equal(9);
        expect(res.body).to.have.property('is_occupied').to.equal(false);
        tableId = res.body.id;
        server.close(); // Close the server after testing
    });
});

// Testing the table update functionality
describe('PATCH /tables/:id', () => {
    it('should update an existing table', async () => {
        const updatedTableData = {
            table_number: 10,
            is_occupied: true
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .patch(`/tables/${tableId}`)
            .send(updatedTableData);
        expect(res.status).to.equal(200);
        expect(res.body.table).to.have.property('table_number').to.equal(10);
        expect(res.body.table).to.have.property('is_occupied').to.equal(true);
        server.close(); // Close the server after testing
    });
});

// Testing the table delete functionality
describe('DELETE /tables/:id', () => {
    it('should delete an existing table', async () => {
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server).delete(`/tables/${tableId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('Table deleted successfully');
        server.close(); // Close the server after testing
    });
});
