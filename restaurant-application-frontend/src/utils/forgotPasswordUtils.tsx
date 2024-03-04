import axios from "axios";
import {toast} from "react-toastify"

// definiing the forgot password form type
export type ForgotPasswordForm = {
    email: string
}

export const forgotPassword = (e : React.FormEvent<HTMLFormElement>, formData: ForgotPasswordForm) => {
    //preventing auto refresh
    e.preventDefault();

    axios.post("/users/recover-account", formData)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        if(error){
            console.log(error)
            // toast.error(error)
        }
    })

} 