import { Task } from "../../CustomData/Tasks";

export interface TasksListProps {
  tasks: Task[];
  sorting: string;
  setSorting: React.Dispatch<React.SetStateAction<string>>;
}
