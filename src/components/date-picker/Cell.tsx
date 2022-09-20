
import { format, isSameDay, isSameMonth, isToday } from 'date-fns';
import React from 'react'

const Cell = ({ date, selectedDate, currentMonth, onSelectDate }: { date: Date, currentMonth: Date, selectedDate?: Date, onSelectDate?: (date: Date) => void }) => {
    let classes = '';

    if (!isSameMonth(date, currentMonth)) {
        classes += 'text-opacity-0 '
    }

    if (!(selectedDate && isSameDay(date, selectedDate)) && isToday(date)) {
        classes += ' text-primary-purple'
    } else if ((selectedDate && isSameDay(date, selectedDate))) {
        classes += ' border border-primary-purple text-primary-purple'
    } else {
        classes += ' text-primary'
    }

    return (
        <div onClick={() => isSameMonth(date, currentMonth) && onSelectDate?.(date)} className={`h-8  rounded-[4px] text-sm cursor-pointer grid place-items-center ${classes}`}>
            {format(date, 'd')}
        </div>
    )
}

export default Cell;