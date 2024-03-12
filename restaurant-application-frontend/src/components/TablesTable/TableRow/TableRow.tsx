import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { SlOptions } from "react-icons/sl"
import { useNavigate } from 'react-router-dom'
import { TableRowProps, deleteTable } from '../../../utils/restaurantManagementPortalUtils'

function TableRow({ userData, table, setTargetTable, targetTable, tables, setTables }: TableRowProps) {
    // Declaring state variables to manage dropdown display
    const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")
    // Declaring navigation variable function
    const navigate = useNavigate()

    return (
        <tr className="row_wrapper">
            <td className="row_cell">{table.table_number}</td>
            <td className="row_cell">{table.is_occupied ? "Occupied" : "Unoccupied"}</td>
            <td className="row_cell">
                <div className="dropdown">
                    <IconContext.Provider value={{ size: '20px', className: "dropdown_icon" }}>
                        <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} />
                    </IconContext.Provider>
                    <div className="dropdown_content" style={{ display: dropdownDisplay }}>
                        {
                            userData.role === "manager"  && <button className='dropdown_item' onClick={() => {
                                window.scrollTo(0, 0)
                                setTargetTable(table)
                                navigate(window.location.href.includes("restaurant-management") ? "/restaurant-management/tables-management/edit-table" : "/tables-management/edit-table")
                            }}>EDIT</button>
                        }
                        {
                            userData.role === "manager" && <button className="delete_btn" onClick={() => {
                                deleteTable(targetTable, tables, setTables)
                            }}>DELETE</button>
                        }
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableRow
