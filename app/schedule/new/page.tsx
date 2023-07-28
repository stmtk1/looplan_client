"use client"
import { parseISO } from "date-fns";
import { CreateSchedule, ScheduleColor } from "../../types";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSchedule, getScheduleColors } from "../../utils/api";
import { InputSchedule } from "../../components/inputSchedule";
import { Header } from "../../components/header";

type PageParams = { searchParams: { date: string } };

const bodyStyle = {
    paddingTop: '60px',
};

export default function ScheduleCreator({ searchParams: { date: date_str }}: PageParams) {
    const date = parseISO(date_str);
    const [schedule, setSchedule] = useState<CreateSchedule>({ name: '', description: "", start_time: '00:00', end_time: '00:00', date, color_id: '' });
    const [colors, setColors] = useState<ScheduleColor[]>([]);
    useEffect(() => { getScheduleColors().then((res) => setColors(res.schedule_colors)) }, [ setSchedule ]);
    const router = useRouter();

    const onClickCreateSchedule = useCallback(
        () => createSchedule(schedule).then(() => router.push('/')), [schedule, router]
    );
    return <div>
        <Header router={router} />
        <div style={bodyStyle}>
            <InputSchedule schedule={schedule} setSchedule={setSchedule} colors={colors} />
            <button onClick={onClickCreateSchedule}>スケジュール作成</button>
        </div>
    </div>
}