import React, { useEffect, useState } from 'react'
import { FormInput, TextArea } from '../../components';

type ContactDetails = {
    name: string;
    email: string;
    mobileNumber: string;
    message: string;
}

function ContactPage() {
    const [contactDetails, setContactDetails] = useState<ContactDetails>({
        name: "",
        email: "",
        mobileNumber: "",
        message: "",
    })

    useEffect(() => {
        // Initialize the map when the component mounts
        initMap();
    }, []);

    function initMap() {
        if ((window as any).google) {
            // Create your map and add markers, etc.
            new (window as any).google.maps.Map(document.getElementById("map"), {
                center: { lat: 6.287082195281982, lng: -10.776318550109863 },
                zoom: 20,
            });
        } else {
            console.error('Google Maps JavaScript API is not loaded.');
        }

    }
    return (
        <div className='app__contactPage_wrapper app__bg app__wrapper section_padding ' id='contactus'>
            <section className='app__bookingpage_heading_wrapper'>
                <h1 className='headtext__playfair app__contactPage_heading'>CONTACT US</h1>
            </section>

            <div className='app__bookingpage_map_contact_and_text_wrapper flex__center'>
                <div id='map' className='app__bookingpage_map' />
                <iframe title='Lila Brown Location' className='app__bookingpage_map_alt' src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAV-K1IlctPUELdwCyEdn6t44C6ZhvTuL0&q=6.287082195281982,-10.776318550109863" />

                <section className='app__contactPage_contact_wrapper '>
                    <div className='app__contactPage_contact_instructions_wrapper'>

                        <p className='p__inter app__contactPage_contact_instructions'>
                            Connect with our support team and allow us to customize an ideal
                            experience for you. Whether you have inquiries or wish to discuss
                            other matters, our support team is here ready to assist you over
                            phone calls & emails.
                        </p>

                    </div>

                    <div className='app__contactPage_form_wrapper'>
                        <form className='app__contactPage_form'>

                            <FormInput
                                label='Name  *'
                                inputType='text'
                                inputValue={contactDetails.name}
                                required={true}
                                onChangeFunction={(e) => { setContactDetails({ ...contactDetails, name: e.target.value }) }}
                            />


                            <FormInput
                                label='Email  *'
                                inputType='text'
                                inputValue={contactDetails.email}
                                required={true}
                                onChangeFunction={(e) => { setContactDetails({ ...contactDetails, email: e.target.value }) }}
                            />

                            <FormInput
                                label='Mobile Number  *'
                                inputType='text'
                                inputValue={contactDetails.mobileNumber}
                                required={true}
                                onChangeFunction={(e) => { setContactDetails({ ...contactDetails, mobileNumber: e.target.value }) }}
                            />


                            <TextArea
                                label='Message  *'
                                inputValue={contactDetails.message}
                                required={true}
                                rows={4}
                                cols={50}
                                onChangeFunction={(e) => { setContactDetails({ ...contactDetails, message: e.target.value }) }}

                            />

                            <button className='custom__button app__contactPage_form_button'>SUBMIT</button>


                        </form>
                    </div>

                </section>

                <section className='app__contactPage_text_wrapper'>
                    <div className='app__contactPage_text'>
                        <h3 className='p__almendra app__contactPage_text_header'>Phone</h3>
                        <div className='app__contactPage_text_header_purple_line'></div>
                        <p className='p__inter app__contactPage_text'>+231 88 677 7007</p>
                    </div>

                    <div className='app__contactPage_text'>
                        <h3 className='p__almendra app__contactPage_text_header'>Address</h3>
                        <div className='app__contactPage_text_header_purple_line'></div>
                        <p className='p__inter app__contactPage_text'>19th St, Monrovia, Liberia</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ContactPage
