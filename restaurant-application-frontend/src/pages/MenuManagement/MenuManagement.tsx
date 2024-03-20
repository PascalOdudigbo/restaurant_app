import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { MenuCategoryType, MenuItemType, MenuManagementProps, searchMenuCategories, searchMenuItems } from '../../utils/menuManagementUtils'
import { ManageMenuCategories, ManageMenuItems } from '../../components'

function MenuManagement({ userData, menuCategories, setMenuCategories, menuItems, setMenuItems }: MenuManagementProps) {
  // Creating state variables to manage target menu category data
  const [targetMenuCategory, setTargetMenuCategory] = useState<MenuCategoryType>({
    id: 0,
    name: "",
    description: ""
  });
  // Creating state variables to manage target menu item data
  const [targetMenuItem, setTargetMenuItem] = useState<MenuItemType>({
    id: 0,
    menu_category_id: 0,
    name: "",
    description: "",
    price: 0,
    image: "",
    image_public_id: "",
    is_available: true
  })

  // Defining a function to handle category search input value change
  const handleCategorySearchOnChange = (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => {
    setSearchData(e.target.value);
    const searchValue = e.target.value;
    searchMenuCategories(searchValue, menuCategories, setMenuCategories)
  }

  // Defining a function to handle item search input value change
  const handleItemSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => {
    setSearchData(e.target.value);
    const searchValue = e.target.value;
    searchMenuItems(searchValue, menuItems, setMenuItems)
  }

  return (
    <div className='menu_management app__bg app__wrapper section_padding flex__center'>
      <section className='heading_wrapper'>
        <h1 className='headtext__playfair menuManagementPage_heading'>MENU</h1>
      </section>

      <section className='menu_management_menu_categories_and_items_nav_wrapper flex__center'>
        <Link to="/restaurant-management/menu-management/manage-categories" className='custom__button menu_management_nav_link_1 '>CATEGORIES</Link>
        <Link to="/restaurant-management/menu-management/manage-items" className='custom__button menu_management_nav_link_2'>ITEMS</Link>
      </section>

      <section className='menu_management_routes_wrapper flex__center'>
        <Routes>
          <Route path="/manage-categories/*" element={
            <ManageMenuCategories
              userData={userData}
              menuCategories={menuCategories}
              setMenuCategories={setMenuCategories}
              setTargetMenuCategory={setTargetMenuCategory}
              targetMenuCategory={targetMenuCategory}
              handleSearchOnChange={handleCategorySearchOnChange}
            />
          } />

          <Route path="/manage-items/*" element={
            <ManageMenuItems
              userData={userData}
              menuItems={menuItems}
              setMenuItems={setMenuItems}
              setTargetMenuItem={setTargetMenuItem}
              targetMenuItem={targetMenuItem}
              handleSearchOnChange={handleItemSearchOnChange}
              menuCategories={menuCategories}
            />
          } />
        </Routes>
      </section>
    </div>
  )
}

export default MenuManagement
