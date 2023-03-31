import { Option, Select, TextInput, Toolbar, ToolbarGroup } from "altrone-ui";
import React, { useState } from "react";

type TLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingData {
  content: string;
  level: TLevel;
}

export interface HeadingParams {
  level: TLevel;
}

const HEADING_SELECT_OPTIONS: Option<number>[] = [
  {
    label: "Заголовок",
    value: 1,
  },
  {
    label: "Подзаголовок",
    value: 2,
  },
];

export const HeadingParamsEditMode = (
  data: HeadingData,
  params: HeadingParams
) => {
  const [text, setText] = useState("");

  return (
    <>
      <Toolbar width="100%">
        <ToolbarGroup>
          <Select
            value={1}
            options={HEADING_SELECT_OPTIONS}
            onChange={() => null}
          />
        </ToolbarGroup>
      </Toolbar>
      <TextInput value={text} onChange={setText} />
    </>
  );
};
