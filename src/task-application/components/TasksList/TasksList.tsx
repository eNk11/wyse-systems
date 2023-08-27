import React from "react";
import { TasksListProps } from "./TasksListProps";
import styles from "./index.module.scss";
import { Task } from "../../CustomData/Tasks";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HeightIcon from "@mui/icons-material/Height";

const TasksList = (props: TasksListProps) => {
  const { sorting, setSorting } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.table}>
      <Grid container>
        <Grid item xs={1}>
          ID
        </Grid>
        <Grid item xs={4}>
          Title
        </Grid>
        <Grid item xs={5}>
          Description
        </Grid>
        <Grid
          item
          md={1}
          className={styles.gridArrow}
          onClick={() => {
            sorting === "normal"
              ? setSorting("up")
              : sorting === "up"
              ? setSorting("down")
              : sorting === "down"
              ? setSorting("up")
              : setSorting("normal");
          }}
        >
          Created On
          {sorting === "normal" && <HeightIcon />}
          {sorting === "up" && <ArrowUpwardIcon />}
          {sorting === "down" && <ArrowDownwardIcon />}
        </Grid>
      </Grid>
      {props.tasks.map((task: Task) => (
        <Grid
          container
          className={styles.row}
          onClick={() => navigate(`/tasks/${task.id}`, { state: task })}
          key={task.id}
        >
          <Grid item xs={1} className={styles.rowItem}>
            {task.id}
          </Grid>
          <Grid item xs={4} className={styles.rowItem}>
            {task.title}
          </Grid>
          <Grid item xs={5} className={styles.rowItem}>
            {task.description}
          </Grid>
          <Grid item md={2} className={styles.rowItem}>
            {moment(task.createdDate).format("MM-DD-YYYY")}
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default TasksList;
