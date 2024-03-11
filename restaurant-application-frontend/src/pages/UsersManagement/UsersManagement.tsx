import React, { useEffect, useState } from 'react'
import { User } from '../../utils/appUtils'
import { Route, Routes } from 'react-router-dom'
import { Dropdown, Search, UserComponent, UsersTable } from '../../components'
import { Tooltip } from '@mui/material'
import { IconContext } from 'react-icons'
import { FaFilter } from 'react-icons/fa'
import { UsersManagementProps, filterUsers, getAllUsers, searchUsers } from '../../utils/restaurantManagementPortalUtils'
import AddUser from '../../components/AddUser/AddUser'
import EditUser from '../../components/EditUser/EditUser'

function UsersManagement({userData}: UsersManagementProps) {

    // Creating state variables to hold users
    const [users, setUsers] = useState<User[]>([])
    // Creating state variables to hold target users
    const [targetUser, setTargetUser] = useState<User>({
        id: 0,
        name: "",
        mobile_number: "",
        postcode: "",
        email: "",
        password: "",
        role: ""
    })
    // Declaring state variables for filtering users
    const [filterValue, setFilterValue] = useState<string | number>("All")
   
    // Defining a function to handle search input value change
    const handleUserSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => {
        setSearchData(e.target.value);
        const searchValue = e.target.value;
        searchUsers(searchValue, users, setUsers)
    }

    useEffect(() => {
        //Getting all the users
        getAllUsers(setUsers);

    }, [])

    return (
        <div className='users_management app__bg app__wrapper section_padding flex__center'>
            <section className='heading_wrapper'>
                <h1 className='headtext__playfair usersManagementPage_heading'>{userData.role === "manager" ? "USERS" : "MY USERS"}</h1>
            </section>
            <section className='users_management_edit_user_wrapper flex__center'>
                <Routes>
                    <Route path="/add-user" element={<AddUser users={users} setUsers={setUsers}/>} />
                    <Route path="/edit-user" element={<EditUser targetUser={targetUser} setUsers={setUsers}/>} />
                </Routes>
            </section>

            <section className='users_table_wrapper'>
                <UsersTable
                    userData={userData}
                    users={users}
                    setTargetUser={setTargetUser}
                    targetUser={targetUser}
                    setUsers={setUsers}
                    handleSearchOnChange={handleUserSearchOnChange}
                />
            </section>

            <section className='mobile_view_wrapper'>
                <div className="search_and_filter_wrapper">
                    {
                        userData.role === "manager" &&
                        <section className='search_wrapper'>
                            <Search
                                placeholderText={"Client name..."}
                                handleOnChange={handleUserSearchOnChange}
                            />
                        </section>
                    }

                    <Tooltip title="Filter Users" arrow>
                        <section className='filterWrapper'>

                            <IconContext.Provider value={{ className: "filter_icon" }}>
                                <FaFilter />
                            </IconContext.Provider>

                            <Dropdown
                                label={""}
                                items={["All", "Client", "Chef", "Attendant"]}
                                buttonText={filterValue}
                                clickFunction={(data) => {
                                    setFilterValue(data)
                                    filterUsers(data.toString(), users, setUsers)
                                }}
                            />
                        </section>
                    </Tooltip>
                </div>

                <section className='mobile_users_wrapper'>
                    {users.map(user =>
                        <UserComponent
                            key={users.indexOf(user)}
                            userData={userData}
                            user={user}
                            setTargetUser={setTargetUser}
                            targetUser={targetUser}
                            users={users}
                            setUsers={setUsers}
                         />)}

                </section>

            </section>
        </div>
    )
}

export default UsersManagement
