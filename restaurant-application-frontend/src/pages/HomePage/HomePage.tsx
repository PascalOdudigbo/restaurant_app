import React from 'react'
import welcomeImage from "../../assets/welcome_image_2.jpg";

function HomePage() {
  return (
    <div className='app__homepage app__bg app__wrapper section_padding flex__center' id='home'>
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
