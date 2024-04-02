import React, { useEffect, useState } from 'react'
import { MenuItemType, getAllMenuCategories, getAllMenuItems } from '../../utils/menuManagementUtils';

function GalleryPage() {

    // Defining state variables 
    const [menuItems, setMenuItem] = useState<MenuItemType[]>([])

    useEffect(() => {
        // Getting all menuItems
        getAllMenuItems(setMenuItem);

    }, [])

    return (
        <div className='app__gallery app__bg app__wrapper section_padding'>
            <section className='gallery_heading_wrapper'>
                <h1 className='headtext__playfair menu_heading'>GALLERY</h1>
            </section>

            <section className='gallery_body_wapper'>
                {
                    Array.from(menuItems)?.map(menuItem => <img className='menu_item_image' key={menuItems?.indexOf(menuItem)} src={menuItem?.image} alt={menuItem?.name} title={menuItem?.name}/>)
                }
            </section>
            {
                menuItems?.length < 1 && <h2 className='p__inter empty_gallery_text'>Empty Gallery</h2>
            }

            
        </div>
    )
}

export default GalleryPage
