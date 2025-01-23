export interface Task {
    name: string,
    content: string,
    done: boolean,
    id?: number
}

export enum TaskStatusFilter {
    "ALL" = "all",
    "DONE" = "done",
    "PENDING" = "pending"
}