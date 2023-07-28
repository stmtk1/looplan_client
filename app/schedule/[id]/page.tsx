'use client';

import { useCallback, useEffect, useState } from "react";
import { getScheduleColors, getScheduleDetail, updateSchedule } from "../../utils/api"
import { ScheduleColor, UpdateSchedule } from "../../types";
import { toUpdateSchedule } from "../../utils/schedule";
import { InputSchedule } from "../../components/inputSchedule";
import { useRouter } from "next/navigation";
import { Header } from "../../components/header";

type Prop = { params: { id: string }}
const initState = { name: '', id: '', start_time: '00:00', end_time: '00:00', description: '', date: new Date(), color_id: '' };

const bodyStyle = {
    paddingTop: '60px',
};

export default function ShowSchedule({ params: { id } }: Prop) {
    const [schedule, setSchedule] = useState<UpdateSchedule>(initState);
    const [colors, setColors] = useState<ScheduleColor[]>([]);
    const router = useRouter();
    useEffect(() => { getScheduleDetail(id).then((res) => setSchedule(toUpdateSchedule(res))) }, [ id, setSchedule ]);
    useEffect(() => { getScheduleColors().then((res) => setColors(res.schedule_colors)) }, [ id, setSchedule ]);
    const onUpdateSchedule = useCallback(() => { updateSchedule(schedule).then(() => router.push('/')) }, [ schedule, router ]);
    return <div>
        <Header router={router} />
        <div style={bodyStyle}>
            <InputSchedule schedule={ schedule } setSchedule={setSchedule} colors={colors} />
            <button onClick={onUpdateSchedule}>スケジュール更新</button>
        </div>
    </div>
}