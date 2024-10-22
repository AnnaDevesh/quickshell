export type TaskStatus = 'Todo' | 'In progress' | 'Done' | 'Backlog';
export const TaskPriority = {
  NoPriority: 0,
  Low: 1,
  Medium: 2,
  High: 3,
  Urgent: 4,
}

export type Task = {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: TaskStatus;
  priority: number;
}
