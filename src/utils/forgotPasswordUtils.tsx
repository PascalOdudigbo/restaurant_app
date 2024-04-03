import React from "react";
import axios from "axios";
import { toast } from "react-toastify"
import { API_BASE_URL, User, sendEmail } from "./appUtils";
import { NavigateFunction } from 'react-router-dom';

// Creating the navigation function type
type NavigateFunctionType = NavigateFunction;


// Defining the forgot password form type
export type ForgotPasswordForm = {
    email: string;
}

// Account recovery link
const recoveryLink = "http://localhost:4000/recover-account/"

export const forgotPassword = (e: React.FormEvent<HTMLFormElement>, formData: ForgotPasswordForm, navigationFunction: NavigateFunctionType) => {
    // Preventing auto refresh
    e.preventDefault();

    axios.post(API_BASE_URL + "/users/recover-account", formData)
        .then(response => {
            // Showing success message when user email is found
            toast.success(response.data.message);
            // Storing the user data in a variable
            const user: User = response.data.user
            // Creating the email values object
            const emailValues = {
                logo_text: "LILA BROWN",
                logo_font: "'Playfair Display', serif",
                logo_color: "#FFD700",
                email_title: "Account Recovery Email",
                user_name: user.name,
                email_to: user.email,
                notice: `This email was intended for ${user.name}'s account recovery, if you're not the intended recipient of this email or didn't request this service please delete this email.`,
                email_body: "Forgot your password? don't sweat it. Please click on the button below to recover your account!",
                button_color: "#FFD700",
                button_link: recoveryLink + user.id,
                button_text: "CONFIRM",
                button_text_size: "18px",
                button_text_color: "#000000"
            }

            // Send an account recovery email
            sendEmail(emailValues, "Recovery Email Sent!", "Something went wrong, recovery email not sent!", "/", navigationFunction)
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