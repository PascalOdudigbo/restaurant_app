import React, { useState } from 'react'
import { Dropdown, Search, UserRow } from ".."
import { FaFilter } from "react-icons/fa";
import { Tooltip } from '@mui/material';
import { IconContext } from 'react-icons';
import { UsersTableProps, filterUsers } from '../../utils/restaurantManagementPortalUtils';

function UsersTable({ userData, users, setTargetUser, targetUser, setUsers, handleSearchOnChange }: UsersTableProps) {
    // Declaring state variables for filtering bookings
    const [filterValue, setFilterValue] = useState<string | number>("All")
    return (
        <div className='users_table_wrapper'>
            <div className="search_wrapper">
                {
                    userData.role === "manager" &&
                    <Search
                        placeholderText={"User name..."}
                        handleOnChange={handleSearchOnChange}
                    />
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

            <table className="users_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className="p__inter table_header">NAME</th>
                        <th className="p__inter table_header">EMAIL</th>
                        <th className="p__inter table_header">MOBILE</th>
                        <th className="p__inter table_header">POSTCODE</th>
                        <th className="p__inter table_header">ROLE</th>
                        <th className="p__inter table_header">ACTION</th>
                    </tr>
                </thead>

                <tbody className='table_body'>
                    {users?.map((user) => (
                        user.role !== "manager" &&
                        <UserRow
                            key={users.indexOf(user)}
                            userData={userData}
                            user={user}
                            setTargetUser={setTargetUser}
                            targetUser={targetUser}
                            users={users}
                            setUsers={setUsers}
                        />
                    ))}
                </tbody>
            </table>
            {users?.length < 1 && <h3 className="p__inter no_users_text">NO USERS</h3>}

        </div>
    )
}

export default UsersTable
