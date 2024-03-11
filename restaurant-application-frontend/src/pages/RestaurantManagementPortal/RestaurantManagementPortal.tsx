import { Badge, Tooltip } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import React from 'react'
import { IconContext } from 'react-icons';
import { AiFillDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
// import { BiSolidLogOut } from "react-icons/bi";
import {BookingsManagement, UsersManagement} from '../';
import { BookingsManagementProps } from '../../utils/bookingsManagementUtils';
import { ManagerDashboard } from '../../components';



function RestaurantManagementPortal({userData}: BookingsManagementProps) {
  // Declaring navigation variable function
  const navigate = useNavigate();

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
          <Badge color="secondary" badgeContent={0} onClick={() => { }}>
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
              totalBookings={0} 
              totalClients={0} 
              totalMenuCategories={0} 
              totalPendingBookings={0} 
              totalMenuItems={0} 
              totalOrders={0}
            />
          }/>
          <Route path='/users-management/*' element={<UsersManagement userData={userData}/>}/>
          <Route path='/bookings-management/*' element={<BookingsManagement userData={userData}/>}/>
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
          <Badge color="secondary" badgeContent={0} onClick={() => { }}>
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
