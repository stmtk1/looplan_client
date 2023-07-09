'use client';
import { startOfMonth, previousSunday } from 'date-fns';
import { ja } from 'date-fns/locale';


export function getCalendarStart(arg: Date) {
    return previousSunday(startOfMonth(arg));
}