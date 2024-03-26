import React from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { User, parseJwt, getUserData } from "./appUtils";
import { NavigateFunction } from 'react-router-dom';
import { OrderType } from './menuPageUtils';
// import jwt_decode from 'jwt-decode';

// Defining the login props
export type LoginProps = {
    setUserData: React.Dispatch<React.SetStateAction<User>>;
    setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>;
}

// Defining the login form data type
export type LoginFormData = {
    email: string;
    password: string;
}

// Initializing the navigate function type
type NavigateFunctionType = NavigateFunction

// defining a function to login users
export const login = (e: React.FormEvent<HTMLFormElement>, loginData: LoginFormData, setUserData: React.Dispatch<React.SetStateAction<User>>, navigate: NavigateFunctionType, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>) => {

    // Preventing form reload 
    e.preventDefault();
    // Organizing the post data
    const postData = {
        email: loginData.email,
        password: loginData.password,
    }
    // Sending user data to the backend
    axios.post("/users/login", postData)
        .then(response => {
            // Showing a success message
            toast.success(response.data.message)
            
            // Saving the response token in localStorage
            const token = response.data.user;

            // Store the token in local storage
            localStorage.setItem('token', token);

            // Decode the token to get user ID
            const userId: number = parseJwt(token).userId;
           
            // Getting the userData
            getUserData(`/users/${userId}`, setUserData, setActiveOrder)

            // Navigate to homepage
            navigate("/")
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

