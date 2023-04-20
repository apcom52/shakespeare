import React from "react";
import { WidgetEditModeProps } from "../../interfaces/Widget";
import { FluentText } from "../../components/FluentText/FluentText";

export interface ParagraphData {
  content: string;
}

export interface ParagraphParams {}

export const ParagraphEditMode = ({
  data,
  changeData,
}: WidgetEditModeProps<ParagraphData>) => {
  return (
    <>
      <FluentText />
    </>
  );
};
