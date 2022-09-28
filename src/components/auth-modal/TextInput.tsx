import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface TextInputProps {
    type?: string, 
    placeholder?: string, 
    className?: string, 
    floatingLabel?: boolean, 
    helpText?: string, 
    onChange?: (val: string) => void, 
    label?: string, 
    containerClass ?: string,  
    error ?: string, 
    value?: string, 
    name?: string,
}
const TextInput = ({ type = 'text', placeholder = '', className = '', floatingLabel = false, helpText = '', onChange, label = '', containerClass = '', error = '', value='', ...rest }: TextInputProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className={`mb-4 w-full relative ${containerClass}`}>
            {label && <label htmlFor="text-input" className={`block text-primary  ${floatingLabel ? 'absolute left-4 top-2 text-xs z-10' : 'text-sm mb-2 font-medium'}`}>
                {label}
            </label>}
            <input type={visible ? 'text' : type} placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} className={`h-12 rounded-lg border border-[#E2E4E8] bg-white placeholder:text-body text-primary w-full text-sm focus:border-primary-purple focus:ring-0 ${error ? 'border-error focus:border-error' : ''} ${className}`} {...rest} />
            {error && <p className='text-error text-sm mt-2'>{error}</p>}
            {helpText && <p className='text-secondary text-sm opacity-50 mt-2'>{helpText}</p>}
            {type === 'password' && (
                <button className={`absolute ${label ? 'top-11' : 'top-4'} right-4 text-lg`} onClick={() => setVisible(!visible)}>
                    {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
            )}
        </div>
    );
}

export default TextInput;