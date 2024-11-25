import { useEffect, useState } from "react";
import { CustomTask, TaskListType } from "../types/types";

interface Props {
  tasks: CustomTask[];
}

const TaskList: React.FC<Props> = ({ tasks }) => {
  const [groupedTasks, setGroupedTasks] = useState<TaskListType[]>([
    { name: "todo", tasks: [] },
    { name: "in-progress", tasks: [] },
    { name: "done", tasks: [] },
  ]);

  useEffect(() => {
    const groupTaskByStatus = () => {
      const _groupedTasks: TaskListType[] = [
        { name: "todo", tasks: [] },
        { name: "in-progress", tasks: [] },
        { name: "done", tasks: [] },
      ];

      tasks.forEach((task) => {
        if (task.progress === 0) {
          _groupedTasks[0].tasks.push(task);
        } else if (task.progress > 0 && task.progress < 100) {
          _groupedTasks[1].tasks.push(task);
        } else if (task.progress === 100) {
          _groupedTasks[2].tasks.push(task);
        }
      });

      setGroupedTasks(_groupedTasks);
    };

    groupTaskByStatus();
  }, [tasks]);

  return (
    <div>
      <h1 className="pt-5 pb-5 text-xl font-semibold text-center">
        THIS IS A TESTING BOARD
      </h1>
      <div className="grid w-full grid-cols-3 gap-1">
        {groupedTasks.map((groupedTask, index) => (
          <div key={index} className="w-full bg-white h-52">
            <h1>{groupedTask.name}</h1>
            <div className="grid">
              {groupedTask.tasks.map((task, taskIndex) => (
                <p key={taskIndex}>{task.name}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
