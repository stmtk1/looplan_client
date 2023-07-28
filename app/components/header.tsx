'use client';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useCallback } from "react";

const style = {
    position: 'fixed' as const,
    display: 'flex',
    flexFlow: 'row',
    color: 'white',
    backgroundColor: 'black',
    width: '100vw',
    top: 0,
    left: 0,
    height: '60px',
    fontSize: '30px',
};

const linkStyle = {
    cursor: 'pointer',
};

type Prop = { router: AppRouterInstance };

export function Header({router}: Prop) {
    const onClickScheduleColor = useCallback(() => router.push('/schedule_color'), [ router ]);
    return <div style={style}>
        <div style={linkStyle} onClick={onClickScheduleColor}>スケジュール種別</div>
    </div>
}