import { Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Task } from "../../CustomData/Tasks";
import { tasksApi } from "../../CustomData/TasksData";
import useMounted from "../../CustomData/customHooks/useMounted";
import TasksList from "../../components/TasksList/TasksList";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
  const mounted = useMounted();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sorting, setSorting] = useState<string>("normal");

  useEffect(() => {
    const localTasks: string | null = localStorage.getItem("tasks");
    const dataFromLocal: Task[] = localTasks && JSON.parse(localTasks);
    setTasks(dataFromLocal);
    if (searchTerm) {
      const globalRegex = new RegExp(searchTerm);
      const searchedArray: Array<Task | null> = tasks.map((task: Task) => {
        if (globalRegex.test(task.title)) {
          return task;
        }
        return null;
      });
      const filteredArray: any = searchedArray.filter(
        (task: Task | null) => task !== null
      );
      setSorting("normal");
      setTasks(filteredArray);
    }
  }, [isModalOpen, searchTerm, tasks]);

  useEffect(() => {
    if (sorting === "up") {
      debugger;
      let sortTasks: Task[];
      sortTasks = tasks.sort((task1: Task, task2: Task) => {
        return moment
          .utc(task1.createdDate)
          .diff(moment.utc(task2.createdDate));
      });
      setTasks(sortTasks);
    } else if (sorting === "down") {
      let sortTasks: Task[];
      sortTasks = tasks.sort((task1: Task, task2: Task) => {
        return moment
          .utc(task2.createdDate)
          .diff(moment.utc(task1.createdDate));
      });
      setTasks(sortTasks);
    }
  }, [sorting, tasks]);

  const getTasks = useCallback(async () => {
    try {
      const data: Task[] = await tasksApi.getTasks();

      if (!mounted.current) {
        const localTasks: string | null = localStorage.getItem("tasks");
        const dataFromLocal: Task[] = localTasks && JSON.parse(localTasks);

        setTasks(dataFromLocal || data);

        !dataFromLocal && localStorage.setItem("tasks", JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);
    }
  }, [mounted]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div className={styles.tasksPage}>
      <Button
        variant="outlined"
        onClick={() => {
          localStorage.setItem("isUserLoggedIn", JSON.stringify(false));
          navigate("/login");
        }}
      >
        Log out
      </Button>
      <Typography>Tasks</Typography>
      <SearchComponent setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <TasksList tasks={tasks} sorting={sorting} setSorting={setSorting} />
      <Button
        variant="contained"
        className={styles.newTaskButton}
        onClick={() => {
          setIsModalOpen(true);
          setSorting("normal");
          setSearchTerm("");
        }}
      >
        Add new Task
      </Button>
      <ModalComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default TasksPage;
