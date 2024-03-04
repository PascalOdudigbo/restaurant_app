import React from 'react'
import welcomeImage from "../../assets/welcome_image_2.jpg";
import { Route, Routes } from 'react-router-dom';
import { Login, Register } from '../../components';
import {User} from "../../utils/appUtils";

// Defining the homepage prop types
type HomePageProps = {
  setUserData: React.Dispatch<React.SetStateAction<User>>
}

function HomePage({setUserData}: HomePageProps) {
  return (
    <div className='app__homepage app__bg app__wrapper section_padding flex__center' id='home'>
        <div className='app__homepage_login_and_register_wrapper flex__center'>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register setUserData={setUserData}/>}/>

            </Routes>
        </div>
        <div className='app__homepage_image_and_text_wrapper '>
            <section className='app__homepage_image_section'>
                <img className="app__homepage_image" src={welcomeImage} alt='food platter'/>
            </section>

            <section className='app__homepage_text_section_wrapper flex__center'>
              <div className='app__homepage_text_section'>
                <h3 className='app__homepage_text_section_logo headtext__playfair'>LILA BROWN</h3>
                <div className='app__homepage_text_section_purple_line'></div>
                <p className='p__almendra app__homepage_text_section_motto'>WHERE EVERY MEAL IS A CULINARY<br/>MASTERPEICE</p>
                <a href="#booking" className='custom__button app__homepage_text_section_link'>BOOK TABLE</a>

              </div>

            </section>

        </div>
      
    </div>
  )
}

export default HomePage
