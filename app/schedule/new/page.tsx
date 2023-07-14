"use client"
import { parseISO } from "date-fns";
import { CreateSchedule } from "../../types";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createSchedule } from "../../utils/api";


type InputElement = { target: { value: string; }; }
type PageParams = { searchParams: { date: string } };

export default function ScheduleCreator({ searchParams: { date: date_str }}: PageParams) {
    const date = parseISO(date_str);
    const [schedule, setSchedule] = useState<CreateSchedule>({ name: '', description: "", start_time: '00:00', end_time: '00:00', date });
    const router = useRouter();

    const changeScheduleName = useCallback(
        (e: InputElement) => setSchedule({...schedule, name: e.target.value}), [schedule, setSchedule]
    );
    const changeScheduleDescription = useCallback(
        (e: InputElement) => setSchedule({...schedule, description: e.target.value}), [schedule, setSchedule]
    );
    const changeScheduleStartTime = useCallback(
        (e: InputElement) => setSchedule({...schedule, start_time: e.target.value}), [schedule, setSchedule]
    );
    const changeScheduleEndTime = useCallback(
        (e: InputElement) => setSchedule({...schedule, end_time: e.target.value}), [schedule, setSchedule]
    );
    const onClickCreateSchedule = useCallback(
        () => createSchedule(schedule).then(() => router.push('/')), [schedule, router]
    );
    return <div>
        <div>
            <label>名前</label>
            <input type="input" value={schedule.name} onChange={changeScheduleName} />
        </div>
        <div>
            <label>詳細</label>
            <input type="input" value={schedule.description} onChange={changeScheduleDescription} />
        </div>
        <div>
            <label>開始時間</label>
            <input type="time" value={schedule.start_time} onChange={changeScheduleStartTime} />
        </div>
        <div>
            <label>終了時間</label>
            <input type="time" value={schedule.end_time} onChange={changeScheduleEndTime} />
        </div>
        <button onClick={onClickCreateSchedule}>スケジュール作成</button>
    </div>
}