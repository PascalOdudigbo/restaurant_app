import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import { Link } from 'react-router-dom';

type LoginFormData = {
    email: string;
    password: string;
}
function Login() {
    // creating state variables for controlled form inputs
    const [loginData, setLoginData] = useState<LoginFormData>({
        email: "",
        password: ""
    })

    return (
        <div className='login_wrapper flex__center'>
            <header className='login_header'>
                <h3 className='headtext__playfair login_header_title'>Login</h3>
                <Link to="/" className='headtext__playfair login_header_close'>X</Link>
            </header>
            <form className='login_form'>
                <FormInput
                    label="Email *"
                    inputType="email"
                    inputValue={loginData.email}
                    required={true}
                    onChangeFunction={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />

                <FormInput
                    label="Password *"
                    inputType="password"
                    inputValue={loginData.password}
                    required={true}
                    onChangeFunction={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />

                <p className='p__inter login_form_forgotpassword'>forgot password?</p>

                <button className='custom__button login_form_button'>Login</button>
            </form>

        </div>
    )
}

export default Login
