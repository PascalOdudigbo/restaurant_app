import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { AddTableFormType, AddTableProps, createTable } from '../../utils/restaurantManagementPortalUtils';
import Dropdown from '../Dropdown/Dropdown';

function AddTable({tables, setTables}: AddTableProps) {
    // creating state variables for controlled form inputs
    const [tableData, setTableData] = useState<AddTableFormType>({
        table_number: "",
        is_occupied: false
    })

    // Declaring navigation variable function
    // const navigate = useNavigate()



    return (
        <div className='add_table_wrapper flex__center'>
            <header className='add_table_header'>
                <h3 className='headtext__playfair add_table_header_title'>ADD TABLE</h3>
                <Link to="/restaurant-management/tables-management" className='headtext__playfair add_table_header_close'>X</Link>
            </header>
            <form className='add_table_form' onSubmit={(e) => { console.log("clicked"); createTable(e, tableData, tables, setTables) }}>

                <FormInput
                    label='Table Number *'
                    inputType='text'
                    inputValue={tableData.table_number}
                    required={true}
                    readonly={false}
                    onChangeFunction={(e) => { setTableData({ ...tableData, table_number: e.target.value }) }}
                />

                <Dropdown
                    label={"Is Occupied *"}
                    items={["Occupied", "UnOccupied"]}
                    buttonText={tableData.is_occupied ? "Occupied" : "Unoccupied"}
                    clickFunction={(data) => {
                        setTableData({...tableData, is_occupied: data === "Occupied" ? true : false})
                    }}
                />

                <button type="submit" className='custom__button add_table_form_button'>SAVE</button>
            </form>

        </div>
    )
}

export default AddTable
