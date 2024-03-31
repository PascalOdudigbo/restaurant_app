import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormInput, TextArea } from "../"
import { EditMenuCategoryProps, MenuCategoryType, editMenuCategory } from '../../utils/menuManagementUtils'

function EditMenuCategory({ targetMenuCategory, setMenuCategories }: EditMenuCategoryProps) {
    // Declaring state variables for controlled form inputs
    const [categoryDetails, setCategoryDetails] = useState<MenuCategoryType>({
        id: targetMenuCategory.id ? targetMenuCategory.id : 0,
        name: targetMenuCategory.id ? targetMenuCategory.name : "",
        description: targetMenuCategory.id ? targetMenuCategory.description : "",
    })

    // Declaring navigation variable function
    const navigate = useNavigate()

    useEffect(() => {
        targetMenuCategory.id < 1 && navigate("/restaurant-management/menu-management/manage-categories/")
    }, [targetMenuCategory, navigate])

    return (
        <div className='edit_menu_category_wrapper flex__center'>
            <header className='edit_menu_category_header'>
                <h3 className='headtext__playfair edit_menu_category_header_title'>EDIT CATEGORY</h3>
                <Link to="/restaurant-management/menu-management/manage-categories" className='headtext__playfair edit_menu_category_header_close'>X</Link>
            </header>
                <form className='edit_menu_category_form' onSubmit={(e) => { editMenuCategory(e, targetMenuCategory, categoryDetails, setMenuCategories) }}>

                    <FormInput
                        label='Name *'
                        inputType='text'
                        inputValue={categoryDetails.name}
                        required={true}
                        readonly={false}
                        onChangeFunction={(e) => { setCategoryDetails({ ...categoryDetails, name: e.target.value }) }}
                    />

                    <TextArea
                        label='Message  *'
                        inputValue={categoryDetails.description}
                        required={true}
                        rows={4}
                        cols={50}
                        onChangeFunction={(e) => { setCategoryDetails({ ...categoryDetails, description: e.target.value }) }}

                    />

                    <div className='item9'>
                        <button className='custom__button edit_menu_category_form_button'>UPDATE</button>
                    </div>


                </form>

        </div>
    )
}

export default EditMenuCategory;
