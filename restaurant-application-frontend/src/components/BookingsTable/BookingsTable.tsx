import React from 'react'
import { BookingTableProps } from '../../utils/bookingsManagementUtils'
import BookingRow from './BookingRow/BookingRow'

function BookingsTable({userData, bookings, setTargetBooking, targetBooking, setBookings}: BookingTableProps) {
    return (
        <div className='bookings_table_wrapper'>
            <div className="search_wrapper">
                {/* <Search
                    placeholderText={"doctor name..."}
                // handleSearch={handleDoctorSearch}
                /> */}
            </div>

            <table className="bookings_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className="p__inter table_header">NAME</th>
                        <th className="p__inter table_header">EMAIL</th>
                        <th className="p__inter table_header">MOBILE</th>
                        <th className="p__inter table_header">DATE</th>
                        <th className="p__inter table_header">GUESTS</th>
                        <th className="p__inter table_header">OCCASSIONS</th>
                        <th className="p__inter table_header">MESSAGE</th>
                        <th className="p__inter table_header">STATUS</th>
                        <th className="p__inter table_header">ACTION</th>
                    </tr>
                </thead>

                <tbody className='table_body'>
                    {bookings?.map((booking) => (
                        <BookingRow
                            key={bookings.indexOf(booking)}
                            userData={userData}
                            booking={booking}
                            setTargetBooking={setTargetBooking}
                            targetBooking={targetBooking}
                            bookings={bookings}
                            setBookings={setBookings}
                        // handleAction={handleAction}
                        />
                    ))}
                </tbody>
            </table>
            {bookings?.length < 1 && <h3 className="p__inter no_bookings_text">No BOOKINGS</h3>}

        </div>
    )
}

export default BookingsTable
