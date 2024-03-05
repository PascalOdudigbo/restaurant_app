import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import { Link, useNavigate } from 'react-router-dom';
import { ForgotPasswordForm, forgotPassword } from '../../utils/forgotPasswordUtils';

function ForgotPassword() {
    // Defining the form state variables for controlled form inputs
    const [formData, setFormData] = useState<ForgotPasswordForm>({
        email: ""
    })

    // Creating the navigation variable function
    const navigate = useNavigate();

    return (
        <div className='forgot_password_wrapper flex__center'>
            <header className='forgot_password_header'>
                <h3 className='headtext__playfair forgot_password_header_title'>FORGOT PASSWORD</h3>
                <Link to="/" className='headtext__playfair forgot_password_header_close'>X</Link>
            </header>

            <form className='forgot_password_form' onSubmit={(e) => { forgotPassword(e, formData, navigate)}}>
                <FormInput
                    label="Email *"
                    inputType="email"
                    inputValue={formData.email}
                    required={true}
                    onChangeFunction={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <button className='custom__button forgot_password_form_button'>SUBMIT</button>
            </form>

        </div>
    )
}

export default ForgotPassword
