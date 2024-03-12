import { Badge, Tooltip } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons';
import { AiFillDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { BookingsManagement, TablesManagement, UsersManagement } from '../';
import { BookingsType, getAllBookings } from '../../utils/bookingsManagementUtils';
import { ManagerDashboard } from '../../components';
import { User } from '../../utils/appUtils';
import { RestaurantManagementProps, Table, getAllTables, getAllUsers } from '../../utils/restaurantManagementPortalUtils';



function RestaurantManagementPortal({ userData }: RestaurantManagementProps) {
  // Creating state variables to hold users
  const [users, setUsers] = useState<User[]>([])
  // Creating state variables to hold bookings
  const [bookings, setBookings] = useState<BookingsType>([])
  // Creating state variables to hold tables
  const [tables, setTables] = useState<Table[]>([])

  // Declaring navigation variable function
  const navigate = useNavigate();

  useEffect(() => {
    //Getting all the users
    userData.role === "manager" && getAllUsers(setUsers);
    //Getting all Bookings
    userData.role === "manager" && getAllBookings(setBookings);
    //Getting all Tables
    userData.role === "manager" && getAllTables(setTables);

  }, [userData])

  return (
    <div className='restaurantManagementPortal_wrapper app__bg app__wrapper section_padding'>

      <section className='portal_navigation_menu'>
        <Tooltip title="Dashboard" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { navigate("/restaurant-management/") }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <AiFillDashboard />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

        <Tooltip title="Users Management" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { navigate("/restaurant-management/users-management") }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <FaUser />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

        <Tooltip title="Bookings Management" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { navigate("/restaurant-management/bookings-management") }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <FaCalendarAlt />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

        <Tooltip title="Tables Management" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { navigate("/restaurant-management/tables-management") }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <MdTableRestaurant />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

        <Tooltip title="Menu Management" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <MdMenuBook />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

        <Tooltip title="Order Management" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <GiShoppingBag />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

      </section>

      <section className='sub_pages_wrapper'>
        <Routes>
          <Route path='/' element={
            <ManagerDashboard
              userData={userData}
              totalBookings={bookings.length}
              totalClients={0}
              totalMenuCategories={0}
              totalPendingBookings={0}
              totalMenuItems={0}
              totalOrders={0}
            />
          } />
          <Route path='/users-management/*' element={<UsersManagement userData={userData} users={users} setUsers={setUsers} />} />
          <Route path='/bookings-management/*' element={<BookingsManagement userData={userData} bookings={bookings} setBookings={setBookings}/>} />
          <Route path='/tables-management/*' element={<TablesManagement userData={userData} tables={tables} setTables={setTables}/>} />

        </Routes>
      </section>

      <section className='portal_navigation_menu_mobile'>
        <Tooltip title="Dashboard" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { navigate("/restaurant-management/") }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <AiFillDashboard />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

        <Tooltip title="Users Management" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { navigate("/restaurant-management/users-management") }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <FaUser />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

        <Tooltip title="Bookings Management" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { navigate("/restaurant-management/bookings-management") }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <FaCalendarAlt />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

        <Tooltip title="Tables Management" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { navigate("/restaurant-management/tables-management") }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <MdTableRestaurant />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

        <Tooltip title="Menu Management" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <MdMenuBook />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

        <Tooltip title="Order Management" arrow>
          <Badge color="secondary" badgeContent={0} onClick={() => { }}>
            <IconContext.Provider value={{ className: "portal_navigation_icon" }}>
              <GiShoppingBag />
            </IconContext.Provider>
          </Badge>
        </Tooltip>

      </section>



    </div>
  )
}

export default RestaurantManagementPortal
