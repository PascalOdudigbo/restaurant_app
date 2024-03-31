import React from 'react'
import Search from '../Search/Search'
import { MenuCategoriesManagementProps } from '../../utils/menuManagementUtils'
import MenuCategoryRow from './MenuCategoryRow/MenuCategoryRow'
import { Link, Route, Routes } from 'react-router-dom'
import { AddMenuCategory, EditMenuCategory } from '../'

function ManageMenuCategories({ userData, menuCategories, setTargetMenuCategory, targetMenuCategory, setMenuCategories, handleSearchOnChange }: MenuCategoriesManagementProps) {
    return (
        <div className='menucategories_table_wrapper'>
            <section className='menu_management_routes_wrapper flex__center'>
                <Routes>
                    <Route path="/add-menu-category" element={<AddMenuCategory menuCategories={menuCategories} setMenuCategories={setMenuCategories} />} />
                    <Route path="/edit-menu-category" element={<EditMenuCategory targetMenuCategory={targetMenuCategory} setMenuCategories={setMenuCategories} />} />
                </Routes>
            </section>

            <section className='add_menu_category_link_wrapper'>
                <Link to={"/restaurant-management/menu-management/manage-categories/add-menu-category"} className='custom__button add_menu_category_link'>+ ADD MENU CATEGORY</Link>
            </section>
            <div className="search_wrapper">
                {
                    userData.role === "manager" &&
                    <Search
                        placeholderText={"Category name..."}
                        handleOnChange={handleSearchOnChange}
                    />
                }

            </div>

            <table className="menucategories_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className="p__inter table_header">NAME</th>
                        <th className="p__inter table_header">DESCRIPTION</th>
                        <th className="p__inter table_header">ACTION</th>
                    </tr>
                </thead>

                <tbody className='table_body'>
                    {menuCategories?.map((menuCategory) => (
                        <MenuCategoryRow
                            key={menuCategories.indexOf(menuCategory)}
                            menuCategory={menuCategory}
                            setTargetMenuCategory={setTargetMenuCategory}
                            menuCategories={menuCategories}
                            setMenuCategories={setMenuCategories}
                        />
                    ))}
                </tbody>
            </table>
            {menuCategories?.length < 1 && <h3 className="p__inter no_menu_categories_text">NO MENU CATEGORIES</h3>}

        </div>
    )
}

export default ManageMenuCategories
