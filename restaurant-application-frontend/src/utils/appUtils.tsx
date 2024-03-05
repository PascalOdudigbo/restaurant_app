import React from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { NavigateFunction } from 'react-router-dom';

// Creating the navigation function type
type NavigateFunctionType = NavigateFunction;


// Defining the user type
export type User = {
    id: number,
    name: string,
    mobile_number: string,
    postcode: string,
    email: string,
    password: string,
    role: string
}

// Initializaing emailJs variables
const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateID = process.env.REACT_APP_EMAILJS_EMAIL_TEMPLATE_ID_1;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// Defining the email values type
type EmailValues = Partial<{
    image_url: string,
    logo_text: string,
    logo_font: string,
    logo_color: string,
    email_title: string,
    user_name: string,
    email_to: string,
    notice: string,
    minor_body: string,
    email_body: string,
    button_color: string,
    button_link: string,
    button_text: string
    button_text_size: string,
    button_text_color: string
}>


// Creating a function to send multi-factor auth email 
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



