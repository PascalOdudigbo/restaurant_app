import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import { Link, useNavigate } from 'react-router-dom';
import { LoginFormData, LoginProps, login } from '../../utils/loginUtils';



function Login({setUserData, setActiveOrder}: LoginProps) {
    // creating state variables for controlled form inputs
    const [loginData, setLoginData] = useState<LoginFormData>({
        email: "",
        password: ""
    })

    // Defining a navigation variable function
    const navigate = useNavigate()

    return (
        <div className='login_wrapper flex__center'>
            <header className='login_header'>
                <h3 className='headtext__playfair login_header_title'>LOGIN</h3>
                <Link to="/" className='headtext__playfair login_header_close'>X</Link>
            </header>
            <form className='login_form' onSubmit={(e) => {login(e, loginData, setUserData, navigate, setActiveOrder)}}>
                <FormInput
                    label="Email *"
                    inputType="email"
                    inputValue={loginData.email}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />

                <FormInput
                    label="Password *"
                    inputType="password"
                    inputValue={loginData.password}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />

                <Link to="/forgot-password" className='p__inter login_form_forgotpassword'>forgot password?</Link>

                <button className='custom__button login_form_button'>LOGIN</button>
            </form>

        </div>
    )
}

export default Login
