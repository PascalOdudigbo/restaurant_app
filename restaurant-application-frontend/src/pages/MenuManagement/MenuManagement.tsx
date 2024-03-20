import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { MenuCategoryType, MenuManagementProps, searchMenuCategories } from '../../utils/menuManagementUtils'
import { ManageMenuCategories } from '../../components'

function MenuManagement({userData, menuCategories, setMenuCategories}: MenuManagementProps) {
  const [targetMenuCategory, setTargetMenuCategory] = useState<MenuCategoryType>({
    id: 0,
    name: "",
    description: ""
  });

  // Defining a function to handle search input value change
  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => {
    setSearchData(e.target.value);
    const searchValue = e.target.value;
    searchMenuCategories(searchValue, menuCategories, setMenuCategories)
}

  return (
    <div className='menu_management app__bg app__wrapper section_padding flex__center'>
       <section className='heading_wrapper'>
        <h1 className='headtext__playfair menuManagementPage_heading'>MENU</h1>
      </section>

      <section className='menu_management_menu_categories_and_items_nav_wrapper flex__center'>
        <Link to="/restaurant-management/menu-management/manage-categories" className='custom__button menu_management_nav_link_1 '>CATEGORIES</Link>
        <Link to="/" className='custom__button menu_management_nav_link_2'>ITEMS</Link>
      </section>

      <section className='menu_management_routes_wrapper flex__center'>
        <Routes>
          <Route path="/manage-categories/*" element={<ManageMenuCategories userData={userData} menuCategories={menuCategories} setMenuCategories={setMenuCategories} setTargetMenuCategory={setTargetMenuCategory} targetMenuCategory={targetMenuCategory} handleSearchOnChange={handleSearchOnChange}/>} />
        </Routes>
      </section>
    </div>
  )
}

export default MenuManagement
