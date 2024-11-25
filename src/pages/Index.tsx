import { useEffect, useState } from "react";
import { Gantt, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import TaskCard from "../components/TaskCard";
import { CustomTask } from "../types/types";
import useTasksStore from "../store/tasks";
import TaskList from "../components/TaskList";

const Index = () => {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const { tasks, setTasks } = useTasksStore();
  const [_tasks, _setTasks] = useState<CustomTask[]>([
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

  useEffect(() => {
    _setTasks(tasks);
  }, [tasks]);

  const addNewTask = () => {
    const newTask: CustomTask = {
      start: newTaskStart,
      end: newTaskEnd,
      name: newTaskName,
      id: `Task${_tasks.length + 1}`,
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
    setTasks(_tasks);
  }, [setTasks, _tasks]);

  return (
    <div className="w-full bg-white">
      {selectedTask && (
        <div
          className="absolute z-50 grid w-screen h-screen bg-white place-content-center"
          onClick={() => setSelectedTask(undefined)}
        >
          <TaskCard task={selectedTask} />
        </div>
      )}

      <Gantt
        tasks={_tasks}
        onDoubleClick={(e) => setSelectedTask(e)}
        listCellWidth="100px"
      />

      <TaskList _tasks={_tasks} />

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
    </div>
  );
};

export default Index;
