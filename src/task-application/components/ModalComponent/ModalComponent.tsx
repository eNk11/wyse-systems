import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ModalComponentProprs } from "./ModalComponentProps";
import styles from "./index.module.scss";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../CustomData/Tasks";
import moment from "moment";

const ModalComponent = (props: ModalComponentProprs) => {
  const tasks: string | null = localStorage.getItem("tasks");
  const tasksData = tasks && JSON.parse(tasks);

  const { isModalOpen, setIsModalOpen } = props;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const boxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };

  const handleAddNewTask = () => {
    const newTaskToAdd: Task = {
      id: uuidv4(),
      title: title,
      description: description,
      createdDate: moment().toString(),
    };
    tasksData.push(newTaskToAdd);
    localStorage.setItem("tasks", JSON.stringify(tasksData));
    setTitle("");
    setDescription("");
    setIsModalOpen(false);
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <Typography variant="h6" component="h2">
              Add a new task
            </Typography>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(e.target.value);
              }}
            />
          </CardContent>
          <CardActions className={styles.cardActions}>
            <Button variant="contained" onClick={handleAddNewTask}>
              Add New Task
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
