import React, { useState } from 'react';
import { Navbar } from './components';
import { BookingPage, ContactPage, HomePage } from './pages';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Defining the user type
type User = {
  id: number,
  name: string, 
  mobile_number: string, 
  postcode: string, 
  email: string, 
  password: string, 
  role: string
}

function App() {
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: "",
    mobile_number: "",
    postcode: "",
    email: "",
    password: "",
    role: ""
  })
  return (
    <div className='app__container'>
      <Routes>
        <Route path="/*" element={
          <>
            <Navbar />
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

            <HomePage setUserData={setUserData}/>
            <BookingPage />
            <ContactPage/>
          </>
        } />
      </Routes>


    </div>
  );
}

export default App;
