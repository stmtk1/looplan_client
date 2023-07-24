"use client"
import { CreateScheduleColor } from "../../types";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { createScheduleColor } from "../../utils/api";
import { InputScheduleColor } from "../../components/inputScheduleColor";

export default function ScheduleCreator() {
    const [color, setColor] = useState<CreateScheduleColor>({ name: '', color: '#ff0000' });
    const router = useRouter();

    const onClickCreateScheduleColor = useCallback(
        () => createScheduleColor(color).then(() => router.push('/')), [color, router]
    );
    return <div>
        <InputScheduleColor color={color} setColor={setColor} />
        <button onClick={onClickCreateScheduleColor}>スケジュール作成</button>
    </div>
}