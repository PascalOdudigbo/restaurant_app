import React, { useEffect, useState } from 'react';
import { Navbar } from './components';
import { BookingPage, BookingsManagement, ContactPage, HomePage, RestaurantManagementPortal, UserProfileManagement, MenuPage, CartPage, KitchenPage } from './pages';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, isLoggedIn } from './utils/appUtils';
import { BookingsType } from './utils/bookingsManagementUtils';
import { OrderType } from './utils/menuPageUtils';
import { getAllOrders } from './utils/kitchenPageUtils';


function App() {
  // Defining state variables for userData
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: "",
    mobile_number: "",
    postcode: "",
    email: "",
    password: "",
    role: "",
    orders: undefined
  })
  // Creating state variables to hold bookings
  const [bookings, setBookings] = useState<BookingsType>([])
  // Creating state variables to hold users active order
  const [activeOrder, setActiveOrder] = useState<OrderType>({
    id: 0,
    user_id: userData.id,
    table_id: 0,
    status: "",
    order_items: undefined
  });
  // Creating state variables to hold orders
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    isLoggedIn(setUserData, setActiveOrder);
    getAllOrders(setOrders);
  }, [])

  return (
    <div className='app__container'>
      <Routes>
        <Route path="/*" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} activeOrder={activeOrder} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <HomePage setUserData={setUserData} setActiveOrder={setActiveOrder} />
            <MenuPage userData={userData} activeOrder={activeOrder} setActiveOrder={setActiveOrder} />
            <BookingPage userData={userData} />
            <ContactPage userData={userData} />
          </>
        } />
        <Route path="/cart/*" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} activeOrder={activeOrder} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <CartPage userData={userData} setUserData={setUserData} activeOrder={activeOrder} setActiveOrder={setActiveOrder} />
          </>
        } />

        <Route path="/kitchen/" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} activeOrder={activeOrder} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <KitchenPage userData={userData} orders={orders} setOrders={setOrders} />
          </>
        } />

        <Route path="/service-station/" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} activeOrder={activeOrder} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <KitchenPage userData={userData} orders={orders} setOrders={setOrders} />
          </>
        } />

        <Route path="/profile-management" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} activeOrder={activeOrder} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <UserProfileManagement userData={userData} setUserData={setUserData} />
          </>
        } />

        <Route path="/bookings-management/*" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} activeOrder={activeOrder} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <BookingsManagement userData={userData} bookings={bookings} setBookings={setBookings} />
          </>
        } />

        <Route path="/restaurant-management/*" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} activeOrder={activeOrder} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <RestaurantManagementPortal userData={userData} />
          </>
        } />

      </Routes>

    </div >
  );
}

export default App;
