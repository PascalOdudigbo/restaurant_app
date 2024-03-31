import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuItemRowProps, deleteCloudinaryItemImage } from '../../utils/menuManagementUtils'
import { IconContext } from 'react-icons'
import { RxDotFilled } from 'react-icons/rx'

function MenuItem({ menuItem, setTargetMenuItem, menuItems, setMenuItems }: MenuItemRowProps) {
    // Declaring navigation variable function
    const navigate = useNavigate()
    // Declaring variables to represent menu item availability
    const activeIconStyles = { marginRight: "3px", color: "green" };
    const notActiveIconStyles = { marginRight: "3px", color: "red" };

    return (
        <div className='menu_item_wrapper'>
            <img className='productImage' src={menuItem.image} alt={menuItem.name} />
            <section className='name_and_price_wrapper'>
                <p className='p__playfair menu_item_name'>{menuItem.name}</p>
                <p className='p__inter menu_item_price'>£{menuItem.price}</p>
            </section>
            <section className='activity_wrapper'>
                {
                    menuItem.is_available ?
                        <div className='itemActiveIconAndText'>
                            <IconContext.Provider value={{ size: '30px' }}>
                                <RxDotFilled style={activeIconStyles} />
                            </IconContext.Provider>
                            <p className='p__inter productActive'>Available</p>
                        </div>
                        :
                        <div className='itemActiveIconAndText'>
                            <IconContext.Provider value={{ size: '30px' }}>
                                <RxDotFilled style={notActiveIconStyles} />
                            </IconContext.Provider>
                            <p className='p__inter productActive'>Unavailable</p>
                        </div>
                }
            </section>

            <p className='p__inter menu_item_description'>{menuItem.description}</p>
            <section className='menu_item_buttons_wrapper'>
                <button className='custom__button menu_item_button' onClick={() => {
                    window.scrollTo(0, 0)
                    setTargetMenuItem(menuItem)
                    navigate("/restaurant-management/menu-management/manage-items/edit-menu-item")
                }}>EDIT</button>

                <button className="custom__button menu_item_delete_btn" onClick={() => {
                    deleteCloudinaryItemImage(menuItem, menuItems, setMenuItems, true)
                }}>DELETE</button>

            </section>

        </div>
    )
}

export default MenuItem
