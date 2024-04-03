import React from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { NavigateFunction } from 'react-router-dom';
import axios from "axios";
import { OrderType, getUsersActiveOrder } from "./menuPageUtils";

// Creating the navigation function type
type NavigateFunctionType = NavigateFunction;

// Declaring the base url 
export const API_BASE_URL = "http://127.0.0.1:10049"

// Defining the user type
export type User = {
    id: number;
    name: string;
    mobile_number: string;
    postcode: string;
    email: string;
    password: string;
    role: string;
    orders?: OrderType[]

}

// Initializaing emailJs variables
const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateID = process.env.REACT_APP_EMAILJS_EMAIL_TEMPLATE_ID_1;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// Defining the email values type
type EmailValues = Partial<{
    image_url: string;
    logo_text: string;
    logo_font: string;
    logo_color: string;
    email_title: string;
    user_name: string;
    email_to: string;
    notice: string;
    minor_body: string;
    email_body: string;
    button_color: string;
    button_link: string;
    button_text: string;
    button_text_size: string;
    button_text_color: string;
}>


// Creating a function to send email 
export const sendEmail = (emailValues: EmailValues, successMessage: string, errorMessage: string, navigationRoute: string, navigate: NavigateFunctionType) => {
    if (!serviceID || !templateID || !publicKey) {
        // If environment variables are not properly set
        console.error('Environment variables for email service are not set properly');
        return;
    }

    emailjs.send(serviceID, templateID, emailValues, publicKey).then(
        () => {
            // Display a success message when the email is sent successfully
            toast.success(successMessage);
            // Navigate to the next appropriate page
            navigate(navigationRoute)
        },
        (err) => {
            // Display the error message if the email doesn't send
            toast.error(errorMessage)
        }
    );
}

// Creating a function to send email 
export const sendEmailNoNavigate = (emailValues: EmailValues, successMessage: string, errorMessage: string) => {
    if (!serviceID || !templateID || !publicKey) {
        // If environment variables are not properly set
        console.error('Environment variables for email service are not set properly');
        return;
    }

    emailjs.send(serviceID, templateID, emailValues, publicKey).then(
        () => {
            // Display a success message when the email is sent successfully
            toast.success(successMessage);
        },
        (err) => {
            // Display the error message if the email doesn't send
            toast.error(errorMessage)
        }
    );
}


// Function to check if user is logged in
export const isLoggedIn = (setUserData: React.Dispatch<React.SetStateAction<User>>, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>): boolean => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
        // No token found
        return false;
    }

    // Check if token is expired
    const decodedToken: any = parseJwt(token);
    if (!decodedToken || Date.now() >= decodedToken?.exp * 1000) {
        // Token is expired remove expired token
        localStorage.removeItem('token'); 
        return false;

    }

    // User is logged in get the userData
    getUserData(`/users/${decodedToken?.userId}`, setUserData, setActiveOrder)
    return true
};

// A function to decode JWT tokens manually
export const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token?.split('.')[1]));
    } catch (e) {
        return null;
    }
};


// A function to get user data 
export const getUserData = (route: string, setUserData: React.Dispatch<React.SetStateAction<User>>, setActiveOrder: React.Dispatch<React.SetStateAction<OrderType>>) => {
    axios.get(API_BASE_URL + `${route}`)
        .then(response => {
            // Setting user data to the state variable
            setUserData(response.data)
            getUsersActiveOrder(response.data, setActiveOrder)
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

