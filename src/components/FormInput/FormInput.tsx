import React from 'react'

type Props = {
    label: string;
    inputType: string;
    inputValue: string;
    required: boolean;
    readonly: boolean;
    onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

function FormInput({label, inputType, inputValue, required, readonly, onChangeFunction}: Props) {
  return (
    <div className='forminput_wrapper'>
        <p className='p__inter forminput_label'>{label}</p>
        <input className='formInput' type={inputType} required={required} value={inputValue} readOnly={readonly} onChange={onChangeFunction}/>
    </div>
  )
}

export default FormInput
