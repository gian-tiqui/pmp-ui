import React, { useState, useRef, useEffect } from "react";
import { CustomTask, TaskListType } from "../types/types";
import useTasksStore from "../store/tasks";

interface Props {
  tasks: CustomTask[];
  onTaskDrop?: (taskId: string, newGroup: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onTaskDrop }) => {
  const [groupedTasks, setGroupedTasks] = useState<TaskListType[]>([
    { name: "todo", tasks: [] },
    { name: "in-progress", tasks: [] },
    { name: "done", tasks: [] },
  ]);
  const { setTasks } = useTasksStore();

  const draggedItemRef = useRef<CustomTask | null>(null);

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

  const handleDragStart = (
    task: CustomTask,
    event: React.DragEvent<HTMLDivElement>
  ) => {
    draggedItemRef.current = task;
    event.dataTransfer.setData("text/plain", task.id);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetGroup: string
  ) => {
    event.preventDefault();

    const droppedTaskId = event.dataTransfer.getData("text/plain");
    if (!droppedTaskId || !draggedItemRef.current) return;

    const updatedGroupedTasks = [...groupedTasks];
    const sourceGroupIndex = updatedGroupedTasks.findIndex((group) =>
      group.tasks.find((t) => t.id === droppedTaskId)
    );
    const targetGroupIndex = updatedGroupedTasks.findIndex(
      (group) => group.name === targetGroup
    );

    if (
      sourceGroupIndex !== -1 &&
      targetGroupIndex !== -1 &&
      sourceGroupIndex !== targetGroupIndex
    ) {
      const sourceGroup = updatedGroupedTasks[sourceGroupIndex];
      const sourceTasks = sourceGroup.tasks.filter(
        (t) => t.id !== droppedTaskId
      );
      sourceGroup.tasks = sourceTasks;

      const draggedTask = draggedItemRef.current as CustomTask;
      switch (targetGroup) {
        case "todo":
          draggedTask.progress = 0;
          break;
        case "done":
          draggedTask.progress = 100;
          break;
        case "in-progress":
          draggedTask.progress = 50;
          break;
        default:
          break;
      }
      updatedGroupedTasks[targetGroupIndex].tasks.push(draggedTask);
      setGroupedTasks(updatedGroupedTasks);

      const newTasks = [...updatedGroupedTasks.flatMap((group) => group.tasks)];

      setTasks(newTasks);

      if (!onTaskDrop) return;
      onTaskDrop(droppedTaskId, targetGroup);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1 className="pt-5 pb-5 text-xl font-semibold text-center">
        THIS IS A TESTING BOARD
      </h1>
      <div className="grid w-full grid-cols-3 gap-1">
        {groupedTasks.map((groupedTask, index) => (
          <div
            key={index}
            className="w-full p-2 bg-white h-52"
            onDrop={(event) => handleDrop(event, groupedTask.name)}
            onDragOver={handleDragOver}
          >
            <h1>{groupedTask.name}</h1>
            <div className="grid">
              {groupedTasks[index].tasks.map((task, taskIndex) => (
                <p
                  key={taskIndex}
                  draggable
                  onDragStart={(event) => handleDragStart(task, event)}
                >
                  {task.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
