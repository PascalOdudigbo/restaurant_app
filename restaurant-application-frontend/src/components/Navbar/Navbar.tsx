import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu, MdLocationOn, MdPhone } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

function Navbar() {
  //creating useState to display toggle menu
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  // defining the navigate variable function
  const navigate: NavigateFunction = useNavigate();

  return (
    <nav className='app__navbar_wrapper'>
      <div className='app_navbar_restaurant_details_wrapper'>
        <div className='app_navbar_detail_wrapper'>
          <IconContext.Provider value={{ size: "20px", className: "app_navbar_detail_icon" }}>
            <MdLocationOn />
            <p className='p__inter app_navbar_detail_text'>19th St, Monrovia, Liberia</p>
          </IconContext.Provider>
        </div>

        <div className='app_navbar_detail_wrapper'>
          <IconContext.Provider value={{ size: "20px", className: "app_navbar_detail_icon" }}>
            <MdPhone />
            <p className='p__inter app_navbar_detail_text'>+231 88 677 7007</p>
          </IconContext.Provider>
        </div>

      </div>
      <div className='app__navbar'>

        <div className='app__navbar_logo'>
          <h1 className='headtext__playfair app__navbar_logo_text' onClick={() => navigate("/")}>LILA BROWN</h1>
        </div>


        <ul className='app__navbar_links'>
          <li className='p__inter'><a href='#home'>HOME</a></li>
          <li className='p__inter'><a href='#menu'>MENU</a></li>
          <li className='p__inter'><a href='#booking'>BOOKING</a></li>
          <li className='p__inter'><a href='#gallery'>GALLERY</a></li>
          <li className='p__inter'><a href='#contactus'>CONTACT</a></li>
        </ul>

        <div className='app__navbar_login'>
          <Link to='/login' className='p__inter app__navbar_login_link'>LOGIN</Link>
          <Link to='/register' className='p__inter app__navbar_login_link'>REGISTER</Link>
        </div>


        <div className='app__navbar_smallscreen'>
          <GiHamburgerMenu color='#fff' fontSize={27} onClick={() => { setToggleMenu(true) }} />
          {
            //if toggleMenu is set to true display this
            toggleMenu && (
              <div className='app__navbar_smallscreen_overlay flex__center slide_bottom'>
                <MdOutlineRestaurantMenu fontSize={27} className='overlay__close' onClick={() => { setToggleMenu(false) }} />
                <ul className='app__navbar_smallscreen_links'>
                  <li className='p__inter'><a href='#home' onClick={() => { setToggleMenu(false) }} >HOME</a></li>
                  <li className='p__inter'><a href='#menu' onClick={() => { setToggleMenu(false) }} >MENU</a></li>
                  <li className='p__inter'><a href='#booking' onClick={() => { setToggleMenu(false) }} >BOOKING</a></li>
                  <li className='p__inter'><a href='#gallery' onClick={() => { setToggleMenu(false) }} >GALLERY</a></li>
                  <li className='p__inter'><a href='#contactus' onClick={() => { setToggleMenu(false) }} >CONTACT</a></li>
                  <li className='p__inter'><Link to='/login' onClick={() => { setToggleMenu(false) }} >LOGIN</Link></li>
                  <li className='p__inter'><Link to='/register' onClick={() => { setToggleMenu(false) }} >REGISTER</Link></li>
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
