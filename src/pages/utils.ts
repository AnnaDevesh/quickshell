import { GroupingTypes, Task, TaskPriority, TaskPriorityTypes, TaskStatusTypes } from "../data/Task";

function priorityKeyFromValue(value: number): string {
  const key = TaskPriorityTypes.find((key) => TaskPriority[key] === value);
  if (key === undefined) {
    throw new Error('Invalid priority value')
  }
  return key;
}

function getKey(groupby: GroupingTypes, task: Task) {
  if (groupby === 'Status') {
    return task.status;
  } else if (groupby === 'Priority') {
    return priorityKeyFromValue(task.priority);
  } else if (groupby === 'User') {
    return task.userId;
  }
  throw new Error('Invalid grouping type');
}

export function groupTasks(groupby: GroupingTypes, tasks: Task[]) {
  return tasks.reduce((acc, task) => {
    let key: string | number = getKey(groupby, task);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(task);
    return acc;
  }, {} as Record<any, Task[]>);
}

export function getBoardColumnKeys(groupby: GroupingTypes, tasks: Task[]) {
  if (groupby === 'Status') {
    return TaskStatusTypes;
  } else if (groupby === 'Priority') {
    return TaskPriorityTypes;
  } else if (groupby === 'User') {
    return [...new Set(tasks.map(task => task.userId))];
  }
  throw new Error('Invalid grouping type');
}
