import React, { useCallback, useEffect, useRef, useState } from "react";
import { WidgetEditModeProps } from "../../interfaces/Widget";
import s from "./Divider.module.scss";
import clsx from "clsx";

type TLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface DividerData {}

export interface DividerParams {}

export const HeadingParamsEditMode = ({
  data,
  changeData,
  params,
}: WidgetEditModeProps<DividerData, DividerParams>) => {
  return (
    <>
      <hr className={s.Divider} />
    </>
  );
};
