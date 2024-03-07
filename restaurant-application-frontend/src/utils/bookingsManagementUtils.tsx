import axios from "axios";
import { User } from "./appUtils";
import { toast } from "react-toastify";
import { BookingDetails } from "./bookingUtils";

// Defining the booking type
export type BookingType = {
    id: number,
    user_id: number,
    preferred_date: string | number;
    preferred_guests: number;
    occasion: string;
    message: string;
    status: string;
    user: User
}

// Defining the bookings type
export type BookingsType = BookingType[]

// Defining the bookingsManagementProps
export type BookingsManagementProps = {
    userData: User;
}

// Defining the booking table props
export type BookingTableProps = {
    userData: User;
    bookings: BookingsType;
    setTargetBooking: React.Dispatch<React.SetStateAction<BookingType>>;
    targetBooking: BookingType;
    setBookings: React.Dispatch<React.SetStateAction<BookingsType>>
}

// Defining the booking row props
export type BookingRowProps = {
    userData: User;
    booking: BookingType;
    setTargetBooking: React.Dispatch<React.SetStateAction<BookingType>>;
    targetBooking: BookingType;
    bookings: BookingsType;
    setBookings: React.Dispatch<React.SetStateAction<BookingsType>>
}

// Defining edit booking props
export type EditBookingProps = {
    targetBooking: BookingType;
    setBookings: React.Dispatch<React.SetStateAction<BookingsType>>;
}

// Defining a function to get all bookings 
export const getAllBookings = (setBookings: React.Dispatch<React.SetStateAction<BookingsType>>) => {
    axios.get("/bookings")
    .then(response => {
        // Setting bookings data to the state variable
        setBookings(response.data)
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

// Defining a function to edit a booking
export const editBooking = (e: React.FormEvent<HTMLFormElement>, targetBooking: BookingType, bookingDetails: BookingDetails, setBookings: React.Dispatch<React.SetStateAction<BookingsType>>) => {
     // Preventing form auto-refresh
     e.preventDefault();

     // Defining the postData
     let postData = {
        preferred_date: bookingDetails.date,
        preferred_guests: bookingDetails.preferredGuests,
        occasion: bookingDetails.occasion,
        message: bookingDetails.message,
     }
     
    
     axios.put(`/bookings/${targetBooking.id}`, postData)
         .then(response => {
             // Showing a success message
             toast.success(response.data.message)
             // Getting all the bookings data
             getAllBookings(setBookings)
 
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

// Defining a function to handle deleting booking
export const deleteBooking = (targetBooking: BookingType, bookings: BookingsType, setBookings: React.Dispatch<React.SetStateAction<BookingsType>>) => {

    axios.delete(`/bookings/${targetBooking.id}`)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Removing the deleted booking from the bookings state 
            const filteredBookings = bookings.filter(booking => booking.id !== targetBooking.id)
            // Setting the filtered bookings
            setBookings(filteredBookings)

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