import React from "react";
import s from "./Divider.module.scss";

export interface DividerData {}

export interface DividerParams {}

export const DividerRenderer = (data: DividerData) => {
  return (
    <>
      <hr className={s.Divider} />
    </>
  );
};
