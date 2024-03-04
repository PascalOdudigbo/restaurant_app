import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import { Link } from 'react-router-dom';
import {registerUser, RegisterFormData} from '../../utils/registerUtils';
import {User} from "../../utils/appUtils";

type RegisterProps = {
    setUserData: React.Dispatch<React.SetStateAction<User>>
}

function Register({setUserData}: RegisterProps) {
    // creating state variables for controlled form inputs
    const [registerData, setRegisterData] = useState<RegisterFormData>({
        name: "",
        mobileNumber: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    
    return (
        <div className='register_wrapper flex__center'>
            <header className='register_header'>
                <h3 className='headtext__playfair register_header_title'>REGISTER</h3>
                <Link to="/" className='headtext__playfair register_header_close'>X</Link>
            </header>
            <form className='register_form' onSubmit={(e)=>{console.log("clicked");registerUser(e, registerData, setUserData)}}>
                <FormInput
                    label='Name  *'
                    inputType='text'
                    inputValue={registerData.name}
                    required={true}
                    onChangeFunction={(e) => { setRegisterData({ ...registerData, name: e.target.value }) }}
                />

                <FormInput
                    label='Mobile Number  *'
                    inputType='text'
                    inputValue={registerData.mobileNumber}
                    required={true}
                    onChangeFunction={(e) => { setRegisterData({ ...registerData, mobileNumber: e.target.value }) }}
                />
                <FormInput
                    label="Email *"
                    inputType="email"
                    inputValue={registerData.email}
                    required={true}
                    onChangeFunction={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />

                <FormInput
                    label="Password *"
                    inputType="password"
                    inputValue={registerData.password}
                    required={true}
                    onChangeFunction={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />

                <FormInput
                    label="Confirm Password *"
                    inputType="password"
                    inputValue={registerData.confirmPassword}
                    required={true}
                    onChangeFunction={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                />


                <button type="submit" className='custom__button register_form_button'>REGISTER</button>
            </form>

        </div>
    )
}

export default Register
