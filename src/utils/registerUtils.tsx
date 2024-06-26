import React from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { API_BASE_URL } from './appUtils';

// Defining the registerFormData type
export type RegisterFormData = {
    name: string;
    mobileNumber: string;
    email: string;
    postcode: string;
    password: string;
    confirmPassword: string;
}

// Defining a function to register a user
export const registerUser = (e: React.FormEvent<HTMLFormElement>, registerData: RegisterFormData) => {
    // Preventing form reload 
    e.preventDefault();
    // Organizing the post data
    const postData = {
        name: registerData.name,
        mobile_number: registerData.mobileNumber,
        email: registerData.email,
        postcode: registerData.postcode,
        password: registerData.password,
        role: "client"
    }
    // Sending user data to the backend
    axios.post(API_BASE_URL + "/users", postData)
        .then(response => {
            // Showing a success message
            toast.success("Registration Success!")
            console.log(response)
        })
        .catch(error => {
            if (error.response.data) {
                // Display the error message if it's sent from the backend
                toast.error(error.response.data.error);
            } else if (error) {
                toast.error("Something went wrong please try again!");
            }
        })
}

