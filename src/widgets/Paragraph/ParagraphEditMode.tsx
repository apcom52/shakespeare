import React, { useCallback } from "react";
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
  const onTextChange = useCallback(
    (text) => {
      changeData("content", text);
    },
    [changeData]
  );

  return (
    <>
      <FluentText text={data.content} onChange={onTextChange} />
    </>
  );
};
