import { format, parseISO } from "date-fns";
import { DistributedSchedule, RowSchedule, Schedule, UpdateSchedule } from "../types";

export function distributeSchedule(schedules: Schedule[]): DistributedSchedule {
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

export function toSchedule(row: RowSchedule): Schedule {
  return {
    ...row,
    start_time: parseISO(row.start_time),
    end_time: parseISO(row.end_time),
  }
}

export function toUpdateSchedule(row: RowSchedule): UpdateSchedule {
  const date = parseISO(row.end_time);
  return {
    ...row,
    start_time: format(parseISO(row.start_time), 'hh:mm'),
    end_time: format(parseISO(row.end_time), 'hh:mm'),
    date,
  }
}