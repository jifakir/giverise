import React, { ChangeEvent } from 'react'

interface IProps {
    label?: string;
    name?: string;
    value?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    size?: string;
}
const CustomRadio = ({ label, name, value, checked, onChange, size = '' }: IProps) => {
    return (
        <label className={`flex items-center cursor-pointer custom-radio ${size}`}>
            <input onChange={onChange} type="radio" name={name} value={value} className='z-10 cursor-pointer' checked={checked} />
            <span className='checkmark -z-0'></span>
            <span className='ml-1 text-sm font-normal'>{label}</span>
        </label>
    )
}

export default CustomRadio;