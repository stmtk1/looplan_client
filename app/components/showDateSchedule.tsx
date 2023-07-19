import { format } from "date-fns"
import { Schedule } from "../types"
import { useCallback } from "react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"

type Prop = { schedules: Schedule[] | undefined, router: AppRouterInstance }
export function ShowDateSchedules({ schedules, router }: Prop) {
    return <div>
        {schedules?.map((schedule, i) => <ShowDateSchedule key={i} schedule={schedule} router={router} />) || "その日の予定はありません。"}
    </div>
}

const scheduleBodyStyle = {
    display: 'grid',
    border: 'solid black 0.1px',
    gridTemplate: 'repeat(4, 1fr) / repeat(2, 1fr)',
    minWidth: '9rem',
    width: '100%',
}

type DateScheduleProp = { schedule: Schedule, router: AppRouterInstance }
export function ShowDateSchedule({ schedule, router }: DateScheduleProp) {
    const onEditSchedule = useCallback(() => { router.push(`/schedule/${ schedule.id }`) }, [ schedule.id, router ])
    return <div style={scheduleBodyStyle}>
        <div>名前</div><div>{schedule.name}</div>
        <div>詳細</div><div>{schedule.description}</div>
        <div>開始</div><div>{format(schedule.start_time, 'hh:mm')}</div>
        <div>終了</div><div>{format(schedule.end_time, 'hh:mm')}</div>
        <button onClick={onEditSchedule}>スケジュール編集</button>
    </div>
}