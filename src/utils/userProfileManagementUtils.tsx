import { toast } from "react-toastify"
import { User } from "./appUtils"
import axios from "axios"

export type UserProfileManagementProps = {
    userData: User;
    setUserData: React.Dispatch<React.SetStateAction<User>>;
}

export type UserProfileFormType = {
    name: string;
    email: string;
    mobile_number: string;
    postcode: string;
    password: string;
    password_confirmation: string;
}

// Creating the post data type
type PostDataType = Partial<{
    name: string;
    email: string;
    mobile_number: string;
    postcode: string;
    password: string;
}>

// A function to update the user profile
export const updateProfile = (e: React.FormEvent<HTMLFormElement>, profileData: UserProfileFormType, userData: User, setUserData: React.Dispatch<React.SetStateAction<User>>) => {
    // Preventing form auto-refresh
    e.preventDefault();

    // Defining the postData
    let postData: PostDataType = {
        name: profileData.name,
        email: profileData.email,
        mobile_number: profileData.mobile_number,
        postcode: profileData.postcode
    }
    // Check if user password has been updated
    if (profileData.password !== "" && profileData.password_confirmation !== "") {
        // Check to see if password and password confirmation are equal
        if (profileData.password !== profileData.password_confirmation) {
            toast.error("Password and password confirmation don't match!")
            return
        }

        // Modify the post data to include new password
        postData = {
            name: profileData.name,
            email: profileData.email,
            mobile_number: profileData.mobile_number,
            postcode: profileData.postcode,
            password: profileData.password
        }
    }
   
    axios.put(`/users/${userData.id}`, postData)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            // Setting the updated user data
            setUserData(response.data.user)

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



