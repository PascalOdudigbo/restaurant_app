import React from 'react'
import Search from '../Search/Search'
import { MenuItemsManagementProps } from '../../utils/menuManagementUtils'
import { Link, Route, Routes } from 'react-router-dom'
import { AddMenuItem, MenuItemRow, MenuItem, EditMenuItem } from '..'
// import { AddMenuItem, EditMenuItem } from '../'

function ManageMenuItems({ userData, menuItems, setTargetMenuItem, targetMenuItem, setMenuItems, handleSearchOnChange, menuCategories }: MenuItemsManagementProps) {
    return (
        <div className='menu_items_table_wrapper'>
            <section className='menu_management_routes_wrapper flex__center'>
                <Routes>
                    <Route path="/add-menu-item" element={<AddMenuItem menuItems={menuItems} setMenuItems={setMenuItems} menuCategories={menuCategories} />} />
                    <Route path="/edit-menu-item" element={<EditMenuItem targetMenuItem={targetMenuItem} menuItems={menuItems} setMenuItems={setMenuItems} menuCategories={menuCategories}/>} />
                </Routes>
            </section>

            <section className='add_menu_item_link_wrapper'>
                <Link to={"/restaurant-management/menu-management/manage-items/add-menu-item"} className='custom__button add_menu_item_link'>+ ADD MENU ITEM</Link>
            </section>
            <div className="search_wrapper">
                {
                    userData.role === "manager" &&
                    <Search
                        placeholderText={"Item name..."}
                        handleOnChange={handleSearchOnChange}
                    />
                }

            </div>

            <table className="menu_items_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className="p__inter table_header">IMAGE</th>
                        <th className="p__inter table_header">NAME</th>
                        <th className="p__inter table_header">DESCRIPTION</th>
                        <th className="p__inter table_header">PRICE</th>
                        <th className="p__inter table_header">AVAILABLE</th>
                        <th className="p__inter table_header">ACTION</th>
                    </tr>
                </thead>

                <tbody className='table_body'>
                    {menuItems?.map((menuItem) => (
                        <MenuItemRow
                            key={menuItems.indexOf(menuItem)}
                            menuItem={menuItem}
                            setTargetMenuItem={setTargetMenuItem}
                            menuItems={menuItems}
                            setMenuItems={setMenuItems}
                        />
                    ))}
                </tbody>
            </table>

            <section className='menu_item_mobile_view'>
                {
                    menuItems?.map((menuItem) => (
                        <MenuItem
                            key={menuItem.id}
                            menuItem={menuItem}
                            setTargetMenuItem={setTargetMenuItem}
                            menuItems={menuItems}
                            setMenuItems={setMenuItems}
                        />
                    ))
                }
            </section>
            {menuItems?.length < 1 && <h3 className="p__inter no_menu_items_text">NO MENU ITEMS</h3>}

        </div>
    )
}

export default ManageMenuItems
