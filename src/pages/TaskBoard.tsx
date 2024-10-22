import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { TaskCard } from '../components/TaskCard';
import { DefaultRightTray, LeftTray, TaskColumnHeader } from '../components/TaskColumnHeader';
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
      <TaskColumnHeader>
        <LeftTray>
          <BsThreeDots />
          <div className="text-sm bold">{columnTitle}</div>
          <div className="text-sm">{tasks.length}</div>
        </LeftTray>
        <DefaultRightTray />
      </TaskColumnHeader>
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
