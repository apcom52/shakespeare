import React from "react";
import { WidgetEditModeProps } from "../../interfaces/Widget";
import s from "./Divider.module.scss";

export interface DividerData {}

export interface DividerParams {}

export const DividerEditMode = ({
  data,
  changeData,
}: WidgetEditModeProps<DividerData>) => {
  return (
    <>
      <hr className={s.Divider} />
    </>
  );
};
