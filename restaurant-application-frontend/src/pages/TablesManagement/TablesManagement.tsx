import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AddTable, Dropdown, EditTable, Search, TablesTable } from '../../components'
import { Tooltip } from '@mui/material'
import { IconContext } from 'react-icons'
import { FaFilter } from 'react-icons/fa'
import { Table, TablesManagementProps, filterTables, searchTables } from '../../utils/restaurantManagementPortalUtils'


function TablesManagement({ userData, tables, setTables }: TablesManagementProps) {

    // Creating state variables to hold target tables
    const [targetTable, setTargetTable] = useState<Table>({
        id: 0,
        table_number: "",
        is_occupied: false
    })
    // Declaring state variables for filtering tables
    const [filterValue, setFilterValue] = useState<string | number>("All")

    // Defining a function to handle search input value change
    const handleTableSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>, setSearchData: React.Dispatch<React.SetStateAction<string>>) => {
        setSearchData(e.target.value);
        const searchValue = e.target.value;
        searchTables(searchValue, tables, setTables)
    }

    return (
        <div className='tables_management app__bg app__wrapper section_padding flex__center'>
            <section className='heading_wrapper'>
                <h1 className='headtext__playfair tablesManagementPage_heading'>{userData.role === "manager" ? "TABLES" : "MY TABLES"}</h1>
                <section className='add_table_link_wrapper'>
                    {
                        userData.role === "manager" && <Link to={"/restaurant-management/tables-management/add-table"} className='custom__button add_table_link'>+ ADD TABLE</Link>
                    }                
                </section>
            </section>
            <section className='tables_management_edit_table_wrapper flex__center'>
                <Routes>
                    <Route path="/add-table" element={<AddTable tables={tables} setTables={setTables} />} />
                    <Route path="/edit-table" element={<EditTable targetTable={targetTable} setTables={setTables} />} />
                </Routes>
            </section>

            <section className='tables_table_wrapper'>
                <TablesTable
                    userData={userData}
                    tables={tables}
                    setTargetTable={setTargetTable}
                    targetTable={targetTable}
                    setTables={setTables}
                    handleSearchOnChange={handleTableSearchOnChange}
                />
            </section>

            <section className='mobile_view_wrapper'>
                <div className="search_and_filter_wrapper">
                    {
                        userData.role === "manager" &&
                        <section className='search_wrapper'>
                            <Search
                                placeholderText={"Client name..."}
                                handleOnChange={handleTableSearchOnChange}
                            />
                        </section>
                    }

                    <Tooltip title="Filter Tables" arrow>
                        <section className='filterWrapper'>

                            <IconContext.Provider value={{ className: "filter_icon" }}>
                                <FaFilter />
                            </IconContext.Provider>

                            <Dropdown
                                label={""}
                                items={["All", "Occupied", "Unoccupied"]}
                                buttonText={filterValue}
                                clickFunction={(data) => {
                                    setFilterValue(data)
                                    filterTables(data.toString(), tables, setTables)
                                }}
                            />
                        </section>
                    </Tooltip>
                </div>

                {/* <section className='mobile_tables_wrapper'>
                    {tables.map(table =>
                        table.role !== "manager" &&
                        <TableComponent
                            key={tables.indexOf(table)}
                            userData={userData}
                            table={table}
                            setTargetTable={setTargetTable}
                            targetTable={targetTable}
                            tables={tables}
                            setTables={setTables}
                        />)}

                </section> */}

            </section>
        </div>
    )
}

export default TablesManagement
