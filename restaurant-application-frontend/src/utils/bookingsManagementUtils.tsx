import axios from "axios";
import { User, sendEmail } from "./appUtils";
import { toast } from "react-toastify";
import { BookingDetails } from "./bookingUtils";
import { NavigateFunction } from "react-router-dom";

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

// Creating the navigation function type
type NavigateFunctionType = NavigateFunction;

// Defining the bookingsManagementProps
export type BookingsManagementProps = {
    userData: User;
    bookings: BookingsType;
    setBookings: React.Dispatch<React.SetStateAction<BookingsType>>;
}

// Defining the booking table props
export type BookingTableProps = {
    userData: User;
    bookings: BookingsType;
    setTargetBooking: React.Dispatch<React.SetStateAction<BookingType>>;
    targetBooking: BookingType;
    setBookings: React.Dispatch<React.SetStateAction<BookingsType>>
    handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => void;
    bookingStatus: boolean;
    setBookingStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

// Defining the booking row props
export type BookingRowProps = {
    userData: User;
    booking: BookingType;
    setTargetBooking: React.Dispatch<React.SetStateAction<BookingType>>;
    targetBooking: BookingType;
    bookings: BookingsType;
    setBookings: React.Dispatch<React.SetStateAction<BookingsType>>;
    bookingStatus: boolean;
    setBookingStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

// Defining edit booking props
export type EditBookingProps = {
    targetBooking: BookingType;
    setBookings: React.Dispatch<React.SetStateAction<BookingsType>>;
}

// Defining approve or decline booking
export type ApproveOrDeclineBookingProps = {
    bookingStatus: boolean;
    targetBooking: BookingType;
    setBookings: React.Dispatch<React.SetStateAction<BookingsType>>;
}

// Defining a function to get all bookings 
export const getAllBookings = (setBookings: React.Dispatch<React.SetStateAction<BookingsType>>) => {
    axios.get("/bookings")
        .then(response => {
            // Setting bookings data to the state variable
            setBookings(response.data)
            localStorage.setItem("bookingsCount", response.data.length)
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

// Defining a function to get all bookings for a specific user
export const getBookingsByUserId = (userId: number, setBookings: React.Dispatch<React.SetStateAction<BookingsType>>) => {
    axios.get(`/bookings/user/${userId}`)
    .then(response => {
        // Setting bookings data to the state variable
        setBookings(response.data)
        localStorage.setItem("bookingsCount", response.data.length)
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


// Defining a function to search bookings
export const searchBookings = (searchData: string, bookings: BookingsType, setBookings: React.Dispatch<React.SetStateAction<BookingsType>>) => {
    if (searchData === "") {
        getAllBookings(setBookings)
    }
    else {
        // Filtering the bookings to get bookings where the client name is similar to search input
        let filteredData = bookings.filter(booking => booking.user.name.toLowerCase().includes(searchData.toLowerCase()));
        setBookings(filteredData);
    }
}

// Defining a function to handle filter bookings
export const filterBookings = (userData: User, filterData: string, bookings: BookingsType, setBookings: React.Dispatch<React.SetStateAction<BookingsType>>) => {
    const bookingsCountStr = localStorage.getItem("bookingsCount");
    const bookingsCount = bookingsCountStr ? parseInt(bookingsCountStr) : 0;

    if (filterData === "All") {
        userData.role === "client" ? getBookingsByUserId(userData.id, setBookings) : getAllBookings(setBookings);
    } else {
        let filteredBookings: BookingsType;
        if (bookings.length < bookingsCount) {
            userData.role === "client" ? getBookingsByUserId(userData.id, setBookings) : getAllBookings(setBookings);
            filteredBookings = bookings.filter(booking => booking.status === filterData);
        } else {
            filteredBookings = bookings.filter(booking => booking.status === filterData);
        }
        setBookings(filteredBookings);
    }
}

// A function to approve or decline a booking
export const approveOrDeclineBooking = (e: React.FormEvent<HTMLFormElement>, targetBooking: BookingType, status: boolean, message: string, setBookings: React.Dispatch<React.SetStateAction<BookingsType>>, navigationFunction: NavigateFunctionType) => {
    // Preventing form auto-refresh
    e.preventDefault();

    // Defining the postData
    let postData = {
        status: status ? "Approved" : "Declined"
    }


    axios.patch(`/bookings/${targetBooking.id}`, postData)
        .then(response => {
            // Showing a success message
            toast.success(status ? "Booking approved successfully!" : "Booking declined successfully!")
            // Preparing the email data
            const emailValues = {
                logo_text: "LILA BROWN",
                logo_font: "'Playfair Display', serif",
                logo_color: "#FFD700",
                email_title: `Lila Brown Booking ${status ? "Approved" : "Declined"}.`,
                user_name: targetBooking.user.name,
                email_to: targetBooking.user.email,
                notice: `This email was intended for ${targetBooking.user.name}'s booking confirmation, 
        if you're not the intended recipient of this email or didn't request this service please delete this email.`,
                email_body: `Concerning your booking against ${targetBooking.preferred_date.toString().split("T")[0]} for ${targetBooking.occasion} you have a new message from the Lila Brown management:
                ${message}
                `
            }
            // Sending the booking submission email 
            sendEmail(emailValues, `Booking ${status ? "approval" : "decline"} email sent!`, `Something went wrong, booking ${status ? "approval" : "decline"} email not sent!`, "/restaurant-management/bookings-management", navigationFunction)


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