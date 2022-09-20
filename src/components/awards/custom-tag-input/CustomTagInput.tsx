import React, { ReactNode, useState } from 'react'
import { FaTimes } from 'react-icons/fa';

interface IProps {
    tags?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
    labelTxt?: string;
    label?: ReactNode;
    tagLimit?: number;
    tagCharacterLimit?: number;
};

const CustomTagInput = ({ tags = [], onChange, placeholder = 'Add search keywords to your scholarship', label, labelTxt = 'Press Enter to add a tag', tagLimit = 10, tagCharacterLimit = 25 }: IProps) => {
    const [value, setValue] = useState('');
    const [tagInputs, setTagInputs] = useState<string[]>(tags);

    const addTag = () => {
        if (value.length > tagCharacterLimit || tagInputs.length > tagLimit) return;

        const items = [...tagInputs, value];
        setValue('');
        setTagInputs(items);
        onChange?.(items);
    }

    const removeTag = (tag: string) => {
        const items = [...tagInputs.filter(item => item !== tag)];
        setTagInputs(items);
        onChange?.(items);
    }

    return (
        <>
            {label ? label : null}
            <div className="flex items-center gap-x-4 relative">
                <label className='absolute top-2 left-4 text-[10px] text-secondary'>{labelTxt}</label>
                <input onKeyUp={e => e.key === 'Enter' && addTag()} value={value} onChange={e => setValue(e.target.value)} className={`${value.length > tagCharacterLimit ? 'border-error' : 'border-primary-stroke'} w-[90%] smMax:w-full h-12 rounded-lg bg-white border  text-body text-sm px-4 focus:border-primary-purple focus:bg-primary-purple focus:bg-opacity-5 focus:ring-0 focus:outline-none pt-4`} placeholder={placeholder} />
                <button onClick={addTag} className='h-12 w-[70px] rounded-lg px-4 inline-flex items-center justify-center text-base font-medium border border-[#C1C7D0] smMax:hidden'>
                    Add
                </button>
            </div>
            <div className='w-[85%] px-1 flex items-center justify-between text-xs text-body mt-2'>
                <span>{tagInputs.length}/{tagLimit} tags</span>
                <span>{value.length}/{tagCharacterLimit}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap mt-2">
                {tagInputs.map(tag => (
                    <div key={tag} className='inline-flex items-center bg-primary-purple bg-opacity-5 rounded-[3px] h-[30px] px-3 text-xs'>
                        {tag}
                        <button className='ml-2' onClick={() => removeTag(tag)}><FaTimes /></button>
                    </div>
                ))}
            </div>
            <button onClick={addTag} className='h-12 w-[70px] mt-3 rounded-lg px-4 hidden items-center justify-center text-base font-medium border border-[#C1C7D0] smMax:flex'>
                Add
            </button>
        </>
    )
}

export default CustomTagInput;