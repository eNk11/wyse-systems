import React from "react";
import { SearchComponentProps } from "./SearchComponentProps";
import { TextField, Typography } from "@mui/material";
import styles from "./index.module.scss";

const SearchComponent = (props: SearchComponentProps) => {
  return (
    <div className={styles.search}>
      <Typography>Search for a task: </Typography>
      <TextField
        value={props.searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setSearchTerm(e.target.value)
        }
      />
    </div>
  );
};
export default SearchComponent;
