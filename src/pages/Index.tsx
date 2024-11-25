import { useState } from "react";
import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import TaskCard from "../components/TaskCard";
import { CustomTask } from "../types/types";

const Index = () => {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [tasks, setTasks] = useState<CustomTask[]>([
    {
      start: new Date(2024, 10, 25),
      end: new Date(2024, 11, 5),
      name: "Project A",
      id: "Project1",
      type: "project", // Parent task
      progress: 0, // Progress will be calculated dynamically
      styles: { progressColor: "#6a1b9a", progressSelectedColor: "#4a148c" },
    },
    {
      start: new Date(2024, 10, 25),
      end: new Date(2024, 10, 30),
      name: "Requirement Gathering",
      id: "Task1",
      type: "task", // Child task
      progress: 75,
      dependencies: [],
      project: "Project1", // Link to parent task
      styles: { progressColor: "#4caf50", progressSelectedColor: "#388e3c" },
    },
    {
      start: new Date(2024, 10, 28),
      end: new Date(2024, 11, 5),
      name: "Development Phase 1",
      id: "Task2",
      type: "task", // Child task
      progress: 50,
      dependencies: ["Task1"],
      project: "Project1", // Link to parent task
      styles: { progressColor: "#1976d2", progressSelectedColor: "#1565c0" },
    },
    {
      start: new Date(2024, 11, 6),
      end: new Date(2024, 11, 12),
      name: "Testing Phase",
      id: "Task3",
      type: "task", // Child task
      progress: 30,
      dependencies: ["Task2"],
      project: "Project1", // Link to parent task
      styles: { progressColor: "#ff9800", progressSelectedColor: "#f57c00" },
    },
  ]);

  // Update progress for a specific task
  const updateProgress = (taskId: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, progress: Math.min(task.progress + 10, 100) }
          : task
      );

      // Recalculate parent task progress
      const parentsToUpdate = new Set(
        updatedTasks.filter((t) => t.id === taskId).map((t) => t.project)
      );

      return updatedTasks.map((task) => {
        if (parentsToUpdate.has(task.id)) {
          const children = updatedTasks.filter((t) => t.project === task.id);
          const totalProgress = children.reduce(
            (sum, child) =>
              sum +
              child.progress * (child.end.getTime() - child.start.getTime()),
            0
          );
          const totalDuration = children.reduce(
            (sum, child) => sum + (child.end.getTime() - child.start.getTime()),
            0
          );
          return {
            ...task,
            progress: totalDuration
              ? Math.round((totalProgress / totalDuration) * 100)
              : 0,
          };
        }
        return task;
      });
    });
  };

  return (
    <div className="w-screen h-screen bg-neutral-200">
      {selectedTask && (
        <div
          className="absolute z-50 grid w-screen h-screen bg-white place-content-center"
          onClick={() => setSelectedTask(undefined)}
        >
          <TaskCard task={selectedTask} />
        </div>
      )}

      <Gantt
        tasks={tasks}
        onDoubleClick={(e) => setSelectedTask(e)}
        listCellWidth="100px"
      />
      <div className="p-4 bg-white rounded shadow">
        <h2 className="mb-2 text-lg font-semibold">Progress Adder</h2>
        <ul className="space-y-2">
          {tasks
            .filter((task) => task.type === "task")
            .map((task) => (
              <li key={task.id} className="flex items-center justify-between">
                <span>
                  <strong>{task.name}</strong> - Progress: {task.progress}%
                </span>
                <button
                  onClick={() => updateProgress(task.id)}
                  disabled={task.progress === 100}
                  className={`px-4 py-2 text-white rounded ${
                    task.progress === 100
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {task.progress === 100 ? "Completed" : "Add Progress"}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
