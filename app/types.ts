export type CreateSchedule = {
    name: string,
    date: Date,
    description: string,
    start_time: string,
    end_time: string,
}

export type UpdateSchedule = {
    id: string,
    name: string,
    date: Date,
    description: string,
    start_time: string,
    end_time: string,
}
export type RowSchedule = {
    id: string,
    name: string,
    description: string,
    start_time: string,
    end_time: string,
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