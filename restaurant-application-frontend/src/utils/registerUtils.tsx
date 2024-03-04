import React from 'react';
import axios from "axios";
import {toast} from 'react-toastify';
import {User} from "./appUtils";

// defining the registerFormData type
export type RegisterFormData = {
    name: string;
    mobileNumber: string;
    email: string;
    password: string;
    confirmPassword: string

}

// Defining a function to register a user
export const registerUser = (e : React.FormEvent<HTMLFormElement>, registerData: RegisterFormData, setUserData: React.Dispatch<React.SetStateAction<User>>) => {
    // Preventing form reload 
    e.preventDefault();
    // Organizing the post data
    const postData = {
        name: registerData.name,
        mobile_number: registerData.mobileNumber,
        email: registerData.email,
        password: registerData.password,
        role: "client"
    }
    //sending user data to the backend
    axios.post("/users", postData)
    .then(response => {
        // Showing a success message
        toast.success("Registration Success!")
        console.log(response)
        // Setting the userData to the state variable
        setUserData(response.data); 
    })
    .catch(error => {
        if(error){
            toast.error("Something went wrong please try again!");
        }
    })
}

