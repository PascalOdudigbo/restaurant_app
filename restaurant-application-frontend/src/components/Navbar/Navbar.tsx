import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu, MdLocationOn, MdPhone } from 'react-icons/md';
import { IconContext } from 'react-icons';

function Navbar() {
  //creating useState to display toggle menu
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <nav className='app__navbar_wrapper'>
      <div className='app_navbar_restaurant_details_wrapper'>
        <div className='app_navbar_detail_wrapper'>
          <IconContext.Provider value={{ size: "20px", className: "app_navbar_detail_icon" }}>
            <MdLocationOn />
            <p className='p__inter app_navbar_detail_text'>CV4 5XL, Old Rothman Road, Coventry</p>
          </IconContext.Provider>
        </div>

        <div className='app_navbar_detail_wrapper'>
          <IconContext.Provider value={{ size: "20px", className: "app_navbar_detail_icon" }}>
            <MdPhone />
            <p className='p__inter app_navbar_detail_text'>+44793870248</p>
          </IconContext.Provider>
        </div>

      </div>
      <div className='app__navbar'>

        <div className='app__navbar_logo'>
          <h1 className='headtext__playfair app__navbar_logo_text'>LILA BROWN</h1>
        </div>


        <ul className='app__navbar_links'>
          <li className='p__inter'><a href='#home'>Home</a></li>
          <li className='p__inter'><a href='#menu'>Menu</a></li>
          <li className='p__inter'><a href='#booking'>Booking</a></li>
          <li className='p__inter'><a href='#gallery'>Gallery</a></li>
          <li className='p__inter'><a href='#contactus'>Contact</a></li>
        </ul>

        <div className='app__navbar_login'>
          <a href='#login' className='p__inter app__navbar_login_link'>Log In / Register</a>
        </div>


        <div className='app__navbar_smallscreen'>
          <GiHamburgerMenu color='#fff' fontSize={27} onClick={() => { setToggleMenu(true) }} />
          {
            //if toggleMenu is set to true display this
            toggleMenu && (
              <div className='app__navbar_smallscreen_overlay flex__center slide_bottom'>
                <MdOutlineRestaurantMenu fontSize={27} className='overlay__close' onClick={() => { setToggleMenu(false) }} />
                <ul className='app__navbar_smallscreen_links'>
                  <li className='p__inter'><a href='#home'>Home</a></li>
                  <li className='p__inter'><a href='#menu'>Menu</a></li>
                  <li className='p__inter'><a href='#booking'>Booking</a></li>
                  <li className='p__inter'><a href='#gallery'>Gallery</a></li>
                  <li className='p__inter'><a href='#contactus'>Contact</a></li>
                </ul>

              </div>
            )
          }
        </div>

      </div>



    </nav>
  )
}

export default Navbar
