'use client'

import { format } from "date-fns"
import { CreateSchedule, ScheduleColor } from "../types"
import { useCallback } from "react";
type InputElement = { target: { value: string; }; };
type SelectElement = { target: { value: string }; };

type Prop<T extends CreateSchedule> = { schedule: T, setSchedule: (t: T) => void, colors: ScheduleColor[] }
export function InputSchedule<T extends CreateSchedule>({ schedule, setSchedule, colors }: Prop<T>) {
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

    const changeColorId = useCallback(
        (e: SelectElement) => setSchedule({...schedule, color_id: e.target.value}), [ schedule, setSchedule]
    );

    return <div>
        <div>{format(schedule.date, "yyyy年MM月dd日")}のスケジュール</div>
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
        <div>
            <label>種別</label>
            <select onChange={changeColorId} value={schedule.color_id}>
                <option label="種別を選択" value="" />)
                {colors.map((color) =>
                    <option
                        label={color.name}
                        value={color.id}
                        key={color.id} style={{backgroundColor: color.color}}
                    />)
                }
            </select>
        </div>
    </div>
}
