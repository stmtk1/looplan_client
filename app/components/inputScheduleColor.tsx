'use client'

import { format } from "date-fns"
import { CreateScheduleColor } from "../types"
import { useCallback } from "react";
type InputElement = { target: { value: string; }; }

type Prop<T extends CreateScheduleColor> = { color: T, setColor: (t: T) => void }
export function InputScheduleColor<T extends CreateScheduleColor>({ color, setColor }: Prop<T>) {
    const changeColorName = useCallback(
        (e: InputElement) => setColor({...color, name: e.target.value}), [color, setColor]
    );

    const changeColorColor = useCallback(
        (e: InputElement) => setColor({...color, color: e.target.value}), [color, setColor]
    );
    return <div>
        <div>スケジュール種別追加</div>
        <div>
            <label>名前</label>
            <input type="input" value={color.name} onChange={changeColorName} />
        </div>
        <div>
            <label>色</label>
            <input type="color" value={color.color} onChange={changeColorColor} />
        </div>
    </div>
}
