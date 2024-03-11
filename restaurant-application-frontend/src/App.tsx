import React, { useEffect, useState } from 'react';
import { Navbar } from './components';
import { BookingPage, BookingsManagement, ContactPage, HomePage, RestaurantManagementPortal, UserProfileManagement } from './pages';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, isLoggedIn } from './utils/appUtils';


function App() {
  // Defining state variables for userData
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: "",
    mobile_number: "",
    postcode: "",
    email: "",
    password: "",
    role: ""
  })

  useEffect(() => {
    isLoggedIn(setUserData);
  }, [])

  return (
    <div className='app__container'>
      <Routes>
        <Route path="/*" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} />
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
            <HomePage setUserData={setUserData} />
            <BookingPage userData={userData} />
            <ContactPage userData={userData} />
          </>
        } />
        <Route path="/orders" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} />
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
          </>
        } />

        <Route path="/profile-management" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} />
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
            <Navbar userData={userData} setUserData={setUserData} />
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
            <BookingsManagement userData={userData} />
          </>
        } />

        <Route path="/restaurant-management/*" element={
          <>
            <Navbar userData={userData} setUserData={setUserData} />
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
            <RestaurantManagementPortal userData={userData}/>
          </>
        } />

      </Routes>

    </div >
  );
}

export default App;
