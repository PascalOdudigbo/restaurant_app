import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { SlOptions } from "react-icons/sl"
import { BookingRowProps, deleteBooking } from '../../../utils/bookingsManagementUtils'
import { useNavigate } from 'react-router-dom'

function BookingRow({ userData, booking, setTargetBooking, targetBooking, bookings, setBookings }: BookingRowProps) {
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
                                setTargetBooking(booking)
                                navigate("/bookings-management/edit-booking")
                            }}>Edit</button>
                        }
                        {
                            (userData.role === "client" && booking.status === "Pending") && <button className="delete_btn" onClick={() => { 
                                deleteBooking(targetBooking, bookings, setBookings)
                             }}>Delete</button>
                        }
                         {
                            userData.role === "manager" && <button className='dropdown_item' onClick={() => { }}>Approve</button>
                        }
                         {
                            userData.role === "manager" && <button className='dropdown_item' onClick={() => { }}>Deny</button>
                        }
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default BookingRow
