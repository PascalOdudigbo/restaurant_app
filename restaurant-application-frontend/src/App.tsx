import React from 'react';
import { Navbar } from './components';
import { HomePage } from './pages';

function App() {
  return (
    <div className='app__container'>
        <Navbar />
        <HomePage/>
      
    </div>
  );
}

export default App;
