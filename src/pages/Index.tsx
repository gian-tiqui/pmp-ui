import { useEffect, useState } from "react";
import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import TaskCard from "../components/TaskCard";
import { CustomTask } from "../types/types";
import useTasksStore from "../store/tasks";
import TaskList from "../components/TaskList";

const Index = () => {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const { setTasks } = useTasksStore();
  const [tasks, _setTasks] = useState<CustomTask[]>([
    {
      start: new Date(2024, 10, 25),
      end: new Date(2024, 11, 5),
      name: "Project A",
      id: "Project1",
      type: "project",
      progress: 0,
      styles: {
        progressColor: "#6a1b9a",
        progressSelectedColor: "#4a148c",
      },
    },
    {
      start: new Date(2024, 10, 25),
      end: new Date(2024, 10, 30),
      name: "Requirement Gathering",
      id: "Task1",
      type: "task",
      progress: 75,
      dependencies: [],
      project: "Project1",
      styles: { progressColor: "#4caf50", progressSelectedColor: "#388e3c" },
    },
    {
      start: new Date(2024, 10, 28),
      end: new Date(2024, 11, 5),
      name: "Development Phase 1",
      id: "Task2",
      type: "task",
      progress: 0,
      dependencies: ["Task1"],
      project: "Project1",
      styles: { progressColor: "#1976d2", progressSelectedColor: "#1565c0" },
    },
    {
      start: new Date(2024, 11, 6),
      end: new Date(2024, 11, 12),
      name: "Testing Phase",
      id: "Task3",
      type: "task",
      progress: 0,
      dependencies: ["Task2"],
      project: "Project1",
      styles: { progressColor: "#ff9800", progressSelectedColor: "#f57c00" },
    },
  ]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskStart, setNewTaskStart] = useState(new Date());
  const [newTaskEnd, setNewTaskEnd] = useState(new Date());

  const updateProgress = (taskId: string) => {
    _setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, progress: Math.min(task.progress + 10, 100) }
          : task
      );

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

  const addNewTask = () => {
    const newTask: CustomTask = {
      start: newTaskStart,
      end: newTaskEnd,
      name: newTaskName,
      id: `Task${tasks.length + 1}`,
      type: "task",
      progress: 0,
      project: "Project1",
      styles: { progressColor: "#2196f3", progressSelectedColor: "#1976d2" },
    };

    _setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskName("");
    setNewTaskStart(new Date());
    setNewTaskEnd(new Date());
  };

  useEffect(() => {
    setTasks(tasks);
  }, [setTasks, tasks]);

  return (
    <div className="w-screen bg-neutral-200">
      {selectedTask && (
        <div
          className="absolute z-50 grid w-screen h-screen bg-white place-content-center"
          onClick={() => setSelectedTask(undefined)}
        >
          <TaskCard task={selectedTask} />
        </div>
      )}
      <div className="flex justify-center gap-3 pt-5 pb-5">
        <p className="text-xl font-semibold">
          THIS IS A TESTING PHASE FOR GANTT CHART LIBRARIES
        </p>
      </div>
      <Gantt
        tasks={tasks}
        onDoubleClick={(e) => setSelectedTask(e)}
        listCellWidth="100px"
      />
      <div className="p-4 bg-white rounded shadow">
        <h2 className="mb-2 text-lg font-semibold text-center">
          THIS IS JUST A PROGRESS TOGGLER
        </h2>
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

      <div className="p-4 mt-5 bg-white rounded shadow">
        <h2 className="text-lg font-semibold text-center">Add New Task</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-3">
            <input
              type="date"
              value={newTaskStart.toISOString().split("T")[0]}
              onChange={(e) => setNewTaskStart(new Date(e.target.value))}
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={newTaskEnd.toISOString().split("T")[0]}
              onChange={(e) => setNewTaskEnd(new Date(e.target.value))}
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={addNewTask}
            className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Add Task
          </button>
        </div>
      </div>

      <TaskList tasks={tasks} />
    </div>
  );
};

export default Index;
