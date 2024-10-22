import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { TaskCard } from '../components/TaskCard';
import { DefaultRightTray, LeftTray, TaskColumnHeader } from '../components/TaskColumnHeader';
import { GroupingTypes, Task, TaskPriorityTypes, TaskStatusTypes } from '../data/Task';
import { tasks } from '../data/tasks';
import './TaskBoard.css';
import { getBoardColumnKeys, groupTasks } from './utils';

interface TaskColumnProps {
  columnTitle: string;
  tasks: Task[];
  groupedby: GroupingTypes;
}
const TaskColumn: React.FC<TaskColumnProps> = ({ columnTitle, tasks, groupedby }) => {
  console.log(tasks)
  return (
    <div className="task-column">
      <TaskColumnHeader>
        <LeftTray>
          <BsThreeDots />
          <div className="text-sm bold">{columnTitle}</div>
          <div className="text-sm">{tasks?.length ?? 0}</div>
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
  const groupby: GroupingTypes = 'Status'
  const groupedTasks = groupTasks(groupby, tasks);
  const keys = getBoardColumnKeys(groupby, tasks);
  return (
    <div className="task-board">
      {keys.map((columnTitle) => (
        <TaskColumn groupedby={groupby} key={columnTitle} columnTitle={columnTitle} tasks={groupedTasks[columnTitle] ?? []} />
      ))}
    </div>
  );
};

export default TaskBoard;
