import React, { useState } from 'react'
import { Dropdown, Search, TableRow } from ".."
import { FaFilter } from "react-icons/fa";
import { Tooltip } from '@mui/material';
import { IconContext } from 'react-icons';
import { TablesTableProps, filterTables } from '../../utils/restaurantManagementPortalUtils';

function TablesTable({ userData, tables, setTargetTable, targetTable, setTables, handleSearchOnChange }: TablesTableProps) {
    // Declaring state variables for filtering bookings
    const [filterValue, setFilterValue] = useState<string | number>("All")
    return (
        <div className='users_table_wrapper'>
            <section className='search_and_filter_Wrapper'>
                <div className="table_search_wrapper">
                    {
                        userData.role === "manager" &&
                        <Search
                            placeholderText={"Table no..."}
                            handleOnChange={handleSearchOnChange}
                        />
                    }

                </div>

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
            </section>


            <table className="tables_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className="p__inter table_header">TABLE NUMBER</th>
                        <th className="p__inter table_header">OCCUPIED</th>
                       {userData.role === "manager"  && <th className="p__inter table_header">ACTION</th>}
                    </tr>
                </thead>

                <tbody className='table_body'>
                    {tables?.map((table) => (
                        <TableRow
                            key={tables.indexOf(table)}
                            userData={userData}
                            table={table}
                            setTargetTable={setTargetTable}
                            targetTable={targetTable}
                            tables={tables}
                            setTables={setTables}
                        />
                    ))}
                </tbody>
            </table>
            {tables?.length < 1 && <h3 className="p__inter no_tables_text">NO TABLES</h3>}

        </div>
    )
}

export default TablesTable
