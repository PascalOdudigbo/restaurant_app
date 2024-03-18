import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { EditTableFormType, EditTableProps, editTable } from '../../utils/restaurantManagementPortalUtils';
import Dropdown from '../Dropdown/Dropdown';

function EditTable({ targetTable, setTables }: EditTableProps) {
    // creating state variables for controlled form inputs
    const [tableData, setTableData] = useState<EditTableFormType>({
        table_number: targetTable.table_number ? targetTable.table_number : "",
        is_occupied: targetTable.is_occupied ? targetTable.is_occupied : false,
    })

    // Declaring navigation variable function
    const navigate = useNavigate()

    useEffect(() => {
        targetTable.id < 1 && navigate("/restaurant-management/tables-management")
    }, [targetTable, navigate])

    return (
        <div className='edit_table_wrapper flex__center'>
            <header className='edit_table_header'>
                <h3 className='headtext__playfair edit_table_header_title'>EDIT TABLE</h3>
                <Link to="/restaurant-management/tables-management" className='headtext__playfair edit_table_header_close'>X</Link>
            </header>
            <form className='edit_table_form' onSubmit={(e) => { console.log("clicked"); editTable(e, targetTable, tableData, setTables) }}>
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
                        setTableData({ ...tableData, is_occupied: data === "Occupied" ? true : false })
                    }}
                />

                <button type="submit" className='custom__button edit_table_form_button'>UPDATE</button>
            </form>

        </div>
    )
}

export default EditTable
