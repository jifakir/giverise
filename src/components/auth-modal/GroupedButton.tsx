import React from "react";

interface GroupedInputProps {
    type?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent) => void;
    inputDisabled?: boolean;
    actionDisabled?: boolean;
    value?: string;
    actionText?: string;
};

const GroupedInput = ({ type = 'text', placeholder = '', onChange = undefined, inputDisabled = false, actionDisabled = false, actionText = 'Send Code', onClick, value, ...rest }: GroupedInputProps) => (
    <div className="flex items-center mb-4">
        <input value={value} disabled={inputDisabled} type={type} placeholder={placeholder} onChange={onChange} className={`h-12 rounded-l-lg border-r-0 border border-[#E2E4E8] peer  bg-white placeholder:text-body text-primary w-full text-sm focus:border-primary-purple focus:ring-0`} {...rest} />
        <button onClick={onClick} disabled={actionDisabled} className='bg-[#f3f3f3] disabled:bg-opacity-20 disabled:text-opacity-20 h-12 rounded-r-lg border-l-0 border border-[#E2E4E8] text-primary text-sm font-normal inline-block min-w-max px-3 peer-focus:border-primary-purple'>
            {actionText}
        </button>
    </div>
);


export default GroupedInput;