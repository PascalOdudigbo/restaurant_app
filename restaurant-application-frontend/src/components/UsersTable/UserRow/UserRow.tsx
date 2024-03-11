import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { SlOptions } from "react-icons/sl"
import { useNavigate } from 'react-router-dom'
import { UserRowProps, deleteUser } from '../../../utils/restaurantManagementPortalUtils'

function UserRow({ userData, user, setTargetUser, targetUser, users, setUsers }: UserRowProps) {
    // Declaring state variables to manage dropdown display
    const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")
    // Declaring navigation variable function
    const navigate = useNavigate()

    return (
        <tr className="row_wrapper">
            <td className="row_cell">{user.name}</td>
            <td className="row_cell">{user.email}</td>
            <td className="row_cell">{user.mobile_number}</td>
            <td className="row_cell">{user.postcode}</td>
            <td className="row_cell">{user.role}</td>
            <td className="row_cell">
                <div className="dropdown">
                    <IconContext.Provider value={{ size: '20px', className: "dropdown_icon" }}>
                        <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} />
                    </IconContext.Provider>
                    <div className="dropdown_content" style={{ display: dropdownDisplay }}>
                        {
                            (userData.role === "manager" && user.role !== "client") && <button className='dropdown_item' onClick={() => {
                                window.scrollTo(0, 0)
                                setTargetUser(user)
                                navigate(window.location.href.includes("restaurant-management") ? "/restaurant-management/users-management/edit-user" : "/users-management/edit-user")
                            }}>EDIT</button>
                        }
                        {
                            (userData.role === "manager" && user.role !== "client") && <button className="delete_btn" onClick={() => {
                                deleteUser(targetUser, users, setUsers)
                            }}>DELETE</button>
                        }
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default UserRow
