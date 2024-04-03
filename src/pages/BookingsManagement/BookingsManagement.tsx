import React, { useEffect, useState } from 'react'
import { BookingType, BookingsManagementProps, filterBookings, getBookingsByUserId, searchBookings } from '../../utils/bookingsManagementUtils'
import { ApproveOrDeclineBooking, Booking, BookingsTable, Dropdown, EditBooking, Search } from '../../components'
import { Route, Routes } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { Tooltip } from '@mui/material'
import { FaFilter } from 'react-icons/fa'

function BookingsManagement({ userData, bookings, setBookings }: BookingsManagementProps) {
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
  // Declaring state variables for filtering bookings
  const [filterValue, setFilterValue] = useState<string | number>("All")
  // Declaring state variables for for approving or declining bookings
  const [bookingStatus, setBookingStatus] = useState<boolean>(false)


  useEffect(() => {
    //Getting all client Bookings
    userData?.role === "client" && getBookingsByUserId(userData?.id, setBookings);

  }, [userData, setBookings])

  // Defining a function to handle search input value change
  const handleBookingSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => {
    setSearchData(e.target.value);
    const searchValue = e.target.value;
    searchBookings(searchValue, bookings, setBookings)
  }

  return (
    <div className='bookings_management app__bg app__wrapper section_padding flex__center'>
      <section className='heading_wrapper'>
        <h1 className='headtext__playfair bookingsManagementPage_heading'>{userData?.role === "manager" ? "BOOKINGS" : "MY BOOKINGS"}</h1>
      </section>
      <section className='bookings_management_edit_booking_wrapper flex__center'>
        <Routes>
          <Route path="/edit-booking" element={<EditBooking targetBooking={targetBooking} setBookings={setBookings} />} />
          <Route path="/approve-booking" element={<ApproveOrDeclineBooking bookingStatus={bookingStatus} targetBooking={targetBooking} setBookings={setBookings} />} />
          <Route path="/decline-booking" element={<ApproveOrDeclineBooking bookingStatus={bookingStatus} targetBooking={targetBooking} setBookings={setBookings} />} />
        </Routes>
      </section>

      <section className='bookings_table_wrapper'>
        <BookingsTable
          userData={userData}
          bookings={bookings}
          setTargetBooking={setTargetBooking}
          targetBooking={targetBooking}
          setBookings={setBookings}
          handleSearchOnChange={handleBookingSearchOnChange}
          bookingStatus={bookingStatus}
          setBookingStatus={setBookingStatus}
        />
      </section>

      <section className='mobile_view_wrapper'>
        <div className="search_and_filter_wrapper">
          {
            userData?.role === "manager" &&
            <section className='search_wrapper'>
              <Search
                placeholderText={"Client name..."}
                handleOnChange={handleBookingSearchOnChange}
              />
            </section>
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
                  filterBookings(userData, data?.toString(), bookings, setBookings)
                }}
              />
            </section>
          </Tooltip>
        </div>

        <section className='mobile_bookings_wrapper'>
          {bookings?.map(booking =>
            <Booking
              key={bookings?.indexOf(booking)}
              userData={userData}
              booking={booking}
              setTargetBooking={setTargetBooking}
              targetBooking={targetBooking}
              bookings={bookings}
              setBookings={setBookings}
              bookingStatus={bookingStatus}
              setBookingStatus={setBookingStatus} />)}

        </section>

      </section>
    </div>
  )
}

export default BookingsManagement
