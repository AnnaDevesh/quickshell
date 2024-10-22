import { BsThreeDots } from "react-icons/bs";
import { AiFillExclamationCircle } from 'react-icons/ai';
import { FaSignal } from 'react-icons/fa';
import { Task, TaskPriority } from "../data/Task";

export const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="task-card text-left rounded-lg border">
      <div className='flex align-center'>
        <div className="text-sm">{task.id}</div>
        <img className='avatar ml-auto' src={`https://randomuser.me/api/portraits/thumb/men/75.jpg`} alt="avatar" />
      </div>
      <div className="text-md bold">{task.title}</div>
      <div className='flex align-center gap-1 mt-3'>
        <TaskCardIcon task={task} />
        <div>
          {task.tag.map((tag) => (
            <TaskTag key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TaskTag = ({ tag }: { tag: string }) => {
  return <span className="flex align-center border border-light rounded-md px-2 py-1 text-sm gap-1">
    <span className="tag-circle rounded-full mr-1"></span>
    {tag}
  </span>;
};

const TaskCardIcon = ({ task, className }: { task: Task, className?: string }) => {
  const iconMap = {
    [TaskPriority.NoPriority]: () => <BsThreeDots />,
    [TaskPriority.Urgent]: () => <AiFillExclamationCircle color="orange" />,
    [TaskPriority.High]: () => <FaSignal color="gray" />,
    [TaskPriority.Medium]: () => <FaSignal color="grey" style={{ opacity: 0.6 }} />,
    [TaskPriority.Low]: () => <FaSignal color="grey" style={{ opacity: 0.3 }} />,
  };

  return <span className={`flex align-center border border-light rounded-md p-1 mr-1 ${className}`}> {iconMap[task.priority]()} </span>;
};
