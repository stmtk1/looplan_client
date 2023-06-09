import { formatRFC3339, set } from "date-fns";
import { CreateSchedule, RowSchedules } from "../types";
import { getCalendarEnd, getCalendarStart } from "./dates";


export async function getSchedules(date: Date): Promise<RowSchedules> {
    const cookie_value = document.cookie.split("; ").find((e: string) => e.match(/looplan=/))?.split("=")[1];
    const token = `BEARER ${cookie_value}`;
    const start = getCalendarStart(date);
    const end = getCalendarEnd(date);
    const encoded_start = encodeURIComponent(formatRFC3339(start));
    const encoded_end = encodeURIComponent(formatRFC3339(end));
    const schedule = await (await fetch(
        `http://localhost:3000/schedule?start_time=${encoded_start}&end_time=${encoded_end}`, 
        { method: 'GET', headers: { AUTHORIZATION: token }})).json();
    return schedule;
}

export async function createSchedule(dto: CreateSchedule): Promise<RowSchedules> {
    const cookie_value = document.cookie.split("; ").find((e: string) => e.match(/looplan=/))?.split("=")[1];
    const token = `BEARER ${cookie_value}`;
    const start = formatRFC3339(setTime(dto.date, dto.start_time));
    const end = formatRFC3339(setTime(dto.date, dto.end_time));
    const body = {
        name: dto.name,
        description: dto.description,
        start_time: start,
        end_time: end,
    }
    const schedule = await (await fetch(
        `http://localhost:3000/schedule`, 
        { method: 'POST', headers: { AUTHORIZATION: token, 'Content-Type': 'application/json' }, body: JSON.stringify(body)})).json();
    console.log(schedule);
    return schedule;
}

function setTime(input_date: Date, time_str: string): Date {
    const hours = parseInt(time_str.split(':')[0])
    const minutes = parseInt(time_str.split(':')[1])
    return set(input_date, { hours, minutes });
}