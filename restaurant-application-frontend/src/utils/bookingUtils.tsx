import axios from "axios";
import { toast } from "react-toastify";
import { User, sendEmail } from "./appUtils";
import { NavigateFunction } from "react-router-dom";

// Defining the Booking Props
export type BookingProps = {
  userData: User;
}

// Defining the Booking details type
export type BookingDetails = {
  date: string | number;
  preferredGuests: number | string;
  name: string;
  email: string;
  mobilenumber: string;
  postcode: string;
  occasion: string | number;
  message: string;
};

// Creating the navigation function type
type NavigateFunctionType = NavigateFunction;

export const makeBooking = (e: React.FormEvent<HTMLFormElement>, bookingDetails: BookingDetails, user: User, navigationFunction: NavigateFunctionType) => {
  // Prevent automatic form refresh
  e.preventDefault();

  // If the user isn't logged in and has no data 
  if (user.name.length < 1) {
    toast.error("Please login to submit a booking!")
    return
  }
  // Creating a postData variable
  const postData = {
    user_id: user.id,
    preferred_date: bookingDetails.date,
    preferred_guests: bookingDetails.preferredGuests,
    occasion: bookingDetails.occasion,
    message: bookingDetails.message,
    status: "Pending"
  }

  // Sending Booking data to the backend
  axios.post(`/bookings`, postData)
    .then(response => {
      // Displaying success message
      toast.success(response.data.message);
      // Preparing the email data
      const emailValues = {
        logo_text: "LILA BROWN",
        logo_font: "'Playfair Display', serif",
        logo_color: "#FFD700",
        email_title: "Lila Brown Booking Submission.",
        user_name: user.name,
        email_to: user.email,
        notice: `This email was intended for ${user.name}'s booking confirmation, 
        if you're not the intended recipient of this email or didn't request this service please delete this email.`,
        email_body: `Your ${bookingDetails.occasion} booking, intended for ${bookingDetails.preferredGuests} guests, 
        on ${bookingDetails.date} has been successfully submitted and is currently pending. 
        We will reach out soon with updates concerning status change. Thank you.`
      }
      // Sending the booking submission email 
      sendEmail(emailValues, "Booking submission email sent!", "Something went wrong, booking submission email not sent!", "/", navigationFunction)

    })
    .catch(error => {
      if (error.response.data) {
        // Display the error message if it's sent from the backend
        toast.error(error.response.data.error);
      } else if (error) {
        // If no error message is sent from backend display a generic message
        toast.error(error.message);
      }
    })
}

// Defining a function that returns the current date
export const currentDate = () => {
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  return formattedToday
}