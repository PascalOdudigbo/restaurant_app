import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { AddUserFormType, AddUserProps, createUser } from '../../utils/restaurantManagementPortalUtils';
import Dropdown from '../Dropdown/Dropdown';

function AddUser({users, setUsers}: AddUserProps) {
    // creating state variables for controlled form inputs
    const [userData, setUserData] = useState<AddUserFormType>({
        name: "",
        mobileNumber: "",
        email: "",
        postcode: "",
        role: "",
        password: "",
        confirmPassword: ""
    })

    // Declaring navigation variable function
    // const navigate = useNavigate()



    return (
        <div className='add_user_wrapper flex__center'>
            <header className='add_user_header'>
                <h3 className='headtext__playfair add_user_header_title'>ADD USER</h3>
                <Link to="/restaurant-management/users-management" className='headtext__playfair add_user_header_close'>X</Link>
            </header>
            <form className='add_user_form' onSubmit={(e) => { console.log("clicked"); createUser(e, userData, users, setUsers) }}>
                <FormInput
                    label='Name  *'
                    inputType='text'
                    inputValue={userData.name}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => { setUserData({ ...userData, name: e.target.value }) }}
                />

                <FormInput
                    label='Mobile Number  *'
                    inputType='text'
                    inputValue={userData.mobileNumber}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => { setUserData({ ...userData, mobileNumber: e.target.value }) }}
                />

                <FormInput
                    label="Email *"
                    inputType="email"
                    inputValue={userData.email}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => setUserData({ ...userData, email: e.target.value })}
                />

                <FormInput
                    label='Postcode  *'
                    inputType='text'
                    inputValue={userData.postcode}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => { setUserData({ ...userData, postcode: e.target.value }) }}
                />

                <Dropdown
                    label={"Role *"}
                    items={["Chef", "Attendant"]}
                    buttonText={userData.role}
                    clickFunction={(data) => {
                        setUserData({...userData, role: data.toString()})
                    }}
                />

                <FormInput
                    label="Password *"
                    inputType="password"
                    inputValue={userData.password}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => setUserData({ ...userData, password: e.target.value })}
                />

                <FormInput
                    label="Confirm Password *"
                    inputType="password"
                    inputValue={userData.confirmPassword}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                />

                <button type="submit" className='custom__button add_user_form_button'>SAVE</button>
            </form>

        </div>
    )
}

export default AddUser
