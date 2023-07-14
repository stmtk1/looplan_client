import { endOfMonth, formatISO, set } from "date-fns";
import { CreateSchedule } from "../types";


type Schedules = { hello: string }
export async function getSchedules(start: Date): Promise<Schedules> {
    const cookie_value = document.cookie.split("; ").find((e: string) => e.match(/looplan=/))?.split("=")[1];
    const token = `BEARER ${cookie_value}`;
    const end = endOfMonth(start);
    const encoded_start = encodeURIComponent(formatISO(start));
    const encoded_end = encodeURIComponent(formatISO(end));
    console.log(encoded_start);
    const schedule = await (await fetch(
        `http://localhost:3000/schedule?start_time=${encoded_start}&end_time=${encoded_end}`, 
        { method: 'GET', headers: { AUTHORIZATION: token }})).json();
    return schedule;
}

export async function createSchedule(dto: CreateSchedule): Promise<Schedules> {
    const cookie_value = document.cookie.split("; ").find((e: string) => e.match(/looplan=/))?.split("=")[1];
    const token = `BEARER ${cookie_value}`;
    const start = formatISO(setTime(dto.date, dto.start_time));
    const end = formatISO(setTime(dto.date, dto.end_time));
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