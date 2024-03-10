import React from "react";
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { UserSignedInDropdownProps } from "../../utils/userSignedInDropdownUtils";
import { handleLogout } from "../../utils/navbarUtils";

function UserSignedInDropdown({ userData, setUserData }: UserSignedInDropdownProps) {

    // Creating navigation variable function
    const navigate = useNavigate();

    return (
        <div className="dropdownContainer">

            <div className="dropdownBtnAndNameContainer">
                <button className="dropdownBtn">{
                    <IconContext.Provider value={{ size: '26px' }}>
                        <FaUserCircle />
                    </IconContext.Provider>
                }</button>

                <p className="dropdownName">{userData?.name}</p>
            </div>

            <div className='dropdownLinksContainer'>
                
                    <button className="dropdownBtn p__inter" onClick={() => navigate("/profile-management")}>Your Profile</button>
                
                {
                    userData?.role === "client" && <button className="dropdownBtn p__inter" onClick={() => navigate("/bookings-management")}>Bookings</button>
                }

                {
                    userData?.role === "manager" && <button className="dropdownBtn p__inter" onClick={() => navigate("/restaurant-management")}>Restaurant Management</button>
                }

                {
                    (userData?.role === "chef" ||  userData?.role === "attendant") && <button className="dropdownBtn p__inter" onClick={() => navigate("/kitchen")}>Kitchen</button>
                }

                {
                    <button className="dropdownLogoutBtn" onClick={() => handleLogout(setUserData, navigate)}>Logout</button>
                }

            </div>

        </div>
    );
}
export default UserSignedInDropdown;