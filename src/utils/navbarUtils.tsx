import { NavigateFunction } from "react-router-dom";
import { User } from "./appUtils"
import { toast } from "react-toastify";
import { OrderType } from "./menuPageUtils";

// Defining the navbar props
export type NavbarProps = {
    userData: User;
    setUserData: React.Dispatch<React.SetStateAction<User>>;
    activeOrder: OrderType;
}

// Declaring the navigate function type
type NavigateFunctionType = NavigateFunction

// A function to logout users
export const handleLogout = (setUserData: React.Dispatch<React.SetStateAction<User>>, navigate: NavigateFunctionType) => {
    try {
        // Remove the JWT token from the local storage
        localStorage.removeItem("token");
        
        // Reset the user data
        setUserData({
            id: 0,
            name: "",
            mobile_number: "",
            postcode: "",
            email: "",
            password: "",
            role: ""
        })

        // Display success message
        toast.success("Logout successful!")

        // Navigate to the homepage
        navigate("/")

    } catch (error) {
        if (error) {
            // Display failure message
            toast.success("Something went wrong, Logout failed!")
        }
    }
}