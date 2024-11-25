import { CustomTask } from "../types/types";

interface Props {
  task: CustomTask;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 bg-neutral-200 w-96 h-96"
    >
      <div className="flex justify-between w-full">
        <p>Name</p>
        <p>{task.name}</p>
      </div>
      <div className="flex justify-between w-full">
        <p>Start</p>
        <p>{new Date(task.start).toString()}</p>
      </div>
      <div className="flex justify-between w-full">
        <p>End</p>
        <p>{new Date(task.end).toString()}</p>
      </div>
      <p>Children</p>
      {task.barChildren && task.barChildren?.length > 0 && (
        <div className="flex flex-col w-full gap-1">
          {task.barChildren?.map((child, index) => (
            <div key={index}>{child.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
