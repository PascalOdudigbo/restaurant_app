import React, { useEffect, useState } from 'react'
import { BookingType, BookingsManagementProps, BookingsType, getAllBookings } from '../../utils/bookingsManagementUtils'
import { Booking, BookingsTable, EditBooking } from '../../components'
import { Route, Routes } from 'react-router-dom'

function BookingsManagement({ userData }: BookingsManagementProps) {

  // Creating state variables to hold bookings
  const [bookings, setBookings] = useState<BookingsType>([])
  // Creating state variables to hold target bookings
  const [targetBooking, setTargetBooking] = useState<BookingType>({
    id: 0,
    user_id: 0,
    preferred_date: "",
    preferred_guests: 0,
    occasion: "",
    message: "",
    status: "",
    user: {
      id: 0,
      name: "",
      mobile_number: "",
      postcode: "",
      email: "",
      password: "",
      role: ""
    }
  })

  useEffect(() => {
    //Getting all the bookings
    // getAllBookings(setBookings)
    setBookings(
      [
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },

        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        },
        {
          id: 1,
          user_id: 1,
          preferred_date: "2024-03-22T00:00:00.000Z",
          preferred_guests: 6,
          occasion: "Birthday",
          message: "I want to book a balcony table for my guests, I want a nice birthday party view. ",
          status: "Pending",
          user: {
            id: 1,
            name: "Pascal Odudigbo",
            mobile_number: "07442701949",
            postcode: "CV1 4FS",
            email: "odudigbopascal@gmail.com",
            password: "$2b$10$vNIaWeJb6FN/Cdu352jvEOd9.VixXgJd1ZRUTGOsKTi3zWfsdVr3K",
            role: "client"
          }
        }

      ])

  }, [])

  return (
    <div className='bookings_management app__bg app__wrapper section_padding flex__center'>
      <section className='heading_wrapper'>
        <h1 className='headtext__playfair bookingsManagementPage_heading'>{userData.role === "manager" ? "BOOKINGS MANAGEMENT" : "MY BOOKINGS"}</h1>
      </section>
      <section className='bookings_management_edit_booking_wrapper flex__center'>
        <Routes>
          <Route path="/edit-booking" element={<EditBooking targetBooking={targetBooking} setBookings={setBookings}/>} />
        </Routes>
      </section>

      <section className='bookings_table_wrapper'>
        <BookingsTable userData={userData} bookings={bookings} setTargetBooking={setTargetBooking} targetBooking={targetBooking} setBookings={setBookings} />
      </section>

      <section className='mobile_view_wrapper'>

        {bookings.map(booking => 
          <Booking 
            key={bookings.indexOf(booking)}
            userData={userData} 
            booking={booking} 
            setTargetBooking={setTargetBooking} 
            targetBooking={targetBooking} 
            bookings={bookings}
            setBookings={setBookings} />)}
      </section>
    </div>
  )
}

export default BookingsManagement
