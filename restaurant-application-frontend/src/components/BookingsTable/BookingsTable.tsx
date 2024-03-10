import React, { useState } from 'react'
import { BookingTableProps, filterBookings } from '../../utils/bookingsManagementUtils'
import BookingRow from './BookingRow/BookingRow'
import { Dropdown, Search } from "../"
import { FaFilter } from "react-icons/fa";
import { Tooltip } from '@mui/material';
import { IconContext } from 'react-icons';

function BookingsTable({ userData, bookings, setTargetBooking, targetBooking, setBookings, handleSearchOnChange, bookingStatus, setBookingStatus }: BookingTableProps) {
    // Declaring state variables for filtering bookings
    const [filterValue, setFilterValue] = useState<string | number>("All")
    return (
        <div className='bookings_table_wrapper'>
            <div className="search_wrapper">
                {
                    userData.role === "manager" &&
                    <Search
                        placeholderText={"Client name..."}
                        handleOnChange={handleSearchOnChange}
                    />
                }
                <Tooltip title="Filter Bookings" arrow>
                    <section className='filterWrapper'>

                        <IconContext.Provider value={{ className: "filter_icon" }}>

                            <FaFilter />

                        </IconContext.Provider>


                        <Dropdown
                            label={""}
                            items={["All", "Pending", "Approved", "Declined"]}
                            buttonText={filterValue}
                            clickFunction={(data) => {
                                setFilterValue(data)
                                filterBookings(data.toString(), bookings, setBookings)
                            }}
                        />


                    </section>
                </Tooltip>
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
                            bookingStatus={bookingStatus} 
                            setBookingStatus={setBookingStatus}
                        />
                    ))}
                </tbody>
            </table>
            {bookings?.length < 1 && <h3 className="p__inter no_bookings_text">NO BOOKINGS</h3>}

        </div>
    )
}

export default BookingsTable
