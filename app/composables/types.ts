export type Stage = 'backlog' | 'inprogress' | 'review' | 'done'

export interface Task{
    id: string
    title: string
    assignee?:string
    stage:Stage
    createdAt:number
    updatedAt:number
}