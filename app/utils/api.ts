import { endOfMonth } from "date-fns";
import { cookies } from "next/headers";
import { formatUTC } from './dates';


type Schedules = { hello: string }
export async function getSchedules(start: Date): Promise<Schedules> {
    const cookie_value = document.cookie.split("; ").find((e: string) => e.match(/looplan=/))?.split("=")[1];
    const token = `BEARER ${cookie_value}`;
    const end = endOfMonth(start);
    const encoded_start = encodeURI(formatUTC(start));
    const encoded_end = encodeURI(formatUTC(end));
    console.log(encoded_start);
    const schedule = await (await fetch(
        `http://localhost:3000/schedule?start_time=${encoded_start}&end_time=${encoded_end}`, 
        { method: 'GET', headers: { AUTHORIZATION: token }})).json();
    return schedule;
}
