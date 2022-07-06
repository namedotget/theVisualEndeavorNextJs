import React from "react";
import classes from "./styles/ui.module.css";

export const UI = ({ children }) => {
  return <div className={classes.screenContain}>{children}</div>;
};
