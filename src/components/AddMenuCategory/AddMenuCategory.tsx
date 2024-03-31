import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TextArea from '../TextArea/TextArea';
import { AddMenuCategoryProps, MenuCategoryType, createMenuCategory } from '../../utils/menuManagementUtils';
import FormInput from '../FormInput/FormInput';

function AddMenuCategory({ menuCategories, setMenuCategories }: AddMenuCategoryProps) {
    // Declaring state variables for controlled form inputs
    const [formData, setFormData] = useState<MenuCategoryType>({
        id: 0,
        name: "",
        description: ""
    });
    // Defining a navigation variable function
    const navigate = useNavigate();


    return (
        <div className='add_menu_category_wrapper flex__center'>
            <header className='add_menu_category_header'>
                <h3 className='headtext__playfair add_menu_category_header_title'>ADD CATEGORY</h3>
                <Link to="/restaurant-management/menu-management/manage-categories/" className='headtext__playfair add_menu_category_header_close'>X</Link>
            </header>
            <form className='add_menu_category_form' onSubmit={(e) => {
                createMenuCategory(e, formData, menuCategories, setMenuCategories, navigate);
            }}>
                < FormInput
                    label="Name *"
                    inputType='text'
                    inputValue={formData.name}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                />
                <TextArea
                    label='Message *'
                    inputValue={formData.description}
                    required={true}
                    rows={4}
                    cols={50}
                    onChangeFunction={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                />

                <button className='custom__button add_menu_category_form_button'>SAVE</button>
            </form>

        </div>
    )
}

export default AddMenuCategory;