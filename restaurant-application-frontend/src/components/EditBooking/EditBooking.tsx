import React, { useEffect, useState } from 'react'
import { BookingDetails, currentDate } from '../../utils/bookingUtils'
import { Link, useNavigate } from 'react-router-dom'
import { FormInputDate, Dropdown, FormInput, TextArea } from "../"
import { EditBookingProps, editBooking } from '../../utils/bookingsManagementUtils'

function EditBooking({ targetBooking, setBookings }: EditBookingProps) {
    // Declaring state variables for controlled form inputs
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
        date: targetBooking.id ? targetBooking.preferred_date : "",
        preferredGuests: targetBooking.id ? targetBooking.preferred_guests : "Select...",
        name: targetBooking.id ? targetBooking.user.name : "",
        email: targetBooking.id ? targetBooking.user.email : "",
        mobilenumber: targetBooking.id ? targetBooking.user.mobile_number : "",
        postcode: targetBooking.id ? targetBooking.user.postcode : "",
        occasion: targetBooking.id ? targetBooking.occasion : "Select",
        message: targetBooking.id ? targetBooking.message : "",
    })

    // Declaring navigation variable function
    const navigate = useNavigate()

    useEffect(() => {
        targetBooking.id < 1 && navigate(window.location.href.includes("restaurant-management") ? "/restaurant-management/bookings-management" : "/bookings-management")
    }, [targetBooking, navigate])

    return (
        <div className='editBooking_wrapper flex__center'>
            <header className='editBooking_header'>
                <h3 className='headtext__playfair editBooking_header_title'>UPDATE BOOKING</h3>
                <Link to={window.location.href.includes("restaurant-management") ? "/restaurant-management/bookings-management" : "/bookings-management"} className='headtext__playfair editBooking_header_close'>X</Link>
            </header>
            <div className='editBooking_form_wrapper'>
                <form className='editBooking_form' onSubmit={(e) => { editBooking(e, targetBooking, bookingDetails, setBookings)}}>
                    <div className='item1'>
                        <FormInputDate
                            label="Prefered date  *"
                            selectionLimit={30}
                            defaultDate={bookingDetails.date !== "" ? bookingDetails.date.toString().split("T")[0] : currentDate()}
                            setDate={(e) => { setBookingDetails({ ...bookingDetails, date: e.target.value }) }}
                        />
                    </div>
                    <div className='item2'>
                        <Dropdown
                            label='Prefered guests  *'
                            items={["select", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"]}
                            buttonText={bookingDetails.preferredGuests}
                            clickFunction={(data) => { setBookingDetails({ ...bookingDetails, preferredGuests: data }) }}
                        />
                    </div>

                    <div className='item 3'>
                        <FormInput
                            label='Name  *'
                            inputType='text'
                            inputValue={bookingDetails.name}
                            required={true}
                            readonly={true}
                            onChangeFunction={(e) => { setBookingDetails({ ...bookingDetails, name: e.target.value }) }}
                        />
                    </div>

                    <div className='item4'>
                        <FormInput
                            label='Email  *'
                            inputType='text'
                            inputValue={bookingDetails.email}
                            required={true}
                            readonly={true}
                            onChangeFunction={(e) => { setBookingDetails({ ...bookingDetails, email: e.target.value }) }}
                        />
                    </div>

                    <div className='item5'>
                        <FormInput
                            label='Mobile Number  *'
                            inputType='text'
                            inputValue={bookingDetails.mobilenumber}
                            required={true}
                            readonly={true}
                            onChangeFunction={(e) => { setBookingDetails({ ...bookingDetails, mobilenumber: e.target.value }) }}
                        />
                    </div>

                    <div className='item6'>
                        <FormInput
                            label='Postcode  *'
                            inputType='text'
                            inputValue={bookingDetails.postcode}
                            required={true}
                            readonly={true}
                            onChangeFunction={(e) => { setBookingDetails({ ...bookingDetails, postcode: e.target.value }) }}
                        />
                    </div>

                    <div className='item7'>
                        <Dropdown
                            label='Occasion  *'
                            items={["Select", "Birthday", "Anniversary", "Family Reunion", "Friends Party", "Special Occasion", "Business Related", "Other"]}
                            buttonText={bookingDetails.occasion}
                            clickFunction={(data) => { setBookingDetails({ ...bookingDetails, occasion: data }) }}
                        />
                    </div>

                    <div className='item8'>
                        <TextArea
                            label='Message  *'
                            inputValue={bookingDetails.message}
                            required={true}
                            rows={4}
                            cols={50}
                            onChangeFunction={(e) => { setBookingDetails({ ...bookingDetails, message: e.target.value }) }}

                        />
                    </div>

                    <div className='item9'>
                        <button className='custom__button editBooking_form_button'>UPDATE</button>
                    </div>


                </form>
            </div>

        </div>
    )
}

export default EditBooking
