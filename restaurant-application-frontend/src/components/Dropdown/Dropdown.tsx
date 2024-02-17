import React, { useState } from 'react'
import { IconContext } from "react-icons";
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'

type Props = {
    label: string;
    items: number[] | string[];
    buttonText: string | number;
    clickFunction: (item: string | number) => void;
}
function Dropdown({ label, items, buttonText, clickFunction }: Props) {
    // state variables to control dropdown items display
    const [itemsDisplay, setItemsDisplay] = useState<boolean>(false);
    // variable to determine the dropdown
    const iconStyles = { color: "#FFD700" };

    // Type guard function to check if 'item' is a number
    const isNumber = (item: any): item is number => typeof item === 'number';

    // Type guard function to check if 'item' is a string
    // const isString = (item: any): item is string => typeof item === 'string';



    return (
        <div className='dropdown_label_and_dropdown_wrapper'>
            <p className='p__inter dropdown_label'>{label}</p>

            <div className='dropdown_wrapper'>
                <div className='dropdown_button_icons_wrapper' onClick={() => setItemsDisplay(prevItemsDisplay => !prevItemsDisplay)}>
                    <p className="p__inter dropdown_button">{buttonText}</p>
                    <IconContext.Provider value={{ size: "20px", className: "dropdown_arrow_icons" }}>
                        {itemsDisplay ? <AiOutlineUp style={iconStyles} /> : <AiOutlineDown style={iconStyles} />}
                    </IconContext.Provider>
                </div>


                <div className="dropdown_items" style={{ display: itemsDisplay ? "block" : "none" }}>
                    {items?.map((item, index) => (
                        <p key={index} className="p__inter" onClick={() => {
                            clickFunction(isNumber(item) ? item : item)
                            setItemsDisplay(false)
                        }}>
                            {item}
                        </p>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Dropdown;
