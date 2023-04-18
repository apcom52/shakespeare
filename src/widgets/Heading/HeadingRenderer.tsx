import React from "react";
import { Heading } from "altrone-ui";

type TLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingData {
  content: string;
  level: TLevel;
}

export const HeadingRenderer = (data: HeadingData) => {
  return <Heading level={data.level}>{data.content}</Heading>;
};
