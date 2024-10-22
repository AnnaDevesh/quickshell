import React from 'react';
import { BsThreeDots } from "react-icons/bs";
import { BsExclamationSquareFill } from "react-icons/bs";
import { AiFillSignal } from "react-icons/ai";
import { Task, TaskPriority, TaskStatus } from "../data/Task";
import { TbCellSignal2, TbCellSignal4 } from "react-icons/tb";
import { priorityKeyFromValue } from '../pages/utils';

interface ChildProps {
  children: React.ReactNode;
  className?: string
}

export const TaskCardContainer = ({ children, className }: ChildProps) => {
  return <div className={`task-card text-left rounded-lg border ${className}`}>{children}</div>
}

export const TaskTitle = ({ title }: { title: string }) => {
  return <div className="text-md bold line-clamp-2">{title}</div>
};

export const TagsList = ({ tags }: { tags: string[] }) => {
  return <div>
    {tags.map((tag) => (
      <TaskTag key={tag} tag={tag} />
    ))}
  </div>
};

const TaskTag = ({ tag }: { tag: string }) => {
  return <span className="flex align-center border border-light rounded-md px-2 py-1 text-sm gap-1">
    <span className="tag-circle rounded-full mr-1"></span>
    {tag}
  </span>;
};

export const TaskCardIcon = ({ task, className }: { task: Task, className?: string }) => {
  return <span className={`flex align-center border border-light rounded-md p-1 mr-1 ${className}`}>
    <PriorityIcon priority={priorityKeyFromValue(task.priority)} />
  </span>;
};

export const PriorityIcon = ({ priority }: { priority: keyof typeof TaskPriority }) => {
  const iconMap: Record<keyof typeof TaskPriority, any> = {
    NoPriority: () => <BsThreeDots />,
    Urgent: () => <BsExclamationSquareFill color="orange" />,
    High: () => <AiFillSignal />,
    Medium: () => <TbCellSignal4 />,
    Low: () => <TbCellSignal2 />,
  };

  return iconMap[priority]();
};

export const UserIcon = ({ userid, className }: { userid: string, className?: string }) => {
  return <img className={`avatar ${className}`} src={`https://randomuser.me/api/portraits/thumb/men/75.jpg`} alt="avatar" />
};

export const StatusIcon = ({ status }: { status: TaskStatus }) => {
  const iconMap: Record<TaskStatus, any> = {
    Todo: () => <BsThreeDots />,
    'In progress': () => <BsThreeDots />,
    Done: () => <BsThreeDots />,
    Backlog: () => <BsThreeDots />,
  };

  return iconMap[status]();
};
