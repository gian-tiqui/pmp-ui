import { create } from "zustand";
import { CustomTask } from "../types/types";

interface State {
  tasks: CustomTask[];
  setTasks: (task: CustomTask[]) => void;
}

const useTasksStore = create<State>((set) => ({
  tasks: [],
  setTasks: (tasks: CustomTask[]) => set({ tasks }),
}));

export default useTasksStore;
