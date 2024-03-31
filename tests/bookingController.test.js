// Import Chai dynamically
import('chai')
    .then(chaiModule => {
        const chai = chaiModule.default;
        const { expect } = chai;

        // Import Supertest dynamically
        import('supertest')
            .then(supertestModule => {
                const supertest = supertestModule.default;

                // Import your server file dynamically
                import('../server.js')
                    .then(appModule => {
                        const app = appModule.default;

                        if (!app) {
                            throw new Error("Failed to access the server. Check if the server file path is correct.");
                        }

                        // A variable to hold test booking id
                        let bookingId = 0;

                        // Testing the get all bookings functionality
                        describe('Booking Controller', () => {
                            describe('GET /bookings', () => {
                                it('should return all bookings', async () => {
                                    const res = await supertest(app).get('/bookings');
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
                                const res = await supertest(app)
                                    .post('/bookings')
                                    .send(newBooking);
                                expect(res.status).to.equal(201);
                                expect(res.body).to.have.property('message').to.equal('Booking submitted successfully!');
                                expect(res.body).to.have.property('booking');
                                bookingId = res.body.booking.id;
                            });
                        });

                        // Testing the booking update functionality
                        describe('PATCH /bookings/:id', () => {
                            it('should update an existing booking', async () => {
                                const updatedBookingData = {
                                    preferred_date: "2024/04/02",
                                    preferred_guests: "12",
                                };
                                const res = await supertest(app)
                                    .patch(`/bookings/${bookingId}`)
                                    .send(updatedBookingData);
                                expect(res.status).to.equal(200);
                                expect(res.body).to.have.property('message').to.equal('Booking updated successfully!');
                                expect(res.body).to.have.property('booking');
                            });
                        });

                        // Testing the booking delete functionality
                        describe('DELETE /bookings/:id', () => {
                            it('should delete an existing booking', async () => {
                                const res = await supertest(app).delete(`/bookings/${bookingId}`);
                                expect(res.status).to.equal(200);
                                expect(res.body).to.have.property('message').to.equal('Booking deleted successfully!');
                            });
                        });

                    })
                    .catch(error => {
                        console.error("Error accessing the server file:", error);
                    });
            })
            .catch(error => {
                console.error("Error importing Supertest module:", error);
            });
    })
    .catch(error => {
        console.error("Error importing Chai module:", error);
    });
