import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import Dropdown from '../Dropdown/Dropdown';
import { AddMenuItemProps, MenuItemType, handleImageFileChange, uploadImageToCloudinary } from '../../utils/menuManagementUtils';
import TextArea from '../TextArea/TextArea';
import { IconContext } from 'react-icons';
import { BsImageFill } from "react-icons/bs";
import imagePlaceHolder from "../../assets/image_placeholder.png"


function AddMenuItem({ menuItems, setMenuItems, menuCategories }: AddMenuItemProps) {
    // creating state variables for controlled form inputs
    const [menuItem, setMenuItem] = useState<MenuItemType>({
        menu_category_id: 0,
        name: "",
        description: "",
        price: 0,
        image: imagePlaceHolder,
        image_public_id: "",
        is_available: true
    })
    // creating a state variable to hold imageFile 
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>()

    // Declaring navigation variable function
    const navigate = useNavigate()

    // Declaring reference function variable
    const uploadImagesRef = useRef<HTMLInputElement>(null);


    return (
        <div className='add_menu_item_wrapper flex__center'>
            <header className='add_menu_item_header'>
                <h3 className='headtext__playfair add_menu_item_header_title'>ADD ITEM</h3>
                <Link to="/restaurant-management/menu-management/manage-items" className='headtext__playfair add_menu_item_header_close'>X</Link>
            </header>
            <form className='add_menu_item_form' onSubmit={(e) => { selectedImageFile && uploadImageToCloudinary(selectedImageFile, menuItem, setMenuItem, e, menuItems, setMenuItems, navigate, true) }}>
                <section className='image_and_button_wrapper'>
                    <img className="menu_item_image" src={menuItem.image} alt={menuItem?.name} title={menuItem?.name} />

                    <input
                        style={{ display: "none" }}
                        type="file"
                        ref={uploadImagesRef}
                        onChange={(e) => { handleImageFileChange(e, setSelectedImageFile, menuItem, setMenuItem) }}
                        multiple={false}
                        accept="image/*"
                    />

                    <button
                        className="upload_image_btn custom__button"
                        onClick={(e) => {
                            e.preventDefault();
                            if (uploadImagesRef.current) {
                                uploadImagesRef.current.click();
                            } else {
                                console.error("uploadImagesRef is null");
                            }
                        }}

                    >
                        <div className="icon_and_text_container">
                            <IconContext.Provider value={{ className: "upload_image_icon" }}>
                                <BsImageFill />
                            </IconContext.Provider>

                            <p className="button_text p__inter">UPLOAD IMAGE</p>

                        </div>
                    </button>

                    <p className="image_type_text p__inter">PNG & JPG ACCEPTED</p>
                </section>
                <FormInput
                    label='Name  *'
                    inputType='text'
                    inputValue={menuItem.name}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => { setMenuItem({ ...menuItem, name: e.target.value }) }}
                />

                <FormInput
                    label='Price  *'
                    inputType='text'
                    inputValue={menuItem.price.toString()}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => { setMenuItem({ ...menuItem, price: e.target.value }) }}
                />

                <Dropdown
                    label={"Availability *"}
                    items={["Available", "Unavailable"]}
                    buttonText={menuItem.is_available ? "Available" : "Unavailable"}
                    clickFunction={(data) => {
                        setMenuItem({ ...menuItem, is_available: data.toString() === "Available" ? true : false })
                    }}
                />

                <Dropdown
                    label={"Category *"}
                    items={menuCategories.map(menuCategory => menuCategory.name)}
                    buttonText={menuItem.menu_category_id === 0 ? "Select menu category" : menuCategories.filter(menuCategory => menuCategory.id === menuItem.menu_category_id)[0].name}
                    clickFunction={(data) => {
                        const filteredMenuCategory = menuCategories.filter(menuCategory => menuCategory.name === data)
                        setMenuItem({ ...menuItem, menu_category_id: filteredMenuCategory[0].id})
                    }}
                />

                <TextArea
                    label='Description'
                    inputValue={menuItem.description}
                    required={true}
                    rows={4}
                    cols={50}
                    onChangeFunction={e => { setMenuItem({ ...menuItem, description: e.target.value }) }}

                />

                <button type="submit" className='custom__button add_menu_item_form_button'>SAVE</button>
            </form>

        </div>
    )
}

export default AddMenuItem
