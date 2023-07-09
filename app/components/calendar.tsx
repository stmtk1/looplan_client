'use client';

import { addDays, getDate, getISODay, getMonth } from "date-fns";

type Prop = { start: Date, showing: Date };

export function Calendar({ start, showing }: Prop) {
    const style = {
        display: 'grid',
        'grid-template': 'repeat(6, 1fr) / repeat(7, 1fr)',
        'grid-auto-flow': 'row',
        'height': '600px',
        'width': '700px',
    };
    return <div style={style}>
        {new Array(42).fill(null).map((_, i) => {
            const selected = addDays(start, i);
            return <DateBox key={i} selected={selected} thisMonth={getMonth(selected) == getMonth(showing)} />
        })
        }
    </div>
}

type DateBoxProp = { selected: Date, thisMonth: boolean };
function DateBox({ selected, thisMonth }: DateBoxProp) {
    const color = getColor(selected, thisMonth);
    const style = {
        color,
        border: 'solid black 0.1px',
    }
    return <div style={style}>{getDate(selected)}</div>
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