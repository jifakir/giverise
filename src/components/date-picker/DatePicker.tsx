import { Dropdown, Select } from 'antd';
import { addDays, endOfMonth, endOfWeek, format, setMonth, setYear, startOfMonth, startOfWeek } from 'date-fns';
import React, { useMemo, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa';
import { CalendarIcon } from '../icons';
import Cell from './Cell';


// full name of the months
const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
// all the years from 2010 to 2030
const years: number[] = [];
for (let i = ((new Date()).getFullYear() - 10); i <= ((new Date()).getFullYear() + 10); i++) {
    years.push(i);
}

export type CalendarWeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface DatePickerProps {
    date?: Date;
    onChange?: (date: Date) => void;
    label?: string;
    placeholder?: string;
    weekStartsOn?: CalendarWeekStartsOn;
}

const DatePicker = ({ date, label = 'Set Deadline', placeholder = 'Select', weekStartsOn = 1, onChange }: DatePickerProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
    const [visible, setVisible] = useState(false);

    const dayNames = useMemo(() => {
        const weekStart = startOfWeek(currentMonth, {
            weekStartsOn: weekStartsOn,
        });
        const days = [];

        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="grid place-items-center h-[21px] w-11 font-medium text-sm text-body" data-testid="calendar-day">
                    {format(addDays(weekStart, i), 'EEEEEE')}
                </div>
            );
        }

        return days;
    }, [currentMonth]);

    const dates = useMemo(() => {
        if (!currentMonth) return null;

        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const dateStart = startOfWeek(monthStart, {
            weekStartsOn: weekStartsOn,
        });
        const dateEnd = endOfWeek(monthEnd, {
            weekStartsOn: weekStartsOn,
        });
        const dates = [];

        let date = dateStart;

        while (date <= dateEnd) {
            dates.push(<Cell onSelectDate={onSelectDate} key={format(date, 'T')} selectedDate={selectedDate} date={date} currentMonth={currentMonth} />);
            date = addDays(date, 1);
        }

        return dates;
    }, [currentMonth, selectedDate, onSelectDate]);

    function onSelectDate(date: Date) {
        setSelectedDate(date);
        setVisible(false);
        onChange?.(date);
    }

    const onClear = () => {
        setSelectedDate(undefined);
        setCurrentMonth(new Date());
        setVisible(false);
    }

    const onSet = () => {
        setSelectedDate(currentMonth);
        setVisible(false);
    }

    const onChangeYear = (value: number) => {
        setCurrentMonth(setYear(currentMonth, value));
    }

    const onChangeMonth = (value: number) => {
        setCurrentMonth(setMonth(currentMonth, value));
    }

    return (
        <>
            <Dropdown visible={visible} onVisibleChange={(flag) => setVisible(flag)} trigger={['click']} overlay={
                <div className='w-[343px] datepicker-container p-4'>
                    <div className="flex items-center gap-4">
                        <Select onChange={onChangeMonth} bordered={false} className="w-full datepicker-select" suffixIcon={<FaAngleDown />} value={currentMonth.getMonth()}>
                            {months.map((month, i) => (
                                <Select.Option value={i} key={i}>{month}</Select.Option>
                            ))}
                        </Select>
                        <Select onChange={onChangeYear} bordered={false} placeholder="Select Year" className="w-full datepicker-select" suffixIcon={<FaAngleDown />} value={currentMonth.getFullYear()}>
                            {years.map((year, i) => (
                                <Select.Option value={year} key={i}>{year}</Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className="grid grid-cols-7 gap-x-1 mt-4">
                        {dayNames}
                    </div>
                    <div className="grid grid-cols-7 gap-x-1 gap-y-4 mt-4">
                        {dates}
                    </div>
                    <div className="flex items-center justify-between mt-5 gap-4">
                        <button onClick={onClear} className='h-11 w-full bg-white border border-primary-stroke text-primary rounded-lg inline-flex items-center justify-center'>
                            Clear
                        </button>
                        <button onClick={onSet} className='h-11 w-full bg-primary-purple text-white rounded-lg inline-flex items-center justify-center'>
                            Set
                        </button>
                    </div>
                </div>
            }>

                <div className="relative">
                    <label className='text-primary text-[22px] font-bold mb-2'>{label}</label>
                    <input placeholder={placeholder} value={selectedDate ? format(selectedDate, 'MM/dd/yyyy') : ''} className='w-full h-12 rounded-lg focus:outline-none focus:ring-0 border border-primary-stroke focus:border-primary-purple focus:bg-primary-purple focus:bg-opacity-5 caret-transparent px-12 text-sm text-body' />
                    <span className='absolute bottom-3 left-4 text-xl'>
                        <CalendarIcon />
                    </span>
                </div>
            </Dropdown>
        </>
    )
}

export default DatePicker;