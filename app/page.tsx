'use client';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "./components/calendar";
import { getCalendarStart } from "./utils/dates";
import { addMonths, format, formatISO, subMonths } from "date-fns";
import { getSchedules, getScheduleColors } from "./utils/api";
import { useRouter } from "next/navigation";
import { RowSchedule } from "./types";
import { ShowDateSchedules } from "./components/showDateSchedule";
import { distributeSchedule, toSchedule } from "./utils/schedule";

const headerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  height: '100px',
}

const bodyStyle = {
  display: 'flex',
}

export default function ShowSchedule() {
  const [showing, setShowing] = useState(new Date());
  const [rowSchedules, setRowSchedules] = useState<RowSchedule[]>([]);
  const router = useRouter();

  const start = useMemo(() => getCalendarStart(showing), [ showing ])
   useEffect(() => { getSchedules(showing).then((res) => setRowSchedules(res.schedules)) }, [ showing ]);
   useEffect(() => { getScheduleColors().then(console.log) }, [ showing ]);

  const clickNewSchedule = useCallback(() => {
    router.push(`/schedule/new?date=${encodeURIComponent(formatISO(showing))}`);
  }, [ router, showing ]);

  const onClickPrevMonth = useCallback(() => {
    setShowing(subMonths(showing, 1));
  }, [ showing, setShowing ]);

  const onClickNextMonth = useCallback(() => {
    setShowing(addMonths(showing, 1));
  }, [ showing, setShowing ]);

  const schedules = useMemo(() => rowSchedules.map(toSchedule), [ rowSchedules ]);
  const distributedSchedule = useMemo(() => distributeSchedule(schedules), [ schedules ]);
  console.log(distributedSchedule);

  return <div>
    <div style={headerStyle}>
      <button onClick={onClickPrevMonth}>前の月</button>
      <div onClick={clickNewSchedule}>
        <div>{format(showing, "yyyy年MM月dd日")}</div>
        <div>スケジュール作成</div>
      </div>
      <button onClick={onClickNextMonth}>次の月</button>
    </div>
    <div style={bodyStyle}>
      <Calendar start={start} showing={showing} setShowing={setShowing} schedules={distributedSchedule} />
      <ShowDateSchedules schedules={distributedSchedule[format(showing, "yyyy-MM-dd")]} router={router} />
    </div>
  </div>;
}

