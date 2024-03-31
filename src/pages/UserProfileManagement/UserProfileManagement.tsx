import React, { useEffect, useState } from 'react'
import { UserProfileFormType, UserProfileManagementProps, updateProfile } from '../../utils/userProfileManagementUtils'
import { FormInput } from '../../components'

function UserProfileManagement({ userData, setUserData }: UserProfileManagementProps) {
    // Creating state variables for controlled form input
    const [profileData, setProfileData] = useState<UserProfileFormType>(
        {
            name: userData.name,
            email: userData.email,
            mobile_number: userData.mobile_number,
            postcode: userData.postcode,
            password: "",
            password_confirmation: ""
        }
    )


    useEffect(() => {
        // Using the hook to make profile data refresh
        setProfileData({
            name: userData.name,
            email: userData.email,
            mobile_number: userData.mobile_number,
            postcode: userData.postcode,
            password: "",
            password_confirmation: ""
        })
    }, [userData]);

    return (
        <div className='user_profile_management app__bg app__wrapper section_padding flex__center'>
            <div className='profile_wrapper'>
            <header className='profile_management_header'>
                <h3 className='headtext__playfair profile_header_title'>PROFILE</h3>
            </header>
            <form className='user_profile_form' onSubmit={(e) => {updateProfile(e, profileData, userData, setUserData)}}>
                <FormInput
                    label="Name"
                    inputType="text"
                    inputValue={profileData.name}
                    required={false}
                    readonly={false}
                    onChangeFunction={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
                <FormInput
                    label="Email"
                    inputType="email"
                    inputValue={profileData.email}
                    required={false}
                    readonly={false}
                    onChangeFunction={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />

                <FormInput
                    label="Mobile Number"
                    inputType="text"
                    inputValue={profileData.mobile_number}
                    required={false}
                    readonly={false}
                    onChangeFunction={(e) => setProfileData({ ...profileData, mobile_number: e.target.value })}
                />

                <FormInput
                    label="Postcode"
                    inputType="text"
                    inputValue={profileData.postcode}
                    required={false}
                    readonly={false}
                    onChangeFunction={(e) => setProfileData({ ...profileData, postcode: e.target.value })}
                />

                <FormInput
                    label="Password"
                    inputType="password"
                    inputValue={profileData.password}
                    required={false}
                    readonly={false}
                    onChangeFunction={(e) => setProfileData({ ...profileData, password: e.target.value })}
                />

                <FormInput
                    label="Password Confirmation"
                    inputType="password"
                    inputValue={profileData.password_confirmation}
                    required={false}
                    readonly={false}
                    onChangeFunction={(e) => setProfileData({ ...profileData, password_confirmation: e.target.value })}
                />

                <button type='submit' className='custom__button profile_form_button'>UPDATE</button>

            </form>

            </div>
           
        </div>
    )
}

export default UserProfileManagement
