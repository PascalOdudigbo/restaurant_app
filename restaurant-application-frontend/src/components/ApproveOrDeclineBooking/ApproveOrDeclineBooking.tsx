import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TextArea from '../TextArea/TextArea';
import { ApproveOrDeclineBookingProps, approveOrDeclineBooking } from '../../utils/bookingsManagementUtils';

function ApproveOrDeclineBooking({ bookingStatus, targetBooking, setBookings }: ApproveOrDeclineBookingProps) {
    // Declaring state variables for controlled form inputs
    const [message, setMessage] = useState<string>("");
    // Defining a navigation variable function
    const navigate = useNavigate();

    useEffect(() => {
        targetBooking.id < 1 && navigate("/bookings-management")
    }, [targetBooking, navigate])


    return (
        <div className='approve_or_decline_booking_wrapper flex__center'>
            <header className='approve_or_decline_booking_header'>
                <h3 className='headtext__playfair approve_or_decline_booking_header_title'>{bookingStatus ? "APPROVE BOOKING" : "DECLINE BOOKING"}</h3>
                <Link to="/bookings-management" className='headtext__playfair approve_or_decline_booking_header_close'>X</Link>
            </header>
            <form className='approve_or_decline_booking_form' onSubmit={(e) => { 
                approveOrDeclineBooking(e, targetBooking, bookingStatus, message, setBookings, navigate) 
                }}>
                <TextArea
                    label='Message *'
                    inputValue={message}
                    required={true}
                    rows={4}
                    cols={50}
                    onChangeFunction={(e) => { setMessage(e.target.value) }}
                />

                <button className='custom__button approve_or_decline_booking_form_button'>SEND</button>
            </form>

        </div>
    )
}

export default ApproveOrDeclineBooking;