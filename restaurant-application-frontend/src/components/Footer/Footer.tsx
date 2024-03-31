import React from 'react'
import { IconContext } from 'react-icons'
import { MdLocationOn, MdPhone } from 'react-icons/md'

function Footer() {
  return (
    <div className='footer_wrapper'>
      <section className='opening_time'>
        <h1 className='p__playfair footer_section_header'>Opening Hours</h1>
        <h3 className='p__inter footer_opening_hour'><b>Monday – Thursday</b> | 12:00PM – 00:30AM</h3>
        <h3 className='p__inter footer_opening_hour'><b>Friday – Saturday</b> | 12:00PM – 01:30AM</h3>
        <h3 className='p__inter footer_opening_hour'><b>Sunday</b> | 12:00PM – 23:00PM</h3>
        <p className='p__inter footer_last_food_order'>Last food order at 10:00pm</p>
      </section>

      <p className='p__inter copyright_text'>Copyright © {new Date().getFullYear()} MakkTek ltd</p>

      <div className='footer_restaurant_details_wrapper'>
        <div className='footer_detail_wrapper'>
          <IconContext.Provider value={{ size: "25px", className: "footer_detail_icon" }}>
            <MdLocationOn />
            <p className='p__inter footer_detail_text'>19th St, Monrovia, Liberia</p>
          </IconContext.Provider>
        </div>

        <div className='footer_detail_wrapper'>
          <IconContext.Provider value={{ size: "25px", className: "footer_detail_icon" }}>
            <MdPhone />
            <p className='p__inter footer_detail_text'>+231 88 677 7007</p>
          </IconContext.Provider>
        </div>

      </div>

      <p className='p__inter copyright_text_mobile'>Copyright © {new Date().getFullYear()} MakkTek ltd</p>


    </div>
  )
}

export default Footer
