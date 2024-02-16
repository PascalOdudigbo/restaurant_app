import React, { useState } from 'react'

type BookingDetails = {
  date: string;
  preferedGuests: number;
  name: string;
  email: string;
  mobilenumber: string;
  postcode: string;
  occasion: string;
  message: string;
};

function BookingPage() {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    date: "",
    preferedGuests: 0,
    name: "",
    email: "",
    mobilenumber: "",
    postcode: "",
    occasion: "",
    message: "",
  })
  
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

            <div>
              <form>

              </form>
            </div>

          </div>

        </section>
      </section>



    </div>
  )
}

export default BookingPage
