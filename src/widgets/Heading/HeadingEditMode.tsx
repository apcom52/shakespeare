import { Button, Option } from "altrone-ui";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { WidgetEditModeProps } from "../../interfaces/Widget";
import { Editor, EditorState, RichUtils } from "draft-js";
import s from "./Heading.module.scss";
import clsx from "clsx";

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
    label: "Название",
    value: 1,
  },
  {
    label: "Заголовок",
    value: 2,
  },
  {
    label: "Подзаголовок",
    value: 3,
  },
];

export const HeadingParamsEditMode = ({
  data,
  changeData,
}: WidgetEditModeProps<HeadingData>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);

      return "handled";
    }
    return "not-handled";
  }, []);

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const onCodeClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "CODE"));
  };

  useEffect(() => {
    const ta = textareaRef.current;
    ta.style.height = "1px";
    ta.style.height = ta.scrollHeight + "px";
  }, [data.content, data.level]);

  return (
    <>
      <textarea
        ref={textareaRef}
        className={clsx(`alt-heading--level-${data.level}`, s.HeadingTextarea)}
        value={data.content}
        onChange={(e) => changeData("content", e.target.value)}
      />
    </>
  );
};
