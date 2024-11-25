import { Task } from "gantt-task-react";
import { ReactNode } from "react";

type RouteType = {
  path: string;
  element: ReactNode;
  name: string;
};

type CustomTask = Task & {
  barChildren?: Task[];
};

type TaskListType = {
  name: string;
  tasks: CustomTask[];
};

export type { RouteType, CustomTask, TaskListType };
