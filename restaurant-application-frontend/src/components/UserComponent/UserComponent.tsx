import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserRowProps, deleteUser } from '../../utils/restaurantManagementPortalUtils'

function UserComponent({ userData, user, setTargetUser, targetUser, users, setUsers }: UserRowProps) {
    // Declaring navigation variable function
    const navigate = useNavigate()

    return (
        <div className='user_wrapper'>
            <section className='client_details_wrapper'>
                <h3 className='p__playfair section_hearder'>USER DETAILS</h3>
                <section className='client_details'>
                    <p className='p__inter client_detail'><b>Name:</b> {user.name}</p>
                    <p className='p__inter client_detail'><b>Email:</b> {user.email}</p>
                    <p className='p__inter client_detail'><b>Mobile:</b> {user.mobile_number}</p>
                    <p className='p__inter client_detail'><b>Postcode:</b> {user.postcode}</p>
                    <p className='p__inter client_detail'><b>Role:</b> {user.role}</p>
                </section>
            </section>

            <section className='user_buttons_wrapper'>
                {
                    (userData.role === "manager" && user.role !== "client") &&  <button className='custom__button user_button' onClick={() => {
                        window.scrollTo(0, 0)
                        setTargetUser(user)
                        navigate(window.location.href.includes("restaurant-management") ? "/restaurant-management/users-management/edit-user" : "/users-management/edit-user")
                    }}>EDIT</button>
                }
                {
                    (userData.role === "manager" && user.role !== "client") &&  <button className="custom__button user_delete_btn" onClick={() => {
                        deleteUser(targetUser, users, setUsers)
                    }}>DELETE</button>
                }

            </section>

        </div>
    )
}

export default UserComponent
