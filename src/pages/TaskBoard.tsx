import React from 'react';
import { TaskCard } from '../components/TaskCard';
import { Task, TaskStatus } from '../data/Task';
import { tasks } from '../data/tasks';
import './TaskBoard.css';



interface TaskColumnProps {
  columnTitle: string;
  tasks: Task[];
}
const TaskColumn: React.FC<TaskColumnProps> = ({ columnTitle, tasks }) => {
  return (
    <div className="task-column">
      <h3>{columnTitle}</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

const TaskBoard = () => {
  // gorup tasks by status 
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);
  const groupedKeys: TaskStatus[] = Object.keys(groupedTasks) as TaskStatus[];
  return (
    <div className="task-board">
      {groupedKeys.map((columnTitle: TaskStatus) => (
        <TaskColumn key={columnTitle} columnTitle={columnTitle} tasks={groupedTasks[columnTitle]} />
      ))}
    </div>
  );
};

export default TaskBoard;
