import React, { useState } from 'react';
import { Navbar } from '../components/NavBar';
import { PriorityIcon, StatusIcon, TagsList, TaskCardContainer, TaskCardIcon, TaskTitle, UserIcon } from '../components/TaskCard';
import { DefaultRightTray, LeftTray, TaskColumnHeader } from '../components/TaskColumnHeader';
import { GroupingTypes, SortingTypes, Task } from '../data/Task';
import { tasks } from '../data/tasks';
import './TaskBoard.css';
import { getBoardColumnKeys, groupTasks, priorityKeyFromValue, sortGrouppedTasks } from './utils';

interface TaskColumnProps {
  columnTitle: string;
  tasks: Task[];
  groupedby: GroupingTypes;
}
const TaskColumn: React.FC<TaskColumnProps> = ({ columnTitle, tasks, groupedby }) => {
  const GroupIcon = () => {
    let firstElement = tasks.length > 0 ? tasks[0] : undefined;
    if (groupedby === 'Priority') {
      //@ts-ignore
      return <PriorityIcon priority={(firstElement !== undefined) ? priorityKeyFromValue(firstElement.priority) : columnTitle} />
    } else if (groupedby === 'User') {
      return <UserIcon userid={firstElement?.userId ?? columnTitle} />
    } else if (groupedby === 'Status') {
      //@ts-ignore
      return <StatusIcon status={firstElement?.status ?? columnTitle} />
    }
    throw new Error('Invalid grouping type');
  };
  return (
    <div className="task-column">

      <TaskColumnHeader>
        <LeftTray>
          <GroupIcon />
          <div className="text-sm bold">{columnTitle}</div>
          <div className="text-sm">{tasks?.length ?? 0}</div>
        </LeftTray>
        <DefaultRightTray />
      </TaskColumnHeader>

      {tasks.map((task) => (
        <TaskCardContainer className='flex'>
          <div>
            <div className="text-sm mb-2">{task.id}</div>
            <div className='flex gap-3'>
              {(groupedby !== 'Status') && <StatusIcon status={task.status} />}
              <TaskTitle title={task.title} />
            </div>
            <div className='flex align-center gap-1 mt-3'>
              {(groupedby !== 'Priority') && <TaskCardIcon task={task} />}
              <TagsList tags={task.tags} />
            </div>
          </div>

          {(groupedby !== 'User') && <UserIcon userid={task.userId} className="ml-auto" />}
        </TaskCardContainer>
      ))}
    </div>
  );
};


const TaskBoard = () => {
  const [groupby, setGroupBy] = useState<GroupingTypes>('Priority');
  const [sortby, setSortby] = useState<SortingTypes>('Priority');
  const groupedTasks = sortGrouppedTasks( groupTasks(groupby, tasks), sortby); 
  const keys = getBoardColumnKeys(groupby, tasks);
  return (
    <>
      <Navbar
        selectedGroup={groupby}
        selectedSort={sortby}
        onSortChange={(tp) => {setSortby(tp)}}
        onGroupChange={(grp) => { setGroupBy(grp) }}
      />
      <div className="task-board">
        {keys.map((columnTitle) => (
          <TaskColumn groupedby={groupby} key={columnTitle} columnTitle={columnTitle} tasks={groupedTasks[columnTitle] ?? []} />
        ))}
      </div>
    </>
  );
};

export default TaskBoard;
