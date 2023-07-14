'use client';

import { addDays, getDate, getISODay, getMonth } from "date-fns";
import React, { useCallback } from "react";

type Prop = { start: Date, showing: Date, setShowing: (selected: Date) => void };

export function Calendar({ start, showing, setShowing }: Prop) {
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
            return <DateBox
                key={i}
                selected={selected}
                thisMonth={getMonth(selected) == getMonth(showing)}
                setShowing={setShowing}
            />
        })
        }
    </div>
}

type DateBoxProp = { selected: Date, thisMonth: boolean, setShowing: (date: Date) => void };
function DateBox({ selected, thisMonth, setShowing }: DateBoxProp) {
    const color = getColor(selected, thisMonth);
    const style = {
        color,
        border: 'solid black 0.1px',
    }

    const onClick = useCallback((e: React.MouseEvent) => { 
        console.log(selected);
        setShowing(selected);
     }, [ selected, setShowing ]);
    return <div style={style} onClick={onClick}>{getDate(selected)}</div>
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