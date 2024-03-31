import React, { useEffect, useState } from 'react'
import { Dropdown, FormInput, FormInputDate, TextArea } from '../../components';
import {BookingProps, BookingDetails, makeBooking, currentDate } from '../../utils/bookingUtils';
import { useNavigate } from 'react-router-dom';


function BookingPage({userData} : BookingProps) {
  // Declaring state variables for controlled form inputs
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: "",
    preferredGuests: "Select",
    name: userData.id ? userData.name : "",
    email: userData.id ? userData.email : "",
    mobilenumber: userData.id ? userData.mobile_number : "",
    postcode: userData.id ? userData.postcode : "",
    occasion: "Select",
    message: "",
  })
  // Creating the navigation function
  const navigate = useNavigate();

  useEffect(() => {
    // Using the hook to make booking details data refresh
    setBookingDetails({
      date: "",
      preferredGuests: "Select",
      name: userData.id ? userData.name : "",
      email: userData.id ? userData.email : "",
      mobilenumber: userData.id ? userData.mobile_number : "",
      postcode: userData.id ? userData.postcode : "",
      occasion: "Select",
      message: "",
    })
  }, [userData])

  //

  return (
    <div className='app__bookingpage_wrapper app__bg app__wrapper section_padding' id='booking'>
      <section className='app__bookingpage_heading_wrapper'>
        <h1 className='headtext__playfair app__bookingpage_heading'>BOOKING</h1>
      </section>

      <section className='app__bookingpage_about_and_booking_wrapper flex__center'>
        <section className='app__bookingpage_about_wrapper flex__center'>
          <div>
            <p className='app__bookingpage_about_question p__almendra'>Who is Lila Brown?</p>
            <div className='app__bookingpage_about_purple_line'></div>

            <h4 className='p__almendra app__bookingpage_about_motto'>Ask Your Friends</h4>

            <p className='p__inter app__bookingpage_about'>
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Donec Porta Ac Felis A Lobortis.
              Cras Interdum Quam Non Erat Fringilla, Eu Aliquet Turpis Pretium. Pellentesque Dictum
              Magna Justo, At Pharetra Metus Blandit Nec. Sed Scelerisque Odio Sed Velit Egestas Sagittis.
              Nunc Elementum Odio Sollicitudin Arcu Aliquam Sollicitudin. Nulla Quis Bibendum Eros.
            </p>

          </div>

        </section>

        <section className='app__bookingpage_booking_wrapper '>
          <div className='app__bookingpage_booking_instructions_wrapper'>

            <p className='p__inter app__bookingpage_booking_instructions'>
              You may book your table by completing this form. The restaurant will confirm your booking
              via email or phone after a short while. PLEASE NOTE THAT IF YOU TRY TO BOOK ONLINE
              IN THE LAST MINUTE ESPECIALLY ON WEEKENDS, TABLE CANNOT BE RESERVED UNTIL
              ACCEPTED (Acceptance email sent you) BY THE MANAGEMENT.
            </p>

          </div>

          <div className='app__bookingpage_form_wrapper'>
            <form className='app__bookingpage_form' onSubmit={(e) => {makeBooking(e, bookingDetails, userData, navigate)}}>
              <div className='item1'>
                <FormInputDate
                  label="Prefered date  *"
                  selectionLimit={30}
                  defaultDate={bookingDetails.date === ""  ? currentDate() : bookingDetails.date}
                  setDate={(e)=>{setBookingDetails({...bookingDetails, date: e.target.value})}}
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
                  readonly={false}
                  onChangeFunction={(e) => { setBookingDetails({ ...bookingDetails, name: e.target.value }) }}
                />
              </div>



              <div className='item4'>
                <FormInput
                  label='Email  *'
                  inputType='text'
                  inputValue={bookingDetails.email}
                  required={true}
                  readonly={false}
                  onChangeFunction={(e) => { setBookingDetails({ ...bookingDetails, email: e.target.value }) }}
                />
              </div>

              <div className='item5'>
                <FormInput
                  label='Mobile Number  *'
                  inputType='text'
                  inputValue={bookingDetails.mobilenumber}
                  required={true}
                  readonly={false}
                  onChangeFunction={(e) => { setBookingDetails({ ...bookingDetails, mobilenumber: e.target.value }) }}
                />
              </div>

              <div className='item6'>
                <FormInput
                  label='Postcode  *'
                  inputType='text'
                  inputValue={bookingDetails.postcode}
                  required={true}
                  readonly={false}
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
                <button className='custom__button app__bookingpage_form_button'>SUBMIT</button>
              </div>


            </form>
          </div>

        </section>
      </section>



    </div>
  )
}

export default BookingPage
