import React from 'react';
import { Navbar } from './components';
import { BookingPage, ContactPage, HomePage } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='app__container'>
      <Routes>
        <Route path="/*" element={
          <>
            <Navbar />
            <HomePage />
            <BookingPage />
            <ContactPage/>
          </>
        } />
      </Routes>


    </div>
  );
}

export default App;
