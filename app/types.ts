export type ScheduleColor = {
    color: string,
    name: string,
    id:string,
}

export type CreateScheduleColor = {
    name: string,
    color: string,
}

export type ScheduleColors = {
    schedule_colors: ScheduleColor[]
}

export type CreateSchedule = {
    name: string,
    date: Date,
    description: string,
    start_time: string,
    end_time: string,
    color_id: string,
}

export type UpdateSchedule = {
    id: string,
    name: string,
    date: Date,
    description: string,
    start_time: string,
    end_time: string,
    color_id: string,
}
export type RowSchedule = {
    id: string,
    name: string,
    description: string,
    start_time: string,
    end_time: string,
    color_id: string,
}

export type Schedule = {
    id: string,
    name: string,
    description: string,
    start_time: Date,
    end_time: Date,
}

export type RowSchedules = { schedules: RowSchedule[] }

export type DistributedSchedule = {[K in string]: Schedule[]};