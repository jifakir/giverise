import { Dropdown } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { BiSearch, BiXCircle } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';


type OptionType = string[] | { label: string, value: string }[];

interface DropdownMenuProps {
    options: OptionType;
    selected: string[] | string;
    handleFilter: (value: string) => void;
    handleSelect: (value: string, isChecked: boolean) => void;
    mode?: 'single' | 'multiple';
    hideSearch?: boolean;
    customOption?: boolean;
}

const getValue = (key: 'label' | 'value', option: string | { label: string; value: string }) => {
    if (typeof option === "string") {
        return option;
    }
    return option[key];
}

const DropdownMenu = ({ options = [], selected = [], handleFilter, handleSelect, mode = 'multiple', hideSearch = false, customOption = false }: DropdownMenuProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [showCustomField, setShowCustomField] = useState(false);
    const [customValue, setCustomValue] = useState('');

    const addCustomValue = () => {
        if (customValue.trim()) {
            handleSelect?.(customValue, mode === 'multiple');
        }
        setCustomValue('');
        setShowCustomField(false);
    }



    return (
        <>
            {options.length ? (

                <div className={`checkbox-dropdown-container rounded-lg ${options.length > 5 ? 'h-[300px]' : 'max-h-[300px]'} w-full p-4 overflow-hidden`}>
                    {!hideSearch && (
                        <div className="relative w-[80%] mb-4">
                            <input ref={ref} onChange={(e) => handleFilter?.(e.target.value)} placeholder='Search' className='text-xs text-body w-full rounded-lg h-7 px-8 border border-[#E2E4E8] box-border focus:outline-none' />
                            <span className='absolute top-2 left-3 text-body text-sm'>
                                <BiSearch />
                            </span>

                            <button className='absolute top-2 right-3 text-body text-sm' onClick={() => {
                                if (ref.current) {
                                    ref.current.value = '';
                                    handleFilter?.('');
                                }
                            }}>
                                <BiXCircle />
                            </button>
                        </div>
                    )}
                    <div className='overflow-y-auto h-[85%] pb-2 checkbox-dropwdown'>
                        {mode === 'multiple' && Array.isArray(selected) ? options.map(option => (
                            <label className='flex items-center cursor-pointer pb-3' key={getValue('value', option)}>
                                <input onChange={(e) => handleSelect?.(e.target.value, e.target.checked)} checked={selected.includes(getValue('value', option))} value={getValue('value', option)} type="checkbox" className='rounded-[4px] w-[22px] h-[22px] checked:text-primary-purple ring-0 outline-none focus:ring-0 focus:outline-none' />
                                <span className='text-sm font-medium text-body ml-4'>{getValue('label', option)}</span>
                            </label>
                        )) :
                            options.map(option => (
                                <label className={`${option === selected ? 'text-primary-purple' : 'text-body'} flex items-center cursor-pointer p-2 hover:text-primary-purple hover:bg-opacity-80 text-sm font-medium  w-full last-of-type:pb-0`} key={getValue('value', option)} onClick={() => handleSelect?.(getValue('value', option), false)}>
                                    {getValue('label', option)}
                                </label>
                            ))
                        }
                    </div>
                    {customOption && (
                        <div className='border-t border-primary-stroke pt-3'>
                            {!showCustomField ? (
                                <button className='text-sm font-medium text-body px-2' onClick={() => setShowCustomField(true)}>Custom</button>
                            ) : (
                                <div className="flex items-center gap-x-4 relative">
                                    <input value={customValue} onChange={(e) => setCustomValue(e.target.value)} className={`border-primary-stroke w-[90%] h-8 rounded-lg bg-white border  text-body text-sm px-4 focus:ring-0 focus:outline-none`} placeholder="Enter Custom" />
                                    <button onClick={addCustomValue} className='h-8 w-14 rounded-lg px-4 inline-flex items-center justify-center text-base font-medium border border-[#C1C7D0]'>
                                        Add
                                    </button>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
}


interface MultiSelectCheckBoxProps {
    className?: string;
    inputClass?: string;
    placeholder?: string;
    label?: React.ReactElement;
    options?: OptionType;
    value?: string[] | string;
    onChange?: (value: string[] | string) => void;
    mode?: 'single' | 'multiple';
    hideSearch?: boolean;
    customOption?: boolean;
}

const MultiSelectCheckBox = (
    {
        hideSearch = false,
        customOption = false,
        mode = 'multiple',
        className = '',
        inputClass = '',
        placeholder = 'Select',
        label = undefined,
        options = [],
        value = [],
        onChange
    }: MultiSelectCheckBoxProps
) => {
    const [filteredOptions, setFilteredOptions] = useState<OptionType>(options);
    const [selectedOptions, setSelectedOptions] = useState<string[] | string>(value);
    const [showDrowDown, setShowDropDown] = useState(false);

    const handleSelect = (value: string, checked: boolean) => {
        console.log('selected should be clicked/ ', value);

        if (Array.isArray(selectedOptions) && mode === 'multiple') {
            let items = [...selectedOptions];
            if (checked && !items.includes(value)) {
                items = [...items, value];
            } else {
                items = [...items.filter(item => item.toLowerCase() !== value.toLowerCase())];
            }

            setSelectedOptions([...items]);
            onChange?.(items);
        } else {
            setSelectedOptions(value);
            onChange?.(value);
            console.log(value)
        }
        if (mode !== 'multiple') {
            setShowDropDown(false);
        }
    }

    const handleFilter = (value: string) => {
        if (value && value.trim()) {
            setFilteredOptions((filteredOptions as []).filter((item: any) => getValue('value', item).toLowerCase().includes(value.trim().toLowerCase())));
        } else {
            setFilteredOptions([...options] as []);
        }
    }

    const removeItem = (_item: string) => {
        if (Array.isArray(selectedOptions)) {
            let items = [...selectedOptions]
            items = [...selectedOptions.filter(item => item.toLowerCase() !== _item.toLowerCase())]
            setSelectedOptions(items);
            onChange?.(items);
        }
    }


    return (
        <div className={`w-full ${className}`}>
            <Dropdown visible={showDrowDown} onVisibleChange={(visible) => setShowDropDown(visible)} trigger={['click']} overlay={
                <DropdownMenu
                    handleFilter={handleFilter}
                    handleSelect={handleSelect}
                    options={filteredOptions}
                    selected={selectedOptions}
                    mode={mode}
                    hideSearch={hideSearch}
                    customOption={customOption}
                />
            }>
                <div className="relative w-full">
                    {label}
                    <input value={(mode === 'single' && options) ? getValue('label', (options as []).find((opt: any) => getValue('value', opt) === selectedOptions) ?? '') : ''} placeholder={placeholder} className={`focus:caret-transparent h-12 rounded-lg w-full bg-white border border-[#E2E4E8] focus:bg-primary-purple focus:bg-opacity-5 focus:border-primary-purple focus:outline-none px-4 placeholder:text-body text-body text-sm ${inputClass}`} />
                    <span className='absolute text-primary right-4 bottom-4 text-base'>
                        <FiChevronDown />
                    </span>
                </div>
            </Dropdown>
            {selectedOptions?.length && Array.isArray(selectedOptions) ? (
                <div className="flex items-center gap-4 flex-wrap mt-2">
                    {selectedOptions.map(option => (
                        <div key={option} className='inline-flex items-center bg-primary-purple bg-opacity-5 rounded-[3px] h-[30px] px-3 text-xs'>
                            {option}
                            <button className='ml-2' onClick={() => removeItem(option)}><FaTimes /></button>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default MultiSelectCheckBox;