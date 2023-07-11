'use client';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "./components/calendar";
import { getCalendarStart } from "./utils/dates";
import { addMonths, getMonth, getYear, subMonths } from "date-fns";
import { getSchedules } from "./utils/api";

export default async function SignUp() {
  const [start, setStart] = useState(getCalendarStart(new Date()));
  const [showing, setShowing] = useState(new Date());
  const month = useMemo(() => {
    return getMonth(showing);
  }, [ showing ]);
  const headerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    height: '100px',
  }


  useEffect(() => { getSchedules(start).then(console.log) }, []);
  const onClickPrevMonth = useCallback(() => {
    setShowing(subMonths(showing, 1));
    setStart(getCalendarStart(subMonths(showing, 1)));
  }, [ showing, setShowing, setStart ]);

  const onClickNextMonth = useCallback(() => {
    setShowing(addMonths(showing, 1));
    setStart(getCalendarStart(addMonths(showing, 1)));
  }, [ showing, setShowing, setStart ]);

  return <div>
    <div style={headerStyle}>
      <button onClick={onClickPrevMonth}>前の月</button>
      <div>{getYear(showing)}年{month + 1}月</div>
      <button onClick={onClickNextMonth}>次の月</button>
    </div>
    <Calendar start={start} showing={showing} />
  </div>;
}
