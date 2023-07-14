'use client';

import { addDays, format, getDate, getISODay, getMonth } from "date-fns";
import React, { useCallback } from "react";
import { DistributedSchedule, Schedule } from "../types";

type Prop = { start: Date, showing: Date, setShowing: (selected: Date) => void, schedules: DistributedSchedule };

export function Calendar({ start, showing, setShowing, schedules }: Prop) {
    const style = {
        display: 'grid',
        gridTemplate: 'repeat(6, 1fr) / repeat(7, 1fr)',
        gridAutoFlow: 'row',
        height: '600px',
        width: '700px',
    };


    return <div style={style}>
        {new Array(42).fill(null).map((_, i) => {
            const selected = addDays(start, i);
            const key = format(selected, "yyyy-MM-dd");
            return <DateBox
                key={i}
                selected={selected}
                thisMonth={getMonth(selected) == getMonth(showing)}
                setShowing={setShowing}
                schedules={schedules[key]}
            />
        })
        }
    </div>
}

type DateBoxProp = { selected: Date, thisMonth: boolean, setShowing: (date: Date) => void, schedules: Schedule[] | undefined };
function DateBox({ selected, thisMonth, setShowing, schedules }: DateBoxProp) {
    const color = getColor(selected, thisMonth);
    const style = {
        color,
        border: 'solid black 0.1px',
    }

    const onClick = useCallback((e: React.MouseEvent) => { 
        setShowing(selected);
     }, [ selected, setShowing ]);
    return <div style={style}>
        <div onClick={onClick}>{getDate(selected)}</div>
        {schedules?.length && <div>{schedules!.length}件の予定</div> }
    </div>
}

function getColor(showing: Date, thisMonth: boolean) {
    const day = getISODay(showing);
    if (thisMonth && day == 7) {
        return '#f00';
    } else if (thisMonth && day == 6) {
        return '#00f';
    } else if (thisMonth) {
        return '#000'
    } else if (day == 7) {
        return '#faa';
    } else if (day == 6) {
        return '#99f';
    } else {
        return '#888';
    }
}