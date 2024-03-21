import React, { useEffect, useState } from 'react'
import { MenuCategoryType, MenuItemType, getAllMenuCategories } from '../../utils/menuManagementUtils'
import imagePlaceHolder from "../../assets/image_placeholder.png"
import { IconContext } from 'react-icons';
import { MdMenuBook } from 'react-icons/md';


function MenuPage() {
  // Creating state variale to hold menu categories
  const [menuCategories, setMenuCategories] = useState<MenuCategoryType[]>([]);
  // Creating state variable to manage menu details display
  const [menuItemDetailsDisplay, setMenuItemDetailsDisplay] = useState<string>("none");
  // Creating state variable to manage menu category display on mobile
  const [menuCategoryDisplay, setMenuCategoryDisplay] = useState<string>("none");
  // Creating state variable to manage target menu category
  const [targetMenuCategory, setTargetMenuCategory] = useState<MenuCategoryType>()
  // Creating state variable to manage target menu item
  const [targetMenuItem, setTargetMenuItem] = useState<MenuItemType>({
    menu_category_id: 0,
    name: "MENU CATEGORY",
    description: "",
    price: 0,
    image: imagePlaceHolder,
    image_public_id: "",
    is_available: true
  })

  useEffect(() => {
    // Getting all menuCategories
    getAllMenuCategories(setMenuCategories);

  }, [])

  return (
    <div className='app__menu app__bg app__wrapper section_padding' id='menu'>
      <section className='menu_heading_wrapper'>
        <h1 className='headtext__playfair menu_heading'>MENU</h1>
      </section>

      <section className='menu_body_wapper'>
        <section className='categories_nav_wrapper'>
          <h4 className='p__inter categories_nav_heading'><b>CATEGORIES</b></h4>
          {
            menuCategories.map(menuCategory => <p key={menuCategory.id} className='p__inter categories_nav_item' onClick={() => { setTargetMenuCategory(menuCategory) }}>{menuCategory.name}</p>)
          }
        </section>

        <section className='item_details_wrapper' style={{ display: menuItemDetailsDisplay }}>
          <img className='item_image' src={targetMenuItem.image} alt={targetMenuItem.name} title={targetMenuItem.name} />
          <p className='p__inter item_name'>{targetMenuItem.name.toUpperCase()}</p>
          <p className='p__inter item_description'>{targetMenuItem.description}</p>
          <button className='custom__button item_details_button'>ADD TO CART</button>
        </section>

        <section className='items_list_wrapper'>
          <h4 className='p__inter items_list_heading'><b>{targetMenuCategory?.name.toUpperCase()}</b></h4>
          {
            targetMenuCategory?.menu_items?.map(menu_item =>
              <div key={menu_item.id} className='item_list_name_and_price_wrapper' onClick={() => {
                setTargetMenuItem(menu_item);
                setMenuItemDetailsDisplay("block");
              }}>
                <p className='p__inter item_name'>{menu_item.name.toUpperCase()}</p>
                <div className='price_and_add_to_cart_button'>
                  <p className='p__inter item_price'>£{menu_item.price}</p>
                  <p className='p__inter item_add_to_cart'>+</p>
                </div>
              </div>
            )
          }
        </section>
      </section>

      <section className='menu_body_wapper_mobile'>
        <section className='item_details_wrapper_mobile' style={{ display: menuItemDetailsDisplay }}>
          <img className='item_image_mobile' src={targetMenuItem.image} alt={targetMenuItem.name} title={targetMenuItem.name} />
          <p className='p__inter item_name_mobile'>{targetMenuItem.name.toUpperCase()}</p>
          <p className='p__inter item_description_mobile'>{targetMenuItem.description}</p>
          <button className='custom__button item_details_button'>ADD TO CART</button>
        </section>

        <section className='items_list_wrapper_mobile'>
          <h4 className='p__inter items_list_heading_mobile'><b>{targetMenuCategory?.name.toUpperCase()}</b></h4>
          {
            targetMenuCategory?.menu_items?.map(menu_item =>
              <div key={menu_item.id} className='item_list_name_and_price_wrapper_mobile' onClick={() => {
                setTargetMenuItem(menu_item);
                setMenuItemDetailsDisplay("block");
              }}>
                <p className='p__inter item_name_mobile'>{menu_item.name.toUpperCase()}</p>
                <div className='price_and_add_to_cart_button_mobile'>
                  <p className='p__inter item_price_mobile'>£{menu_item.price}</p>
                  <p className='p__inter item_add_to_cart_mobile'>+</p>
                </div>
              </div>
            )
          }
        </section>

        <section className='categories_floating_wrapper'>
          <button className='categories_button_mobile' onClick={() => { menuCategoryDisplay === "block" ? setMenuCategoryDisplay("none") : setMenuCategoryDisplay("block") }}>
            <IconContext.Provider value={{ className: "display_categories_icon" }}>
              <MdMenuBook />
            </IconContext.Provider>
          </button>
          <section className='categories_nav_wrapper_mobile' style={{ display: menuCategoryDisplay }}>
            <h4 className='p__inter categories_nav_heading_mobile'><b>CATEGORIES</b></h4>
            {
              menuCategories.map(menuCategory => <p key={menuCategory.id} className='p__inter categories_nav_item_mobile' onClick={() => { setTargetMenuCategory(menuCategory); setMenuCategoryDisplay("none") }}>{menuCategory.name}</p>)
            }
          </section>
        </section>

      </section>

    </div>
  )
}

export default MenuPage
