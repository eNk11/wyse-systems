import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoginPage from "./containers/LoginPage/LoginPage";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import TasksPage from "./containers/TasksPage/TasksPage";
import TaskDetailsPage from "./containers/TaskDetailsPage/TaskDetailsPage";

const LocalRoutes = () => {
  const isUserLoggedInLocalStorage: string | null =
    localStorage.getItem("isUserLoggedIn");

  const isUserLoggedIn =
    isUserLoggedInLocalStorage && JSON.parse(isUserLoggedInLocalStorage);

  return (
    <Router>
      <Routes>
        <Route index path="/login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/:id" element={<TaskDetailsPage />} />

        {isUserLoggedIn ? (
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default LocalRoutes;
