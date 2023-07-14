'use client';
import { startOfMonth, previousSunday, endOfMonth, nextSaturday } from 'date-fns';

export function getCalendarStart(arg: Date): Date {
    return previousSunday(startOfMonth(arg));
}

export function getCalendarEnd(arg: Date): Date {
    return nextSaturday(endOfMonth(arg));
}

export function formatUTC(input_date: Date) {
    const year = input_date.getUTCFullYear().toString().padStart(4, '0');
    const month = input_date.getUTCMonth().toString().padStart(2, '0');
    const date = input_date.getUTCDate().toString().padStart(2, '0');
    const hour = input_date.getUTCHours().toString().padStart(2, '0');
    const minutes = input_date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = input_date.getUTCSeconds().toString().padStart(2, '0');
    const milliSeconds = input_date.getUTCMilliseconds().toString().padStart(6, '0');
    return `${year}-${month}-${date}T${hour}:${minutes}:${seconds}.${milliSeconds}Z`;
}