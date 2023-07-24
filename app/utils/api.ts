import { formatRFC3339, set } from "date-fns";
import { CreateSchedule, RowSchedules, RowSchedule, UpdateSchedule, ScheduleColors, CreateScheduleColor } from "../types";
import { getCalendarEnd, getCalendarStart } from "./dates";

export async function getScheduleColors(): Promise<ScheduleColors> {
    const cookie_value = document.cookie.split("; ").find((e: string) => e.match(/looplan=/))?.split("=")[1];
    const token = `BEARER ${cookie_value}`;
    const schedule = await (await fetch(
        `http://localhost:3000/schedule_color`, 
        { method: 'GET', headers: { AUTHORIZATION: token }})).json();
    return schedule;
}

export async function createScheduleColor(dto: CreateScheduleColor): Promise<void> {
    const cookie_value = document.cookie.split("; ").find((e: string) => e.match(/looplan=/))?.split("=")[1];
    const token = `BEARER ${cookie_value}`;
    const schedule = await (await fetch(
        `http://localhost:3000/schedule_color`, 
        { method: 'POST', headers: { AUTHORIZATION: token, 'Content-Type': 'application/json' }, body: JSON.stringify(dto)})).json();
    return schedule;
}


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

export async function updateSchedule(schedule: UpdateSchedule): Promise<RowSchedule> {
    const cookie_value = document.cookie.split("; ").find((e: string) => e.match(/looplan=/))?.split("=")[1];
    const token = `BEARER ${cookie_value}`;
    const body = {
        name: schedule.name,
        description: schedule.description,
        start_time: setTime(schedule.date, schedule.start_time),
        end_time: setTime(schedule.date, schedule.end_time),
        color_id: schedule.color_id,
    }
    const a = await (await fetch(
        `http://localhost:3000/schedule/${schedule.id}`, 
        { method: 'POST', headers: { AUTHORIZATION: token, 'Content-Type': 'application/json' }, body: JSON.stringify(body)})).json();
    return a
}

export async function getScheduleDetail(schedule_id: string): Promise<RowSchedule> {
    const cookie_value = document.cookie.split("; ").find((e: string) => e.match(/looplan=/))?.split("=")[1];
    const token = `BEARER ${cookie_value}`;
    const schedule = await (await fetch(
        `http://localhost:3000/schedule/${schedule_id}`, 
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
        color_id: dto.color_id,
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
