'use client';

import { useCallback, useEffect, useState } from "react";
import { getScheduleDetail, updateSchedule } from "../../utils/api"
import { UpdateSchedule } from "../../types";
import { toUpdateSchedule } from "../../utils/schedule";
import { InputSchedule } from "../../components/inputSchedule";

type Prop = { params: { id: string }}

export default function ShowSchedule({ params: { id } }: Prop) {
    const [schedule, setSchedule] = useState<UpdateSchedule>({ name: '', id: '', start_time: '00:00', end_time: '00:00', description: '', date: new Date() });
    useEffect(() => { getScheduleDetail(id).then((res) => setSchedule(toUpdateSchedule(res))) }, [ id, setSchedule ]);
    const onUpdateSchedule = useCallback(() => { updateSchedule(schedule) }, [ schedule ]);
    return <div>
        <InputSchedule schedule={ schedule } setSchedule={setSchedule} />
        <button onClick={onUpdateSchedule}>スケジュール更新</button>
    </div>
}