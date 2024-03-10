import React from 'react'
import { BookingRowProps, deleteBooking } from '../../utils/bookingsManagementUtils'
import { useNavigate } from 'react-router-dom'

function Booking({ userData, booking, setTargetBooking, targetBooking, bookings, setBookings, setBookingStatus }: BookingRowProps) {
    // Declaring navigation variable function
    const navigate = useNavigate()

    return (
        <div className='booking_wrapper'>
            <section className='client_details_wrapper'>
                <h3 className='p__playfair section_hearder'>CLIENT DETAILS</h3>
                <section className='client_details'>
                    <p className='p__inter client_detail'><b>Name:</b> {booking.user.name}</p>
                    <p className='p__inter client_detail'><b>Email:</b> {booking.user.email}</p>
                    <p className='p__inter client_detail'><b>Mobile:</b> {booking.user.mobile_number}</p>
                </section>
            </section>

            <section className='booking_details_wrapper'>
                <h3 className='p__playfair section_hearder'>BOOKING DETAILS</h3>
                <section className='booking_details'>
                    <p className='p__inter booking_detail'><b>Date:</b> {booking.preferred_date.toString().split("T")[0]}</p>
                    <p className='p__inter booking_detail'><b>Guests:</b> {booking.preferred_guests}</p>
                    <p className='p__inter booking_detail'><b>Occassion:</b> {booking.occasion}</p>
                    <p className='p__inter booking_detail'><b>Message:</b> {booking.message}</p>
                    <p className='p__inter booking_detail'><b>Status:</b> {booking.status}</p>
                </section>
            </section>

            <section className='booking_buttons_wrapper'>
                {
                    (userData.role === "client" && booking.status === "Pending") && <button className='custom__button booking_button' onClick={() => {
                        window.scrollTo(0, 0)
                        setTargetBooking(booking)
                        navigate("/bookings-management/edit-booking")
                    }}>EDIT</button>
                }
                {
                    (userData.role === "client" && booking.status === "Pending") && <button className="custom__button booking_delete_btn" onClick={() => {
                        deleteBooking(targetBooking, bookings, setBookings)
                    }}>DELETE</button>
                }
                {
                    userData.role === "manager" && <button className='custom__button booking_button' onClick={() => {
                        window.scrollTo(0,0)
                        setTargetBooking(booking)
                        setBookingStatus(true)
                        navigate("/bookings-management/approve-booking")
                     }}>APPROVE</button>
                }
                {
                    userData.role === "manager" && <button className='custom__button booking_button' onClick={() => {
                        window.scrollTo(0,0)
                        setTargetBooking(booking)
                        setBookingStatus(false)
                        navigate("/bookings-management/decline-booking")
                     }}>DECLINE</button>
                }

            </section>

        </div>
    )
}

export default Booking
