import React from 'react'

type Props = {
    label: string;
    inputValue: string;
    required: boolean;
    rows: number;
    cols: number;
    onChangeFunction: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

}

function TextArea({label, inputValue, required, rows, cols, onChangeFunction}: Props) {
  return (
    <div className='textarea_wrapper'>
        <p className='p__inter textarea_label'>{label}</p>
        <textarea className='p__inter textarea' rows={rows} cols={cols} required={required} value={inputValue.substring(0, 119)} onChange={onChangeFunction}/>
        <p className='p__inter input_count'>{inputValue.length}/120</p>
    </div>
  )
}

export default TextArea
