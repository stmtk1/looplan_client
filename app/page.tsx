'use client';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "./components/calendar";
import { getCalendarStart } from "./utils/dates";
import { addMonths, format, formatISO, subMonths } from "date-fns";
import { getSchedules } from "./utils/api";
import { useRouter } from "next/navigation";

const headerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  height: '100px',
}

export default function ShowSchedule() {
  const [showing, setShowing] = useState(new Date());
  const router = useRouter();

  const start = useMemo(() => getCalendarStart(showing), [ showing ])
   useEffect(() => { getSchedules(start).then(console.log) }, []);

  const clickNewSchedule = useCallback(() => {
    router.push(`/schedule/new?date=${encodeURIComponent(formatISO(showing))}`);
  }, [ router ]);

  const onClickPrevMonth = useCallback(() => {
    setShowing(subMonths(showing, 1));
  }, [ showing, setShowing ]);

  const onClickNextMonth = useCallback(() => {
    setShowing(addMonths(showing, 1));
  }, [ showing, setShowing ]);

  return <div>
    <div style={headerStyle}>
      <button onClick={onClickPrevMonth}>前の月</button>
      <div onClick={clickNewSchedule}>
        <div>{format(showing, "yyyy年MM月dd日")}</div>
        <div>スケジュール作成</div>
      </div>
      <button onClick={onClickNextMonth}>次の月</button>
    </div>
    <Calendar start={start} showing={showing} setShowing={setShowing} />
  </div>;
}
