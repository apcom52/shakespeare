import { Option, Select, TextInput, Toolbar, ToolbarGroup } from "altrone-ui";
import React, { useState } from "react";
import { WidgetEditModeProps } from "../../interfaces/Widget";

type TLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingData {
  content: string;
  level: TLevel;
}

export interface HeadingParams {
  level: TLevel;
}

export const HEADING_SELECT_OPTIONS: Option<number>[] = [
  {
    label: "Заголовок",
    value: 1,
  },
  {
    label: "Подзаголовок",
    value: 2,
  },
];

export const HeadingParamsEditMode = ({
  data,
  changeData,
  params,
}: WidgetEditModeProps<HeadingData, HeadingParams>) => {
  const { content } = data;

  return (
    <>
      <TextInput
        value={content}
        onChange={(value) => changeData("content", value)}
      />
    </>
  );
};
