import React from 'react';
import { Navbar } from './components';
import { BookingPage, HomePage } from './pages';

function App() {
  return (
    <div className='app__container'>
        <Navbar />
        <HomePage/>
        <BookingPage/>
      
    </div>
  );
}

export default App;
