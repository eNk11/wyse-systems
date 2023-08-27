import React, { Fragment, useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/function";
import { User } from "../../Types/user";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [errorEmailType, setErrorEmailType] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    email === "" && setEmailError(true);
    !isValidEmail(email) && setErrorEmailType(true);
  }, [email]);

  const handleLoginButton = () => {
    const listOfUsers: string | null = localStorage.getItem("listOfUsers");

    if (errorEmailType === false && emailError === false && listOfUsers) {
      const data: User[] = JSON.parse(listOfUsers);
      data.forEach((user: User) => {
        if (user.email === email) {
          localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
          navigate("/tasks");
        } else {
          setAlert(true);
        }
      });
    } else {
      setAlert(true);
    }
  };

  return (
    <Fragment>
      {alert && <Alert severity="error">This email is not registered</Alert>}
      <div className={styles.centeredDiv}>
        <Card style={{ backgroundColor: "azure" }}>
          <CardContent className={styles.cardContent}>
            <Typography className={styles.loginText}>LOGIN</Typography>
            <TextField
              label="Email"
              variant="outlined"
              error={!!emailError || !!errorEmailType}
              helperText={
                emailError
                  ? "The email field is required."
                  : errorEmailType
                  ? "The email must be vaild."
                  : ""
              }
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setEmailError(false);
                setErrorEmailType(false);
                setAlert(false);
              }}
            />
          </CardContent>
          <CardActions className={styles.cardActions}>
            <Button
              variant="contained"
              disabled={!isValidEmail(email)}
              onClick={handleLoginButton}
            >
              LOGIN
            </Button>
          </CardActions>
          <CardContent className={styles.secondCardContent}>
            <Typography>Need an account?</Typography>
            <Typography
              className={styles.registerLink}
              onClick={() => navigate("/register")}
            >
              REGISTER
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};

export default LoginPage;
