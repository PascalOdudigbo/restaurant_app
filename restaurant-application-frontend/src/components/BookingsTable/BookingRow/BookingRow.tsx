import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { SlOptions } from "react-icons/sl"
import { BookingRowProps, deleteBooking } from '../../../utils/bookingsManagementUtils'
import { useNavigate } from 'react-router-dom'

function BookingRow({ userData, booking, setTargetBooking, targetBooking, bookings, setBookings, bookingStatus, setBookingStatus }: BookingRowProps) {
    // Declaring state variables to manage dropdown display
    const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")
    // Declaring navigation variable function
    const navigate = useNavigate()

    return (
        <tr className="row_wrapper">
            <td className="row_cell">{booking.user.name}</td>
            <td className="row_cell">{booking.user.email}</td>
            <td className="row_cell">{booking.user.mobile_number}</td>
            <td className="row_cell">{booking.preferred_date.toString().slice(0, 10)}</td>
            <td className="row_cell">{booking.preferred_guests}</td>
            <td className="row_cell">{booking.occasion}</td>
            <td className="row_cell">{booking.message}</td>
            <td className="row_cell">{booking.status}</td>
            <td className="row_cell">
                <div className="dropdown">
                    <IconContext.Provider value={{ size: '20px', className: "dropdown_icon" }}>
                        <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} />
                    </IconContext.Provider>
                    <div className="dropdown_content" style={{ display: dropdownDisplay }}>
                        {
                            (userData.role === "client" && booking.status === "Pending") && <button className='dropdown_item' onClick={() => {
                                window.scrollTo(0, 0)
                                setTargetBooking(booking)
                                navigate(window.location.href.includes("restaurant-management") ? "/restaurant-management/bookings-management/edit-booking" : "/bookings-management/edit-booking")
                            }}>EDIT</button>
                        }
                        {
                            (userData.role === "client" && booking.status === "Pending") && <button className="delete_btn" onClick={() => { 
                                deleteBooking(targetBooking, bookings, setBookings)
                             }}>DELETE</button>
                        }
                         {
                            userData.role === "manager" && <button className='dropdown_item' onClick={() => {
                                window.scrollTo(0,0)
                                setTargetBooking(booking)
                                setBookingStatus(true)
                                navigate(window.location.href.includes("restaurant-management") ? "/restaurant-management/bookings-management/approve-booking" : "/bookings-management/approve-booking")
                             }}>APPROVE</button>
                        }
                         {
                            userData.role === "manager" && <button className='dropdown_item' onClick={() => {
                                window.scrollTo(0,0)
                                setTargetBooking(booking)
                                setBookingStatus(false)
                                navigate(window.location.href.includes("restaurant-management") ? "/restaurant-management/bookings-management/decline-booking" : "/bookings-management/decline-booking")
                             }}>DECLINE</button>
                        }
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default BookingRow
