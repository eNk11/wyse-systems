import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../Types/user";
import { isValidEmail } from "../../utils/function";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [errorFirstName, setErrorFirstName] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>("");
  const [errorLastName, setErrorLastName] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorEmailType, setErrorEmailType] = useState<boolean>(false);
  const [errorEmailAlreadyAdded, setErrorEmailAlreadyAdded] =
    useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isUserLoggedIn", JSON.stringify(false));
  }, []);

  useEffect(() => {
    const listOfUsers: string | null = localStorage.getItem("listOfUsers");
    firstName === "" && setErrorFirstName(true);
    lastName === "" && setErrorLastName(true);
    email === "" && setErrorEmail(true);
    !isValidEmail(email) && setErrorEmailType(true);
    emailAlreadyAdded(email, listOfUsers) && setErrorEmailAlreadyAdded(true);
  }, [firstName, lastName, email]);

  const emailAlreadyAdded = (email: string, listOfUsers: string | null) => {
    if (!listOfUsers) {
      return false;
    } else {
      const dataAfter: User[] = JSON.parse(listOfUsers);
      const isEmail: boolean = dataAfter.some(
        (user: User) => user.email === email
      );
      return isEmail;
    }
  };

  const handleRegisterButton = () => {
    const listOfUsers: string | null = localStorage.getItem("listOfUsers");

    if (
      errorFirstName === false &&
      errorLastName === false &&
      errorEmail === false &&
      errorEmailType === false &&
      errorEmailAlreadyAdded === false
    ) {
      const dataToAdd: User = {
        first_name: firstName,
        last_name: lastName,
        email: email,
      };

      if (!listOfUsers) {
        const newData: Array<Object> = [];
        newData.push(dataToAdd);
        const data: string = JSON.stringify(newData);
        localStorage.setItem("listOfUsers", data);
        navigate("/login");
      } else {
        const dataAfter: Array<Object> = JSON.parse(listOfUsers);
        const newData: Array<Object> = [...dataAfter, dataToAdd];
        const data: string = JSON.stringify(newData);
        localStorage.setItem("listOfUsers", data);
        navigate("/login");
      }
    }
  };

  return (
    <div className={styles.centeredDiv}>
      <Card style={{ backgroundColor: "azure" }}>
        <CardContent className={styles.cardContent}>
          <Typography className={styles.registerText}>REGISTER</Typography>
          <TextField
            label="First Name"
            variant="outlined"
            error={!!errorFirstName}
            helperText={
              errorFirstName ? "The first name field is required." : ""
            }
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFirstName(e.target.value);
              setErrorFirstName(false);
            }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            error={!!errorLastName}
            helperText={errorLastName ? "The last name field is required." : ""}
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLastName(e.target.value);
              setErrorLastName(false);
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            error={!!errorEmail || !!errorEmailType || !!errorEmailAlreadyAdded}
            helperText={
              errorEmail
                ? "The email field is required."
                : errorEmailType
                ? "The email must be valid"
                : errorEmailAlreadyAdded
                ? "Email is already added"
                : ""
            }
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setErrorEmail(false);
              setErrorEmailType(false);
              setErrorEmailAlreadyAdded(false);
            }}
          />
        </CardContent>
        <CardActions className={styles.cardActions}>
          <Button
            variant="contained"
            onClick={handleRegisterButton}
            disabled={
              errorEmail ||
              errorEmailAlreadyAdded ||
              errorEmailType ||
              errorFirstName ||
              errorLastName
            }
          >
            REGISTER
          </Button>
        </CardActions>
        <CardContent className={styles.secondCardContent}>
          <Typography>Do you already have an account?</Typography>
          <Typography
            className={styles.registerLink}
            onClick={() => navigate("/login")}
          >
            LOGIN
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
