import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { EditUserFormType, EditUserProps, editUser } from '../../utils/restaurantManagementPortalUtils';
import Dropdown from '../Dropdown/Dropdown';

function EditUser({targetUser, setUsers }: EditUserProps) {
    // creating state variables for controlled form inputs
    const [userData, setUserData] = useState<EditUserFormType>({
        name: targetUser.name ? targetUser.name : "",
        mobileNumber: targetUser.mobile_number ? targetUser.mobile_number : "",
        email: targetUser.email ? targetUser.email : "",
        postcode: targetUser.postcode ? targetUser.postcode : "",
        role: targetUser.role ? targetUser.role : "",
    })

    // Declaring navigation variable function
    const navigate = useNavigate()

    useEffect(() => {
        targetUser.id < 1 && navigate("/restaurant-management/users-management")
    }, [targetUser, navigate])

    return (
        <div className='edit_user_wrapper flex__center'>
            <header className='edit_user_header'>
                <h3 className='headtext__playfair edit_user_header_title'>UPDATE USER</h3>
                <Link to="/restaurant-management/users-management" className='headtext__playfair edit_user_header_close'>X</Link>
            </header>
            <form className='edit_user_form' onSubmit={(e) => { console.log("clicked"); editUser(e, targetUser, userData, setUsers) }}>
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

                <button type="submit" className='custom__button edit_user_form_button'>UPDATE</button>
            </form>

        </div>
    )
}

export default EditUser
