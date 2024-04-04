// Import Chai
const chai = require("fix-esm").require('chai');

// Import the expect function for easy assertions
const expect = require("fix-esm").require('chai').expect;

// Import Supertest
const supertest = require('supertest');

// Import your server file
const app = require('../server.js');

// A variable to hold test booking id
let bookingId = 0;

// Testing the get all bookings functionality
describe('Booking Controller', () => {
    describe('GET /bookings', () => {
        it('should return all bookings', async () => {
            const server = app.listen(); // Start the server for testing
            const res = await supertest(server).get('/bookings');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            // Additional assertions to validate booking structure
            if (res.body.length > 0) {
                const booking = res.body[0];
                expect(booking).to.have.property('user_id');
                expect(booking).to.have.property('preferred_date');
                expect(booking).to.have.property('preferred_guests');
                expect(booking).to.have.property('occasion');
                expect(booking).to.have.property('status');
            }
            server.close(); // Close the server after testing
        });
    });
});

// Testing the create booking functionality
describe('POST /bookings', () => {
    it('should add a new booking', async () => {
        const newBooking = {
            user_id: 5,
            preferred_date: "2024/04/02",
            preferred_guests: "12",
            occasion: "Birthday party",
            message: "We're going for a purple theme so you guys will be perfect for this!",
            status: "Pending",
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .post('/bookings')
            .send(newBooking);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message').to.equal('Booking submitted successfully!');
        expect(res.body).to.have.property('booking');
        bookingId = res.body.booking.id;
        server.close(); // Close the server after testing
    });
});

// Testing the booking update functionality
describe('PATCH /bookings/:id', () => {
    it('should update an existing booking', async () => {
        const updatedBookingData = {
            preferred_date: "2024/04/02",
            preferred_guests: "12",
        };
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server)
            .patch(`/bookings/${bookingId}`)
            .send(updatedBookingData);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('Booking updated successfully!');
        expect(res.body).to.have.property('booking');
        server.close(); // Close the server after testing
    });
});

// Testing the booking delete functionality
describe('DELETE /bookings/:id', () => {
    it('should delete an existing booking', async () => {
        const server = app.listen(); // Start the server for testing
        const res = await supertest(server).delete(`/bookings/${bookingId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').to.equal('Booking deleted successfully!');
        server.close(); // Close the server after testing
    });
});
