import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { SlOptions } from 'react-icons/sl'
import { RxDotFilled } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { MenuItemRowProps, deleteCloudinaryItemImage } from '../../../utils/menuManagementUtils'

function MenuItemRow({ menuItem, setTargetMenuItem, menuItems, setMenuItems }: MenuItemRowProps) {
    // Declaring state variables to manage dropdown display
    const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")
    // Declaring navigation variable function
    const navigate = useNavigate()
    // Declaring variables to represent menu item availability
    const activeIconStyles = { marginRight: "3px", marginLeft: "6px", color: "green" };
    const notActiveIconStyles = { marginRight: "3px", marginLeft: "6px", color: "red" };

    return (
        <tr className="row_wrapper">
            <td className="row_cell">
                <img className='productImage' src={menuItem.image} alt={menuItem.name} />
            </td>
            <td className="row_cell">{menuItem.name}</td>
            <td className="row_cell">{menuItem.description}</td>
            <td className="row_cell">£{menuItem.price}</td>
            <td className="row_cell">
                {
                    menuItem.is_available ?
                        <div className='itemActiveIconAndText'>
                            <IconContext.Provider value={{ size: '30px' }}>
                                <RxDotFilled style={activeIconStyles} />
                            </IconContext.Provider>
                            <p className='productActive'>Available</p>
                        </div>
                        :
                        <div className='itemActiveIconAndText'>
                            <IconContext.Provider value={{ size: '30px' }}>
                                <RxDotFilled style={notActiveIconStyles} />
                            </IconContext.Provider>
                            <p className='productActive'>Unavailable</p>
                        </div>
                }
            </td>
            <td className="row_cell">
                <div className="dropdown">
                    <IconContext.Provider value={{ size: '20px', className: "dropdown_icon" }}>
                        <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} />
                    </IconContext.Provider>
                    <div className="dropdown_content" style={{ display: dropdownDisplay }}>
                        <button className='dropdown_item' onClick={() => {
                            window.scrollTo(0, 0)
                            setTargetMenuItem(menuItem)
                            navigate("/restaurant-management/menu-management/manage-items/edit-menu-item")
                        }}>EDIT</button>
                        <button className="delete_btn" onClick={() => {
                            deleteCloudinaryItemImage(menuItem, menuItems, setMenuItems, true)
                        }}>DELETE</button>

                    </div>
                </div>
            </td>
        </tr>
    )
}

export default MenuItemRow
