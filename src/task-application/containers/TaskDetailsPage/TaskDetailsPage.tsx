import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Task } from "../../CustomData/Tasks";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./index.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment, { Moment } from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers";

const TaskDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const task: Task = state;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const tasks: string | null = localStorage.getItem("tasks");
  const tasksData: Task[] = tasks && JSON.parse(tasks);
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [dateLocal, setDateLocal] = useState<Moment | null>(
    moment(task.createdDate)
  );

  const handleDeleteData = () => {
    const data: Task[] = tasksData.filter(
      (taskLocal: Task) =>
        taskLocal.title !== title && taskLocal.description !== description
    );
    localStorage.setItem("tasks", JSON.stringify(data));
    navigate("/tasks");
  };

  const handleSaveData = () => {
    const data: Task[] = tasksData.map((taskLocal: Task) => {
      if (taskLocal.id === task.id) {
        taskLocal.title = title;
        taskLocal.description = description;
        taskLocal.createdDate = moment(dateLocal).toString();
      }
      return taskLocal;
    });
    localStorage.setItem("tasks", JSON.stringify(data));
    setIsEditMode(false);
  };

  return (
    <div className={styles.centeredDiv}>
      <Card style={{ backgroundColor: "azure" }}>
        <CardContent className={styles.cardContent}>
          <div className={styles.backDiv} onClick={() => navigate("/tasks")}>
            <ArrowBackIcon />
            Back to list
          </div>
          <Typography className={styles.detailsPage}>
            Task Details Page
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            disabled={!isEditMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            disabled={!isEditMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              slotProps={{
                textField: {
                  error: false,
                },
              }}
              value={dateLocal}
              onChange={(date: Moment | null) => setDateLocal(date)}
              disabled={!isEditMode}
            />
          </LocalizationProvider>
        </CardContent>
        <CardActions className={styles.cardActions}>
          {!isEditMode ? (
            <div>
              <Button variant="contained" onClick={() => setIsEditMode(true)}>
                Edit Data
              </Button>
              <Button
                variant="contained"
                onClick={handleDeleteData}
                color="error"
                className={styles.deleteData}
              >
                Delete Data
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  setTitle(task.title);
                  setDescription(task.description);
                  setIsEditMode(false);
                  setDateLocal(moment(task.createdDate));
                }}
              >
                Close
              </Button>
              <Button
                variant="outlined"
                onClick={handleSaveData}
                className={styles.saveButton}
              >
                Save Data
              </Button>
            </div>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default TaskDetailsPage;
