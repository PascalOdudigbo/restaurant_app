import React from 'react';
import axios from "axios";
import {toast} from 'react-toastify';
import {User} from "./appUtils";

// Defining the login form data type
export type LoginFormData = {
    email: string;
    password: string;
}

// defining a function to login users
export const login = (e : React.FormEvent<HTMLFormElement>, loginData: LoginFormData, setUserData: React.Dispatch<React.SetStateAction<User>>) => {

    // Preventing form reload 
    e.preventDefault();
    // Organizing the post data
    const postData = {
        email: loginData.email,
        password: loginData.password,
    }
    //sending user data to the backend
    axios.post("/users/login", postData)
    .then(response => {
        // Showing a success message
        toast.success("Login Success!")
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