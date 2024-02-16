import React from 'react'

type Props = {
    label: string;
    inputType: string;
    inputValue: string;
    required: boolean;
    onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

function FormInput({label, inputType, inputValue, required, onChangeFunction}: Props) {
  return (
    <div className='forminput_wrapper'>
        <p className='forminput_label'>{label}</p>
        <input className='formInput' type={inputType} required={required} value={inputValue} onChange={onChangeFunction}/>
    </div>
  )
}

export default FormInput
