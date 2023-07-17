'use client';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "./components/calendar";
import { getCalendarStart } from "./utils/dates";
import { addMonths, format, formatISO, parseISO, subMonths } from "date-fns";
import { getSchedules } from "./utils/api";
import { useRouter } from "next/navigation";
import { Schedule, RowSchedule, DistributedSchedule } from "./types";
import { ShowDateSchedules } from "./components/showDateSchedule";

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
      <ShowDateSchedules schedules={distributedSchedule[format(showing, "yyyy-MM-dd")]} />
    </div>
  </div>;
}

function distributeSchedule(schedules: Schedule[]): DistributedSchedule {
  const ret: DistributedSchedule = {}
  for (const schedule of schedules) {
    const key = format(schedule.start_time, "yyyy-MM-dd");
    if (ret[key] == undefined) {
      ret[key] = [schedule]
    } else {
      ret[key].push(schedule);
    }
  }
  return ret;
}

function toSchedule(row: RowSchedule): Schedule {
  return {
    ...row,
    start_time: parseISO(row.start_time),
    end_time: parseISO(row.end_time),
  }
}