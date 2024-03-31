import React, { useEffect, useState } from 'react'
type Props = {
    label: string;
    selectionLimit: number;
    defaultDate: string | number;
    setDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormInputDate({ label, selectionLimit, defaultDate, setDate }: Props) {
    // state variables to hold the values for maximum and minim calendar dates that can be selected
    // based on the assigned selection limit prop
    const [minDate, setMinDate] = useState<string | number>("")
    const [maxDate, setMaxDate] = useState<string | number>("")

    useEffect(() => {
        // calculate today's date
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];

        // calculate date selection limit days from today
        const selectionLimitDaysFromToday = new Date(today);
        selectionLimitDaysFromToday.setDate(today.getDate() + selectionLimit);
        const formattedSelectionLimitDaysFromToday = selectionLimitDaysFromToday.toISOString().split('T')[0];

        // setting the minimum and maxim acceptable availablity dates
        setMinDate(formattedToday);
        setMaxDate(formattedSelectionLimitDaysFromToday);

    }, [selectionLimit])

    return (
        <div className='formInputDate_wrapper'>
            <p className='p__inter formInputDate_label'>{label}</p>
            <input className="formInputDate" type="date" min={minDate} max={maxDate} value={defaultDate} onChange={(e) => { setDate(e) }} />

        </div>
    )
}

export default FormInputDate
