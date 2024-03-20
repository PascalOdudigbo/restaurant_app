import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { SlOptions } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'
import { MenuCategoryRowProps, deleteMenuCategory } from '../../../utils/menuManagementUtils'

function MenuCategoryRow({ userData, menuCategory, setTargetMenuCategory, targetMenuCategory, menuCategories, setMenuCategories }: MenuCategoryRowProps) {
    // Declaring state variables to manage dropdown display
    const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")
    // Declaring navigation variable function
    const navigate = useNavigate()

    return (
        <tr className="row_wrapper">
            <td className="row_cell">{menuCategory.name}</td>
            <td className="row_cell">{menuCategory.description}</td>
            <td className="row_cell">
                <div className="dropdown">
                    <IconContext.Provider value={{ size: '20px', className: "dropdown_icon" }}>
                        <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} />
                    </IconContext.Provider>
                    <div className="dropdown_content" style={{ display: dropdownDisplay }}>
                        <button className='dropdown_item' onClick={() => {
                            window.scrollTo(0, 0)
                            setTargetMenuCategory(menuCategory)
                            navigate("/restaurant-management/menu-management/manage-categories/edit-menu-category")
                        }}>EDIT</button>
                        <button className="delete_btn" onClick={() => {
                        
                            deleteMenuCategory(menuCategory, menuCategories, setMenuCategories)
                        }}>DELETE</button>

                    </div>
                </div>
            </td>
        </tr>
    )
}

export default MenuCategoryRow
